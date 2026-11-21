
import { generateText } from "./providers/geminiAiProvider.js";

export async function generateJSON({ instructions, input }) {
  try {
    const result =   await generateText({ instructions, input });

    console.log("AI result type:", typeof result);
    console.log("AI result:", result);

    if (
      !result ||
      typeof result !== "object" ||
      Array.isArray(result)
    ) {
      throw new Error("AI returned an invalid JSON object");
    }

    return result;
  } catch (error) {
    console.error("AI SERVICE ERROR:", error);
    throw error;
  }
}
