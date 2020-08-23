Install and run Solid Pancake service
===
## Installation
```
npm install
```
## Configuring
The service needs a dotenv file to run. This dotenv file will be loaded in the environment variables. Here’s what the app needs:

Environement key | Summary | Required by
--- | --- | ---
PG_DATABASE | PostgreSQL database name | App
PG_HOST | PostgreSQL database host | App
PG_PORT | PostgreSQL database port | App
PG_PASSWORD | PostgreSQL password | App
PG_USERNAME | PostgreSQL username | App
PORT | The port where to serve the app | App
SOLID_PANCAKE_URL | The secret key used to sign JWT | App
SMTP_TRANSPORT | Smtp transport used to send emails | App
## Running the app
```
npm run start
```
## Build & run for production
```
npm run build
node dist/main.js
```
