# ClariFlow

ClariFlow is a Discord AI Bot designed to tackle information overload in Discord channels. It quickly summarizes messages, helping users save time and focus on key points.

## Features
- Message Summarization – Condenses long Discord threads into concise key points.
- JSON Input / Markdown Output – Converts messages to JSON for AI processing, then outputs human-readable Markdown summaries.
- Batch Processing – Handles multiple messages efficiently while respecting API input limits.

## Development
### 1. Clone the repository:
```
git clone https://github.com/jon-zuka/clariflow
cd ClariFlow
```

### 2. Install dependencies:
```
npm install
```

### 3.	Create a Discord app and bot:
- Enable applications.commands and bot permissions
- Enable Send Messages

### 4. Add credentials to .env (see .env.sample):
```
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_client_id
DISCORD_PUBLIC_KEY=your_public_key
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-5-turbo
```
### 5. Register Slash commands:
```
npm run register
```

### 6. Start the bot:
```
npm run dev
```

### 7. Set up interactivity with a public endpoint:

- Install ngrok and run:
```
ngrok http 3000
```
- Copy the HTTPS forwarding URL and append /interactions
- Paste it into your Discord app’s Interactions Endpoint URL
