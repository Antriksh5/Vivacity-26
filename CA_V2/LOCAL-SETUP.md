# Local CA portal and registration

The original CA styling is retained with Vivacity ’27 branding and the registration logo. Both portals use the CA API for referral
validation and tracking. Nothing is published by this setup.

## Start

Run these in separate terminals from the repository root:

```bash
cd CA_V2/server
npm ci
# First setup only: copy .env.example to .env and set a random SECRET_TOKEN.
npm run dev
```

```bash
cd CA_V2/client
npm ci
# First setup only: copy .env.example to .env.local.
npm run dev
```

```bash
cd viva-26
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

The local environment files have already been configured in this checkout.
Use `127.0.0.1` consistently when following links between the two portals.

| Page | URL |
| --- | --- |
| Road to Vivacity (main page) | http://127.0.0.1:5174/ |
| CA landing | http://127.0.0.1:5174/caportal |
| CA signup | http://127.0.0.1:5174/caregistration |
| CA login | http://127.0.0.1:5174/calogin |
| CA profile | http://127.0.0.1:5174/userprofile |
| Current registration | http://127.0.0.1:5173/registration |
| API health | http://127.0.0.1:8001/health |

SQLite stores preview data in ignored `server/ca-local.sqlite`. MySQL remains
supported through the database variables in `server/.env.example`. Port 8001
keeps the CA API separate from the existing events backend on port 8000.

For a local demo account, run `npm run seed:demo` in `CA_V2/server`. This only
works with SQLite outside production. Login: `preview@example.test`, password:
`Preview2026!`. It creates no real registrations and sends nothing to Sheets.

## Referral flow

1. Sign up as a CA, then log in to see the generated referral code.
2. Use the profile's registration link, which pre-fills the current registration
   form's referral field, or enter the code manually.
3. Submit a registration using a new email and phone number.
4. Refresh the CA profile to see the student's name in Referred Students.

`viva-26/.env.local` enables the connection with `VITE_CA_API_URL=/ca-api` and
sets `VITE_CA_PORTAL_URL`. Its Vite server proxies `/ca-api` to port 8001.
The CA frontend proxies `/api` to the same backend. Its old registration route
redirects to the current portal when `VITE_REGISTRATION_URL` is configured.

Registrations and CA credits commit together in the database. Invalid codes
are rejected, and existing email/phone registrations cannot earn another credit.
The form waits for a successful response before displaying confirmation.

## Google Sheets

`REGISTRATION_SHEET_URL` on the CA server uses the same flat row format as the
existing Apps Script, including one row per event and the referral column.
This checkout copies the existing registration endpoint into that server setting.
Manual registration submissions therefore also attempt the existing sheet export.

CA signups now export to a separate **Campus Ambassadors** worksheet using the
same endpoint by default. `CA_SHEET_URL` can override the endpoint if you want a
separate spreadsheet file. The CA export includes signup time, contact details,
gender, college, degree, state/district, society details, and generated referral
code. Passwords are never exported.

Before using this, replace the live Apps Script with `google-apps-script/Code.gs`,
run `setup` to create both tabs, then update the existing web-app deployment to a
new version. Keep its existing spreadsheet ID and `/exec` URL.

After deployment, export existing CA accounts or retry missed exports from
`CA_V2/server` with `npm run sync:ca-sheet`. Existing CA sheet rows are skipped by
email or referral code. The synthetic `preview@example.test` demo is excluded from
backfill. The command preserves each account’s original signup timestamp.

The database is authoritative. Missing or failed optional sheet exports do not
undo a registration; failures are logged. There is currently no automatic retry
queue for failed exports; use `sync:ca-sheet` for CA recovery. Older CA exports can use `SHEET_API1` and
`SHEET_API_GDG_1`; older registration exports use `SHEET_API2` and
`SHEET_API_GDG_2`. Those older endpoints expect `{ data: ... }`.

For production, configure hosted API/portal/registration URLs, allowed origins,
a production database and signing secret, and a reverse proxy for `/ca-api`
(or an absolute `VITE_CA_API_URL`). Vite's development proxy is local only.

## Verify

Build the server, then run from the repository root:

```bash
node --test tests/ca-referrals.test.mjs tests/registration.test.mjs
```

The referral test uses an isolated temporary database and a local sheet stand-in.
It never posts test registrations to the real spreadsheet.

The registration app root returns to the main Road to Vivacity page. Its form
lives at `/registration`; `/normalregistration` remains a compatible alias.
Home/logo links use `VITE_MAIN_SITE_URL`. CA routes on the registration app
forward to the configured CA portal, and referral query parameters survive redirects.
