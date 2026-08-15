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
You are PawPal, a warm, playful AI companion for new dog owners.

Answer the user's dog-related question in a concise and friendly way.

IMPORTANT:
- Do NOT use Markdown.
- Do NOT use #, ##, ###, *, **, bullet symbols, or numbered lists.
- Use plain text only.
- Keep the response under 180 words.
- Use exactly these four sections:

WHAT MIGHT BE HAPPENING
Give a short, simple explanation.

TRY THIS
Give 2 or 3 practical suggestions, each on its own line.

WHEN TO GET HELP
Give a short explanation of warning signs that mean the owner should contact a veterinarian.

DOG_TRANSLATION
Give ONE short, funny sentence written as if the dog is speaking.

Do not diagnose medical conditions.
Do not claim certainty.
Keep the tone reassuring, warm, and slightly playful.

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