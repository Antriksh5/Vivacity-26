"""Build a private single-domain deployment handoff without changing local envs."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
import os
import shutil
import sqlite3
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
STAGE = ROOT / 'artifacts' / 'vivacity-27-deployment'
BUNDLE = STAGE / 'vivacity-27'
ARCHIVE = ROOT / 'artifacts' / 'vivacity-27-deployment.zip'

if '--clean-existing' not in sys.argv:
    if STAGE.exists():
        shutil.rmtree(STAGE)
    BUNDLE.mkdir(parents=True, mode=0o700)
    STAGE.chmod(0o700)

    SKIP = {'node_modules', 'dist', '.git', '.vite', '__pycache__', '.DS_Store'}
    def copy(source, target=None):
        source = ROOT / source
        target = BUNDLE / (target or source.relative_to(ROOT))
        if source.is_dir():
            for file in sorted(source.rglob('*')):
                if file.is_file() and not any(part in SKIP for part in file.relative_to(source).parts):
                    if file.name.startswith('.env') or file.suffix in {'.sqlite', '.log', '.pdf'}:
                        continue
                    destination = target / file.relative_to(source)
                    destination.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(file, destination)
        elif source.is_file():
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)
        else:
            raise RuntimeError(f'Missing bundle input: {source.relative_to(ROOT)}')

    for source in ['CA_V2/client', 'CA_V2/server', 'google-apps-script', 'tests', 'deployment']:
        copy(source)
    for source in ['CA_V2/README.md', 'CA_V2/LOCAL-SETUP.md', '.gitignore']:
        copy(source)
    # Keep the registration source focused on the app actually being deployed.
    for name in ['package.json', 'package-lock.json', 'index.html', 'vite.config.js',
                 'postcss.config.js', 'tailwind.config.js', 'eslint.config.js', 'vercel.json', 'scripts']:
        if (ROOT / 'viva-26' / name).exists():
            copy('viva-26/' + name)
    for name in ['main.jsx', 'App.jsx', 'index.css', 'pages/Registration.jsx',
                 'styles/Registration.css', 'components/Registeration',
                 'utils/cloudinaryUrls.js', 'utils/registrationData.js', 'assets/registration/door.gif']:
        copy('viva-26/src/' + name)
    for font in (ROOT / 'viva-26/src/fonts').rglob('*'):
        if font.suffix.lower() in {'.otf', '.ttf', '.woff', '.woff2', '.eot'}:
            copy(str(font.relative_to(ROOT)))
    for source in ['CA_V2/client/.env.example', 'CA_V2/server/.env.example', 'viva-26/.env.example']:
        copy(source)

    # Include the original private envs separately, keeping public settings in the
    # frontends and runtime secrets only in the API's .env.
    local_envs = {
        'CA_V2/client/.env.local': 'env/local/CA-client.env.local',
        'CA_V2/server/.env': 'env/local/CA-server.env',
        'viva-26/.env.local': 'env/local/registration.env.local',
    }
    for source, target in local_envs.items():
        if not (ROOT / source).is_file():
            raise RuntimeError(f'Missing private handoff env: {source}')
        copy(source, target)

    def public_values(path):
        result = {}
        for line in path.read_text().splitlines():
            if line.startswith('VITE_') and '=' in line:
                key, value = line.split('=', 1)
                result[key] = value.strip().strip('\"\'')
        return result

    existing = public_values(ROOT / 'viva-26/.env.local')
    main_env = {'VITE_BASE_URL_BACKEND': '/api', 'VITE_REGISTRATION_URL': '/registration'}
    registration_env = {
        'VITE_CA_API_URL': '/ca-api', 'VITE_CA_PORTAL_URL': '/caportal',
        'VITE_MAIN_SITE_URL': '/',
        'VITE_ROUTER_BASENAME': '/',
        'VITE_GOOGLE_SHEET_API_URL': existing.get('VITE_GOOGLE_SHEET_API_URL', ''),
        'VITE_CLOUDINARY_CLOUD_NAME': existing.get('VITE_CLOUDINARY_CLOUD_NAME', 'doxipu0v7'),
    }
    for folder, values in [('CA_V2/client', main_env), ('viva-26', registration_env)]:
        (BUNDLE / folder / '.env.local').write_text(''.join(f'{key}={value}\n' for key, value in values.items()))

    server_env = (ROOT / 'CA_V2/server/.env').read_text().splitlines()
    overrides = {'NODE_ENV': 'production', 'HOST': '127.0.0.1', 'PORT': '8001',
                 'DB_DIALECT': 'sqlite', 'SQLITE_STORAGE': './data/ca.sqlite'}
    server_env = [line for line in server_env if line.split('=', 1)[0] not in overrides]
    server_env.extend(f'{key}={value}' for key, value in overrides.items())
    (BUNDLE / 'CA_V2/server/.env').write_text('\n'.join(server_env) + '\n')
    (BUNDLE / '.nvmrc').write_text('22\n')
    shutil.copy2(ROOT / 'deployment/README.md', BUNDLE / 'README.md')

    # Use SQLite's backup API rather than copying a live database file.
    source_db = ROOT / 'CA_V2/server/ca-local.sqlite'
    if not source_db.is_file():
        raise RuntimeError('No current SQLite database found; check the deployment database configuration.')
    db_path = BUNDLE / 'CA_V2/server/data/ca.sqlite'
    db_path.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(source_db.as_uri() + '?mode=ro', uri=True) as source:
        with sqlite3.connect(db_path) as destination:
            source.backup(destination)
            destination.execute('DELETE FROM Candidates WHERE email = ?', ('preview@example.test',))
            destination.commit()
            assert destination.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'
            print('Database snapshot prepared; synthetic demo account excluded.', flush=True)

    # Build from installed workspace dependencies into the bundle, with public
    # production settings supplied via process env to override local Vite settings.
    jobs = [
        ('main site', ROOT / 'CA_V2/client', main_env, BUNDLE / 'CA_V2/client/dist', []),
        ('registration', ROOT / 'viva-26', registration_env, BUNDLE / 'viva-26/dist', ['--base=/registration-app/']),
        ('API', ROOT / 'CA_V2/server', {}, BUNDLE / 'CA_V2/server/dist', None),
    ]
    def build(job):
        label, cwd, variables, destination, extra = job
        if extra is None:
            command = ['npm', 'run', 'build', '--', '--outDir', str(destination)]
        else:
            command = ['npm', 'run', 'build', '--', '--outDir', str(destination), '--emptyOutDir', *extra]
        result = subprocess.run(command, cwd=cwd, env={**os.environ, **variables},
                                stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        if result.returncode:
            raise RuntimeError(f'{label} build failed:\n{result.stdout[-7000:]}')
        return label

    print('Building the main site, registration and API for production…', flush=True)
    with ThreadPoolExecutor(max_workers=3) as pool:
        for future in as_completed([pool.submit(build, job) for job in jobs]):
            print('Build passed: ' + future.result(), flush=True)

    for path in BUNDLE.rglob('*'):
        if path.is_file() and (path.name.startswith('.env') or path.parent.name == 'local' or path.suffix == '.sqlite'):
            path.chmod(0o600)
    required = ['CA_V2/client/dist/index.html', 'viva-26/dist/index.html',
                'CA_V2/server/dist/index.js', 'CA_V2/server/dist/sync-ca-sheet.js',
                'CA_V2/client/.env.local', 'viva-26/.env.local', 'CA_V2/server/.env',
                'CA_V2/server/data/ca.sqlite', 'google-apps-script/Code.gs']
    for name in required:
        if not (BUNDLE / name).is_file():
            raise RuntimeError('Missing deployment file: ' + name)
    assert '/registration-app/assets/' in (BUNDLE / 'viva-26/dist/index.html').read_text()
    assert not list(BUNDLE.rglob('node_modules'))

# Keep only runtime artifacts in the final handoff. Working source remains in ROOT.
runtime = STAGE / 'runtime'
runtime.mkdir(mode=0o700)
keep = [
    'CA_V2/client/dist', 'CA_V2/client/.env.local',
    'viva-26/dist', 'viva-26/.env.local',
    'CA_V2/server/dist', 'CA_V2/server/data', 'CA_V2/server/.env',
    'CA_V2/server/package.json', 'CA_V2/server/package-lock.json',
    'deployment/nginx.conf', 'deployment/vivacity-api.service',
    'google-apps-script/Code.gs', 'google-apps-script/README.md', '.nvmrc',
]
for name in keep:
    source = BUNDLE / name
    target = runtime / name
    target.parent.mkdir(parents=True, exist_ok=True)
    if source.is_dir():
        shutil.copytree(source, target)
    else:
        shutil.copy2(source, target)
shutil.copy2(ROOT / 'deployment/README.runtime.md', runtime / 'README.md')
(runtime / 'CA_V2/server/dist/seed-demo.js').unlink(missing_ok=True)
package_path = runtime / 'CA_V2/server/package.json'
package = json.loads(package_path.read_text())
package['main'] = 'dist/index.js'
package['scripts'] = {'start': 'node dist/index.js', 'sync:ca-sheet': 'node dist/sync-ca-sheet.js'}
package_path.write_text(json.dumps(package, indent=2) + '\n')
shutil.rmtree(BUNDLE)
runtime.rename(BUNDLE)
print('Clean runtime bundle prepared; development files and duplicate envs removed.', flush=True)

manifest = {}
for path in sorted(BUNDLE.rglob('*')):
    if path.is_file():
        manifest[str(path.relative_to(BUNDLE))] = sha256(path.read_bytes()).hexdigest()
(BUNDLE / 'MANIFEST.sha256.json').write_text(json.dumps(manifest, indent=2) + '\n')
with ZipFile(ARCHIVE, 'w', ZIP_DEFLATED, compresslevel=6) as archive:
    for file in sorted(BUNDLE.rglob('*')):
        if file.is_file():
            archive.write(file, 'vivacity-27/' + str(file.relative_to(BUNDLE)))
ARCHIVE.chmod(0o600)
with ZipFile(ARCHIVE) as archive:
    corrupt = archive.testzip()
    if corrupt:
        raise RuntimeError('ZIP validation failed: ' + corrupt)
print('Created: ' + str(ARCHIVE), flush=True)
print(f'Size: {ARCHIVE.stat().st_size / 1024 / 1024:.1f} MiB', flush=True)
print('Private archive includes environment files and a database snapshot.', flush=True)
