import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const analyzeArsenicRisk = async (location: string, dataPoints: any[]) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Analyze groundwater arsenic risk for ${location}. 
  Data snapshots: ${JSON.stringify(dataPoints)}. 
  Provide a scientific assessment, uncertainty levels, and health recommendations. 
  Format as JSON: { assessment: string, uncertainty: string, recommendations: string[] }`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};

export const generateMedicalNarrative = async (imagePrompt: string, symptoms: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Act as a specialized toxicologist. A patient from West Bengal reports: ${symptoms}. 
  User mentions: ${imagePrompt}. 
  Analyze potential chronic arsenicosis (skin lesions, keratosis). 
  Generate a professional medical narrative for a primary care physician. 
  Include: Possible staging, suggested tests (nail/hair analysis), and differential diagnosis.
  Note: This is an inference tool, not a diagnostic one.`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
};
