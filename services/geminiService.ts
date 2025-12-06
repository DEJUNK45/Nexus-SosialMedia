import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the Gemini client only if the key is available, 
// otherwise we will handle errors gracefully in the function.
const ai = new GoogleGenAI({ apiKey });

export const generateGeminiResponse = async (prompt: string, modelId: string = 'gemini-2.5-flash'): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please check your environment variables.";
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        // Optional: safety settings or generation config could go here
        temperature: 0.7,
      }
    });

    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Error generating response: ${error.message || "Unknown error"}`;
  }
};