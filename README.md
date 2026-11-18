# NexGram

NexGram is an original messaging app project. It aims to provide familiar messaging capabilities—direct chats, groups, channels, media sharing, reactions, search, and calls—using its own name, interface, code, and backend.

> This project is not affiliated with Telegram. It does not copy Telegram's source code, branding, or proprietary assets.

## Project status

Early client prototype. The current screens use local sample data only. No real accounts, message delivery, encryption, uploads, push notifications, or calls are implemented yet.

## Stack

- Expo + React Native + TypeScript
- Expo Router for navigation
- Backend integration will be selected and configured later
- Secrets and service credentials must stay out of the client and Git history

## Run locally

```bash
npm install
npx expo start
```

## Planned milestones

1. App shell, navigation, chat list, and conversation UI
2. Authentication with verified phone-number ownership and abuse protection
3. Server-backed messaging, groups, channels, and media storage
4. Push notifications, presence, search, and multi-device sessions
5. Voice/video calling and security review

## Security notes

- Demo data is not real user data.
- Never commit API keys, passwords, signing keys, or production secrets.
- Production authentication must use a legitimate verification provider; demo codes must be clearly marked as test-only.
- Authorization and owner-only features must be enforced by the server, not only hidden in the UI.
- Do not describe the app as end-to-end encrypted until its protocol has been independently reviewed.

## License

No license has been added yet. Until one is chosen, the code is not granted an open-source reuse license.
