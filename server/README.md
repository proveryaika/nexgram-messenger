# NexGram API

A separate Node.js + TypeScript API service built with Fastify.

## Run locally

Requires Node.js 20 or newer.

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The API listens on `http://localhost:4000` by default.

- `GET /health` — process health check
- `GET /v1/status` — API stage and enabled capabilities
- `POST /v1/auth/phone/request-code` — intentionally returns HTTP 503 until a legitimate SMS verification provider is configured

## Current limitations

This is the server foundation, not a production messaging backend. It does not yet store accounts or messages, issue login codes, synchronize devices, or provide realtime delivery. No fake OTP codes are generated. Rate limiting is currently process-local; production deployment must use shared storage and stronger abuse controls.

Next backend milestones:
1. Select and connect PostgreSQL/Supabase.
2. Add migrations and account/session models.
3. Integrate a legitimate phone verification provider with expiring, single-use codes and attempt limits.
4. Add authenticated chat, group, channel, and message APIs with server-side authorization.
5. Add realtime delivery, validated media storage, and audit/security tests.

Never commit `.env` files or production credentials.
