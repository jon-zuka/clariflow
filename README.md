ClariFlow

ClariFlow is a Discord AI Bot designed to tackle information overload in Discord channels. It quickly summarizes messages, helping users save time and focus on key points.

⸻

Features
	•	Message Summarization – Condenses long Discord threads into concise key points.
	•	JSON Input / Markdown Output – Converts messages to JSON for AI processing, then outputs human-readable Markdown summaries.
	•	Batch Processing – Handles multiple messages efficiently while respecting API input limits.

⸻

Project Structure

├── examples          -> short, feature-specific sample apps
│   ├── app.js        -> complete example
│   ├── button.js
│   ├── command.js
│   ├── modal.js
│   ├── selectMenu.js
├── .env.sample       -> sample environment variables file
├── app.js            -> main entry point
├── commands.js       -> slash commands and helper functions
├── utils.js          -> utility functions and enums
├── package.json
├── README.md
└── .gitignore


⸻

Installation
	1.	Clone the repository:

git clone https://github.com/jon-zuka/clariflow
cd ClariFlow

	2.	Install dependencies:

npm install

	3.	Create a Discord app and bot:
	•	Enable applications.commands and bot permissions
	•	Enable Send Messages
	4.	Add credentials to .env (see .env.sample):

DISCORD_BOT_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_client_id
DISCORD_PUBLIC_KEY=your_public_key
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-5-turbo


⸻

Running the Bot Locally
	1.	Register Slash commands:

npm run register

	2.	Start the bot:

node app.js

⚙️ Optional: use nodemon for automatic restarts during development.

	3.	Set up interactivity with a public endpoint:
	•	Install ngrok and run:

ngrok http 3000

	•	Copy the HTTPS forwarding URL and append /interactions
	•	Paste it into your Discord app’s Interactions Endpoint URL

⸻

Usage

Once running, ClariFlow will:
	1.	Extract messages from specified Discord channels.
	2.	Summarize messages within character limits.
	3.	Output summaries in Markdown format for easy reading.

⸻

Additional Resources
	•	Discord API Documentation
	•	ngrok Documentation
	•	Discord Developers Server
