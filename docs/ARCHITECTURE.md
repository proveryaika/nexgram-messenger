# NexGram architecture plan

## Current client prototype
Expo Router + React Native + TypeScript. Screens currently use local sample data and navigation only.

## Proposed production boundaries
- Mobile client: presentation, local cache, push-token registration.
- API: authentication, authorization, conversations, message delivery, uploads, moderation.
- Database: users, sessions, devices, conversations, memberships, messages, reactions, channel posts.
- Realtime gateway: online presence, typing indicators, new-message events.
- Object storage: media with signed, short-lived access URLs.
- Push provider: APNs and FCM.

## Core data model (initial)
- users(id, username, display_name, avatar_key, created_at)
- devices(id, user_id, push_token, platform, last_seen_at)
- sessions(id, user_id, created_at, expires_at, revoked_at)
- conversations(id, kind, title, created_by, created_at)
- memberships(conversation_id, user_id, role, joined_at)
- messages(id, conversation_id, sender_id, body, reply_to_id, created_at, edited_at, deleted_at)
- attachments(id, message_id, storage_key, mime_type, byte_size)
- reactions(message_id, user_id, emoji)

## Security requirements
Authentication challenges must be verified by a real provider in production. Enforce throttling, one-time challenge consumption, expiry, and attempt limits on the server. Apply authorization checks to every conversation and media request. Do not claim end-to-end encryption until a reviewed protocol is implemented.
