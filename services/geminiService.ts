import { GoogleGenAI } from "@google/genai";

// Lazy initialization - chỉ tạo khi cần thiết
let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable not set.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

/**
 * Sends a complex query to Gemini 2.5 Pro with a maximum thinking budget.
 * @param prompt The user's query.
 * @returns The text response from the model.
 */
export const askGeminiWithThinking = async (
  prompt: string,
): Promise<string> => {
  try {
    const aiInstance = getAI();
    const response = await aiInstance.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        // Set thinking budget to the maximum for gemini-2.5-pro to handle complex queries
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });
    return response.text || 'phapdev: "Vì nghèo nên chưa gắn key 🥹"';
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI.";
  }
};
