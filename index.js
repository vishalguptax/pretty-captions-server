import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import { getGPTResponse } from "./utils/gpt-req.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", (_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://p-captions.web.app");
  next();
});

app.get("/", (_req, res) => {
  res.send("Looking for something? 😄");
});

app.post("/api", async (req, res) => {
  const { userText, rhyme } = req.body;

  if (!userText) {
    return res.status(400).send("Please provide text for caption generation.");
  }

  try {
    const response = await getGPTResponse(userText, rhyme);
    const generatedCaption = response?.data?.choices[0]?.message?.content;
    res.status(200).json({ data: generatedCaption });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the caption." });
  }
});

app.listen(PORT, () => {
  console.log(`Pretty Caption server is running on port: ${PORT}`);
});
