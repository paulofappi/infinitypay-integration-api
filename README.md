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
- `GET /api/health` returns service status details, including the service uptime in seconds.
- `POST /api/reviews` receives code review summaries and creates Slack cards for each task.

### Code review endpoint

Send a request to `/api/reviews` with the repository name, optional pull request identifier, a review summary, and an array of tasks. Each task generates a Slack card through the configured webhook.

```bash
curl -X POST http://localhost:3000/api/reviews \
  -H 'Content-Type: application/json' \
  -d '{
    "repository": "infinitypay-integration-api",
    "pullRequest": "42",
    "summary": "Refinements to onboarding flow",
    "tasks": [
      {
        "title": "Corrigir validação de CPF",
        "description": "A validação aceita números incompletos.",
        "severity": "high",
        "assignee": "@joao"
      },
      {
        "title": "Adicionar testes de integração",
        "description": "Cobrir cenários de erro no serviço de pagamentos.",
        "assignee": "@ana"
      }
    ]
  }'
```

If the `SLACK_WEBHOOK_URL` environment variable is not configured, the endpoint still accepts the review but flags each task as `delivered: false` in the response so operators know that Slack delivery should be retried later.

## Environment variables

The server reads configuration from an `.env` file. Available variables:

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port where the HTTP server will listen | `3000` |
| `LOG_LEVEL` | Desired logging verbosity | `info` |
| `SERVICE_NAME` | Display name for logs and responses | `InfinityPay Integration API` |
| `SLACK_WEBHOOK_URL` | Incoming webhook URL for posting review tasks to Slack | `''` |

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
    review.controller.js # Receives code review summaries and tasks
  routes/
    health.routes.js     # Health-related routes
    review.routes.js     # Code review workflow endpoints
  services/
    slack.service.js     # Slack integration utilities
```
