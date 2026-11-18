# NexGram

NexGram is an original cross-platform messaging app project. It aims to offer familiar messaging workflows—direct chats, groups, channels, media sharing, reactions, search, and calls—under its own brand and implementation.

NexGram is not affiliated with Telegram. It does not use Telegram's source code, proprietary assets, or branding.

## Current status

**Early UI prototype.** The repository contains an Expo + React Native + TypeScript app with:
- Dark-themed chat list and local search
- Conversation screen with a local-only message composer
- Sample contacts, channel directory, and settings screens
- Product and architecture notes

The prototype has no production backend. Messages are not delivered to other users. Real accounts, phone verification, media uploads, push notifications, online presence, calls, and end-to-end encryption are not implemented.

## Run locally

Requirements: Node.js LTS and a recent Android/iOS simulator or Expo Go-compatible device.

```bash
npm install
npx expo start
```

Use the Expo terminal shortcuts to open Android, iOS, or web where supported.

## Planned milestones

1. Complete the client navigation and interaction prototype
2. Design and implement secure authentication and account/session management
3. Add backend persistence, realtime delivery, groups, and channels
4. Add safe media upload and push notifications
5. Add calling and perform security, privacy, and accessibility reviews

## Security

- Never commit API keys, passwords, signing keys, or production secrets.
- Production phone verification must use a legitimate verification provider; demo codes must be clearly marked as test-only.
- Enforce authorization, rate limits, and ownership rules on the server, not only in the UI.
- Do not claim end-to-end encryption until a protocol is implemented and independently reviewed.

## License

No license has been added. The source is not currently granted an open-source reuse license.


## API server (foundation)

A separate Node.js + TypeScript API service now lives in `server/`.

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The local API listens on `http://localhost:4000`. Check `GET /health` and `GET /v1/status`.

**Important:** this is only the server foundation. Database persistence, real phone verification, authenticated accounts, messaging, realtime delivery, and media storage are not connected yet. The phone-code endpoint intentionally stays disabled until a legitimate verification provider is configured. See [server/README.md](server/README.md) for details.
