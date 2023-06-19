import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType
} from 'discord-interactions';
import { DiscordRequest, VerifyDiscordRequest } from './utils.js';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create an express app
const app = express();
const PORT = process.env.PORT || 3000;

// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));


let promptRequest = '';

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data, member } = req.body;

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    if (name === 'prompt') {
      let option = req.body.data.options[0].value;

      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Thinking...",
        },
      });
      
      // Update message with token in request body
      let endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/@original`;
      openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content:generatePrompt(option, member), name: id }],
        temperature: 0.7
      }).then((item)=>{
        return DiscordRequest(endpoint, {
            method: 'PATCH',
            body: {
              content: promptRequest + item.data.choices[0].message.content,
              components: [],
            }
          });
        });
    }
  }
});

function generatePrompt(option, member) {
  promptRequest = '```' + member.user.global_name + ': ' + option + '```\n';
  return option + '.  Respond in the style of Nick Cannon.  Pretend your name is ZackBot69000';
}

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
