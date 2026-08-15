import { GoogleGenAI } from "@google/genai";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const { question } = await req.json();

    if (!question?.trim()) {
      return new Response(
        JSON.stringify({ error: "Please enter a question." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
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

    return new Response(
      JSON.stringify({
        answer: response.text,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("PawPal error:", error);

    return new Response(
      JSON.stringify({
        error: "PawPal couldn't fetch an answer right now.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};