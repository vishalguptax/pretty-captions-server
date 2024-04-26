import axios from "axios";

import * as dotenv from "dotenv";
dotenv.config();

export async function getGPTResponse(query, rhyme) {
  const options = {
    method: "POST",
    url: process.env.RAPID_API_URL,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
    data: {
      messages: [
        {
          role: "user",
          content: `Generate a ${
            rhyme ? "rhyming" : ""
          } caption suitable for sharing on social media for the following text: "${query}". You may want to consider a caption that is ${
            rhyme
              ? "fun and playful, with a catchy rhyme"
              : "engaging and attention-grabbing"
          }. Feel free to add emojis or relevant hashtags to enhance the caption's appeal.`,
        },
      ],
      model: process.env.RAPID_API_GPT_MODEL,
      max_tokens: 200,
      temperature: 0.9,
    },
  };
  return await axios.request(options);
}
