import {
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
} from 'discord-interactions';

const AIML_API_KEY = process.env.AIML_API_KEY;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const MODEL = 'gpt-4o';

const getSummary = async (text) => {
  console.log(text)
  try {
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIML_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant who provides summaries for long texts. Format response using simple Markdown (headings, lists, bold).`,
          },
          {
            role: 'user',
            content: `Please summarize the following text:\n\n${text}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    // const data = demoResponse
    console.log(JSON.stringify(data, null, 2))

    const summary =
      data.choices?.[0]?.message?.content ||
      data.choices?.[0]?.messages?.content ||
      '⚠️ No summary generated.';

    return summary;

    return data.choices[0].message.content || '⚠️ No summary generated.';
  } catch (error) {
    console.error('Error in getSummary:', error);
    return '❌ Failed to generate summary.';
  }
};


export async function handleSummaryCommand(interaction, res) {
  // 1. Send a DEFERRED response to avoid 3s timeout
  res.send({
    type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
  });

  // 2. Run async work in background
  (async () => {
    try {
      // Fetch last 50 messages (requires bot token + permissions)
      const r = await fetch(
        `https://discord.com/api/v10/channels/${interaction.channel_id}/messages?limit=50`,
        {
          headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
        }
      );

      if (!r.ok) throw new Error(`Failed to fetch messages: ${r.status}`);
      const messages = await r.json();

      const text = messages
        .reverse()
        .map((m) => `${m.author.username}: ${m.content}`)
        .join('\n');

      // Get summary from AI
      const summary = await getSummary(text);

      // 3. Send follow-up message via interaction webhook
      await fetch(
        `https://discord.com/api/v10/webhooks/${interaction.application_id}/${interaction.token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📌 **Channel Summary:**\n\n${summary}`,
          }),
        }
      );
    } catch (err) {
      console.error('handleSummaryCommand error:', err);

      // Optional error follow-up
      await fetch(
        `https://discord.com/api/v10/webhooks/${interaction.application_id}/${interaction.token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: '⚠️ Could not summarize channel messages.',
            flags: 64, // ephemeral
          }),
        }
      );
    }
  })();
}

