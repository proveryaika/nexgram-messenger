# NexGram product outline

## Product direction
Build an original, cross-platform messaging product with a familiar and accessible interaction model. Do not copy Telegram source code, proprietary visual assets, or imply affiliation.

## MVP
- Account registration after legitimate phone-number verification
- Direct conversations and group conversations
- Text messages, replies, reactions, and forwarding
- Image, video, and document attachments with server-side validation
- User search, profile, presence controls, and notification preferences
- Session management and optional two-step account protection

## Later
- Broadcast channels
- Voice notes and calling
- Moderation tools and reporting
- Carefully reviewed end-to-end encryption, if pursued

## Trust and safety requirements
- Rate-limit login and message endpoints
- Use short-lived, single-use verification challenges and server-side attempt limits
- Never simulate real SMS delivery in production
- Validate uploads, enforce file size/type limits, and scan where appropriate
- Provide blocking, reporting, and group/channel moderation
- Keep private credentials on the server
- Enforce premium/owner permissions on the server
- Minimize personal data and define retention/deletion behavior
