/* eslint-env node */
import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: messages.map((m) => `${m.role}: ${m.content}`).join("\n"),
  });
    
  console.log("API key loaded?", Boolean(process.env.OPENAI_API_KEY));

  res.json({
    reply: response.output[0].content[0].text,
  });
});

app.listen(3001, () => console.log("Server running"));