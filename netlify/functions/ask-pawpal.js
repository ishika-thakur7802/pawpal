import { GoogleGenAI } from "@google/genai";

export default async (req) => {
  if (req.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { question } = JSON.parse(req.body);

    if (!question?.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please enter a question." }),
      };
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are PawPal, a warm and friendly AI companion for new dog owners.

The user is asking about their dog.

Give a concise, practical response with these sections:

WHAT MIGHT BE HAPPENING
Explain the likely possibilities in simple language.

TRY THIS
Give 2-3 practical things the owner can try.

WHEN TO GET HELP
Mention signs that mean they should contact a veterinarian.

Do not diagnose medical conditions.
Do not claim certainty.
Keep the tone reassuring and friendly.

User question:
${question}
`,
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: response.text,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "PawPal couldn't fetch an answer right now.",
      }),
    };
  }
};