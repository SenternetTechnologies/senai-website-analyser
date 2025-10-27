import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisType, AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const getAnalysisPrompt = (url: string, type: AnalysisType): string => {
  const commonInstructions = `Analyze the website at the URL: ${url}. Provide a detailed analysis based on the requested type. For each metric, provide a 'name', its current 'value' (as a string or number), a brief 'explanation' of what it is, an actionable 'recommendation' for improvement, and a 'score' from 0 to 100 representing how well it's implemented (0 is very poor, 100 is excellent).`;

  switch (type) {
    case 'on-page':
      return `${commonInstructions} Focus on On-Page SEO. Include metrics like: Title Tag, Meta Description, H1 Tag Usage, Image Alt Attributes, Internal Linking, and Mobile Friendliness.`;
    case 'off-page':
      return `${commonInstructions} Focus on Off-Page SEO. Since you can't crawl backlinks, provide conceptual analysis. Include metrics like: Domain Authority (estimated concept), Backlink Profile (conceptual strength), Social Media Presence (look for common social links on the page), and Brand Mentions (conceptual). The 'value' for these should be descriptive text like 'Appears Strong' or 'Needs Improvement'.`;
    case 'content':
      return `${commonInstructions} Focus on Content Analysis. Include metrics like: Readability Score (e.g., Flesch-Kincaid), Content Originality (conceptual assessment), Keyword Usage (are there clear topics?), and Call-to-Actions (presence and clarity). For Readability, the value should be a grade level.`;
    case 'performance':
      return `${commonInstructions} Focus on Web Performance.
      For Core Web Vitals like 'Largest Contentful Paint (LCP)', 'First Contentful Paint (FCP)', and 'Cumulative Layout Shift (CLS)', provide an estimated 'value', a 'unit' ('s' for seconds, unitless for CLS), and a 'score'. Also, generate a 'historicalData' array of 5 hypothetical past values to show a trend. The last value in historicalData should be the current 'value'.
      Also include other conceptual metrics based on best practices from the page source, like: Image Optimization, JavaScript/CSS Minification, and Caching Policy. For these, 'historicalData' is not needed and the 'value' should be descriptive.`;
    default:
      throw new Error('Invalid analysis type');
  }
};

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    metrics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          value: { type: Type.STRING }, // Keeping value as string for flexibility
          unit: { type: Type.STRING, description: "The unit for the value, e.g., 's', 'ms', 'KB'." },
          explanation: { type: Type.STRING },
          recommendation: { type: Type.STRING },
          score: { type: Type.INTEGER },
          historicalData: {
            type: Type.ARRAY,
            items: { type: Type.NUMBER },
            description: "An array of 5 hypothetical past values to show a trend."
          },
        },
        required: ["name", "value", "explanation", "recommendation", "score"],
      },
    },
  },
  required: ["metrics"],
};

export const analyzeWebsite = async (url: string, type: AnalysisType): Promise<AnalysisResult> => {
  const prompt = getAnalysisPrompt(url, type);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Basic validation
    if (!result || !Array.isArray(result.metrics)) {
        throw new Error("Invalid JSON structure received from API.");
    }
    
    return result as AnalysisResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};