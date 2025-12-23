# Vibe Dashboard

Minimal React + TypeScript + Vite app using MUI that fetches records from an external API and displays them in a table.

Quick start

1. Set the API base URL in an environment file `.env` at the project root:

```bash
VITE_API_URL=https://api.yoursite.com
```

2. Install dependencies and start the dev server:

```bash
yarn install
yarn dev
```

The dashboard expects a GET `${VITE_API_URL}/records` endpoint that returns an array of objects. Each record should include at least: `id`, `name`, `email`, `status`, `createdAt`.
