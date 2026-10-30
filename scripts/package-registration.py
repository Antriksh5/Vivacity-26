"""Create the private ERP handoff. Run after `npm run build` in viva-26."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / 'viva-26'
OUTPUT = ROOT / 'artifacts' / 'vivacity-registration-erp.zip'

if not (FRONTEND / 'dist/index.html').is_file():
    raise SystemExit('Build viva-26 first: npm run build')
if not (FRONTEND / '.env.local').is_file():
    raise SystemExit('Missing viva-26/.env.local for the private handoff')

files = {}

def add(source, destination):
    source = ROOT / source
    if source.is_dir():
        for child in sorted(source.rglob('*')):
            if child.is_file() and 'node_modules' not in child.parts:
                files[Path(destination) / child.relative_to(source)] = child
    elif source.is_file():
        files[Path(destination)] = source
    else:
        raise SystemExit('Missing handoff input: ' + str(source.relative_to(ROOT)))

for name in ['package.json', 'package-lock.json', '.env.local', '.env.example',
             'index.html', 'vite.config.js', 'postcss.config.js',
             'tailwind.config.js', 'eslint.config.js', 'vercel.json']:
    add('viva-26/' + name, 'frontend/' + name)

for name in ['main.jsx', 'App.jsx', 'index.css', 'pages/Registration.jsx',
             'styles/Registration.css', 'components/Registeration',
             'utils/cloudinaryUrls.js', 'utils/registrationData.js', 'assets/registration/door.gif']:
    add('viva-26/src/' + name, 'frontend/src/' + name)

for font in sorted((FRONTEND / 'src/fonts').rglob('*')):
    if font.suffix.lower() in {'.otf', '.ttf', '.woff', '.woff2', '.eot'}:
        add(str(font.relative_to(ROOT)), 'frontend/' + str(font.relative_to(FRONTEND)))

# Keep package.json's optional upload script usable in the handoff.
add('viva-26/scripts', 'frontend/scripts')
add('viva-26/dist', 'frontend/dist')
for name in ['package.json', 'package-lock.json', 'server.js', 'routes', 'events_store.json']:
    add('backend/' + name, 'backend/' + name)
for name in ['.env.local', '.env']:
    if (ROOT / 'backend' / name).is_file():
        add('backend/' + name, 'backend/' + name)
add('google-apps-script', 'google-apps-script')
add('ERP-DEPLOYMENT.md', 'ERP-DEPLOYMENT.md')

OUTPUT.parent.mkdir(exist_ok=True)
with ZipFile(OUTPUT, 'w', ZIP_DEFLATED) as archive:
    for destination, source in sorted(files.items()):
        archive.write(source, 'vivacity-registration/' + str(destination))

print('Created:', OUTPUT)
print('Files:', len(files))
print('Size:', round(OUTPUT.stat().st_size / 1024 / 1024, 2), 'MiB')
print('Includes local environment files. Transfer privately to ERP staff.')
