
import { GoogleGenAI, Modality } from '@google/genai';
import { RestorationOption, UserInputState } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function constructPrompt(option: RestorationOption, details: UserInputState): string {
    let prompt = `You are an expert AI photo restoration artist. Restore this old photograph using the '${option}' method. `;
    
    prompt += "Apply the following specific enhancements based on user input:\n";

    if (details.gender !== 'Not Specified') {
        prompt += `- Subject's gender is identified as ${details.gender}.\n`;
    }
    prompt += `- Subject's approximate age is ${details.age}.\n`;
    if (details.ethnicity !== 'Not Specified') {
        prompt += `- Subject's ethnicity is identified as ${details.ethnicity}.\n`;
    }
    if (details.redrawHair) {
        prompt += `- Redraw and add fine details to the hair.\n`;
    }
    if (details.restoreClothing) {
        prompt += `- Restore and enhance the details of the clothing, preserving the original style.\n`;
    }
    if (details.removeWatermark) {
        prompt += `- Carefully remove any watermarks, signatures, or text overlays from the image.\n`;
    }
    if (details.enhanceBackground) {
        prompt += `- Enhance the background details, improving clarity and focus where appropriate.\n`;
    }

    prompt += "\nThe final output must be a high-fidelity, professional-grade restored image. Do not add any text or artifacts to the image. Only return the restored image."

    return prompt;
}


export async function restorePhoto(
    base64Image: string,
    mimeType: string,
    option: RestorationOption,
    details: UserInputState
): Promise<string> {
  const model = 'gemini-2.5-flash-image-preview';
  const prompt = constructPrompt(option, details);

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }

  throw new Error('AI did not return an image. It might have refused the request.');
}
