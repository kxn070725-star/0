import { GoogleGenAI, Type } from "@google/genai";
import { ConceptData } from "../types";

const SYSTEM_INSTRUCTION = `
You are a "Synesthesia Engine". Your goal is to analyze a user's abstract thought, word, or phrase and translate it into a multisensory structured output.
1. Analyze the input for emotional tone, abstract qualities, and visual imagery.
2. Generate a creative title.
3. Write a poetic, 2-sentence description.
4. Create a 3-word abstract summary.
5. Generate a palette of 5 distinct hex color codes that represent the mood.
6. Determine 5 abstract attributes (e.g., Nostalgia, Chaos, Logic, Warmth, Etherealness) relevant to the concept and assign them values from 0 to 100.
7. Suggest a "Soundtrack Mood" (e.g., "Slow cello with rain sounds").
`;

export const analyzeConcept = async (input: string): Promise<ConceptData> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: input,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          abstract: { type: Type.STRING },
          colors: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          attributes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                value: { type: Type.NUMBER },
                fullMark: { type: Type.NUMBER, description: "Always set to 100" },
              },
              required: ["name", "value", "fullMark"],
            },
          },
          soundtrackMood: { type: Type.STRING },
        },
        required: ["title", "description", "abstract", "colors", "attributes", "soundtrackMood"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(text) as ConceptData;
};