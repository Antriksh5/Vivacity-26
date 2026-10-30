# Vivacity ’27 — clean production deployment

This folder contains prebuilt production apps. Deploy the entire `vivacity-27/`
folder; no frontend build or development server is needed.

## Which env files to use

| File | Purpose |
| --- | --- |
| `CA_V2/server/.env` | Required API runtime configuration: database, signing secret and Google Sheet endpoint. |
| `CA_V2/client/.env.local` | Main site/CA frontend build settings; already applied to its `dist/`. |
| `viva-26/.env.local` | Registration frontend build settings; already applied to its `dist/`. |

Use these files in their existing locations. There is no `env/local/` folder in
this release. Do not copy one app's env into another app. The frontend env files
are retained for reference; changing them requires rebuilding from the original
working source project. The API `.env` is read every time the API starts.

## What each folder does

- `CA_V2/client/dist/`: main Road to Vivacity site at `/`, with `/caportal`,
  `/caregistration`, `/calogin`, and `/userprofile`.
- `viva-26/dist/`: registration form at `/registration`. Its assets are served at
  `/registration-app/`; the included Nginx config handles both paths.
- `CA_V2/server/`: compiled API, npm manifests, runtime env and SQLite data.
- `google-apps-script/`: Google Sheets writer for Registrations and Campus Ambassadors.
- `deployment/`: Nginx configuration and systemd service.

## Deploy on one domain with Nginx

1. Place this folder at `/opt/vivacity-27`. Use Node 22 and npm on the server.
2. Install the API's production dependencies:

   ```bash
   cd /opt/vivacity-27/CA_V2/server
   npm ci --omit=dev
   ```

3. Keep `CA_V2/server/.env` in that directory. Set `CORS_ORIGINS` to your actual
   HTTPS domain, for example `CORS_ORIGINS=https://fest.example.edu`. The included
   env already has the existing signing secret and Google Apps Script endpoint.
   Keep `HOST=127.0.0.1` and `PORT=8001` for the provided Nginx configuration.
4. Verify `npm start` and `curl http://127.0.0.1:8001/health`. Stop the foreground
   API before starting its systemd service.
5. Install `deployment/vivacity-api.service` into `/etc/systemd/system/`.
   Adjust its Node path if Node is not at `/usr/bin/node`. The example runs as
   `www-data`; ensure that user owns the backend files and can write to `data/`.
   Run `systemctl daemon-reload` and `systemctl enable --now vivacity-api` with
   the appropriate server privileges.
6. Install `deployment/nginx.conf` as the Nginx site configuration. Change its
   `server_name _` to your domain and adjust `/opt/vivacity-27` if you extracted
   elsewhere. Test with `nginx -t`, reload Nginx and enable HTTPS using the
   server's certificate workflow. Do not serve the whole source/release root:
   Nginx should serve only the frontend `dist/` directories as configured.
7. Check `/`, `/caportal`, `/registration`, `/api/health` and `/ca-api/health`.
   Register Now must open `/registration`; Home must return to `/`.

The current SQLite snapshot is `CA_V2/server/data/ca.sqlite`. It retains existing
accounts and registrations, excluding the synthetic preview account. Preserve
and back up this directory across releases. If an existing production database
is already in use, configure that database rather than replacing its data.

## Google Sheets

Ensure the included `google-apps-script/Code.gs` is deployed to the endpoint in
`REGISTRATION_SHEET_URL`. `setup` creates Registrations and Campus Ambassadors.
After script changes, update the existing web-app deployment to a new version.

To backfill/retry CA exports after deployment:

```bash
cd /opt/vivacity-27/CA_V2/server
npm run sync:ca-sheet
```

CA exports skip duplicate emails/referral codes. A sheet export failure does not
remove an account from the database. There is no automatic retry queue.

This release is built for the included single-domain Nginx setup. For separate
frontend domains or a different asset prefix, rebuild from the original working
project with the appropriate production env values.

The archive includes private env secrets and a database snapshot. Transfer it
privately to the deployment team. Development source, duplicate local envs,
node_modules, screenshots, tests and old handoff documents are intentionally absent.
