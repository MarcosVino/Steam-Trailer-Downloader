import { GoogleGenAI } from "@google/genai";

// This check prevents a ReferenceError in browser environments where 'process' is not defined.
// The API key is expected to be provided by the runtime environment.
const API_KEY = (typeof process !== 'undefined' && process.env && process.env.API_KEY) 
  ? process.env.API_KEY 
  : undefined;

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateGameSummary(description: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("Gemini API key is not available in the environment.");
  }
  
  const cleanDescription = description.replace(/<[^>]*>?/gm, ''); // Remove HTML tags

  const prompt = `Based on the following game description, write a short, exciting summary for a potential player. Keep it concise, between 2 to 4 sentences. Make it sound appealing.

Description: "${cleanDescription.substring(0, 2000)}"

Summary:`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    throw new Error("Failed to generate AI summary.");
  }
}