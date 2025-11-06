# InfinityPay Integration API

A lightweight Express.js service that exposes health endpoints and provides a foundation for integrating with InfinityPay services.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server with hot reload:
   ```bash
   npm run dev
   ```
3. Access the base endpoint:
   - `GET /` returns a welcome message.
   - `GET /api/health` returns service status details.

## Environment variables

The server reads configuration from an `.env` file. Available variables:

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port where the HTTP server will listen | `3000` |
| `LOG_LEVEL` | Desired logging verbosity | `info` |
| `SERVICE_NAME` | Display name for logs and responses | `InfinityPay Integration API` |

## Scripts

- `npm start` – run the server in production mode.
- `npm run dev` – run the server with live reload using nodemon.
- `npm run lint` – lint the project using ESLint and the StandardJS style guide.

## Project structure

```
src/
  app.js           # Express application setup and middleware
  server.js        # HTTP server bootstrap
  config/
    environment.js # Environment variable loading and configuration
  controllers/
    health.controller.js # Health check handler
  routes/
    health.routes.js     # Health-related routes
```
