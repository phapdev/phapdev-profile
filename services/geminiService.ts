import { GoogleGenAI } from "@google/genai";

// Ensure API key is available from environment variables
if (!process.env.API_KEY) {
  // In a real app, you might have a more robust way to handle this,
  // but for this context, an error is appropriate.
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends a complex query to Gemini 2.5 Pro with a maximum thinking budget.
 * @param prompt The user's query.
 * @returns The text response from the model.
 */
export const askGeminiWithThinking = async (
  prompt: string,
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
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
