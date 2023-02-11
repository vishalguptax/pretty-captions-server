import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

const PORT = 8080 || process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("Looking something? 😄");
});



app.post("/api", async (req, res) => {
  const { userText, rhyme } = req.body;
  const origin = req.headers.origin;

  if (origin === process.env.ORIGIN) {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `create a ${
          rhyme ? "rhyming caption" : "caption"
        } for "${userText}." for social media`,
        max_tokens: 100,
      });
      const generatedCaption = completion.data.choices[0].text;
      res.status(200).json({ data: generatedCaption });
    } catch (error) {
      console.log(error);
      res.status(500).json(error?.response.data.error.message);
    }
  } else {
    res.status(401).send("Please don't try to be smart! 🙂");
  }
});

app.listen(PORT, () => {
  console.log(`Pretty Caption server is running on port: ${PORT})`);
});
