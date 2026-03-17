# Client

React + TypeScript + Vite frontend for the resume platform.

## Commands

```bash
npm run dev
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env` only when the client needs to call a deployed API directly:

```env
VITE_API_BASE_URL=https://your-api.example.com
```

When this variable is not set, local development uses the Vite `/api` proxy to `http://localhost:4000`.
