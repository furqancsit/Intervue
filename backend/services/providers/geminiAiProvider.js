
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateText({ instructions, input }) {
  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: JSON.stringify(input),
      config: {
        systemInstruction: instructions,
        responseMimeType: "application/json",
      },
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty response");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("GEMINI PROVIDER ERROR:", error);
    throw error;
  }
}
