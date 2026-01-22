import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GEMINI_KEY

async function runChat(prompt) {
  // Init with API key
  const ai = new GoogleGenerativeAI(apiKey);

  // Pick a model
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Send user prompt
  const result = await model.generateContent(prompt);

  // Extract text safely
  const text = result.response.text();

  return text; // ✅ return response so Context can use it
}

export default runChat;
