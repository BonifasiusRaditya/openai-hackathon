'use server';

import OpenAI, { toFile } from 'openai';
import fs from 'fs';
import path from 'path';
import { userPrompt2, userPrompt3, userPrompt4, userPrompt5, userPrompt6, userPrompt7, userPrompt8, userPrompt9, userPrompt10, userPrompt11 } from './promptStepN';

// Make sure we're using the API key from server environment
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function executeStepN(n: number, textCerita: string, imageBase64?: string) {
  try {
    let prompt = '';
    switch (n) {
      case 2:
        prompt = userPrompt2(textCerita);
        break;
      case 3:
        prompt = userPrompt3(textCerita);
        break;
      case 4:
        prompt = userPrompt4(textCerita);
        break;
      case 5:
        prompt = userPrompt5(textCerita);
        break;
      case 6:
        prompt = userPrompt6(textCerita);
        break;
      case 7:
        prompt = userPrompt7(textCerita);
        break;
      case 8:
        prompt = userPrompt8(textCerita);
        break;
      case 9:
        prompt = userPrompt9(textCerita);
        break;
      case 10:
        prompt = userPrompt10(textCerita);
        break;
      case 11:
        prompt = userPrompt11(textCerita);
        break;
      default:
        return {
          success: false,
          error: `Invalid step number: ${n}`,
        };
    }

    let response;

    if (imageBase64) {
      // Convert base64 to buffer
      const imageBuffer = Buffer.from(imageBase64, 'base64');

      // Convert buffer to File object using OpenAI's toFile utility
      const imageFile = await toFile(imageBuffer, 'input-image.png', {
        type: 'image/png',
      });

      // Read the layout wireframe image
      const wireframePath = path.join(process.cwd(), 'src', 'app', 'actions', 'storybook', 'layout-wireframe.png');
      const wireframeFile = await toFile(fs.createReadStream(wireframePath), 'layout-wireframe.png', {
        type: 'image/png',
      });

      // Use images.edit with both images
      response = await openai.images.edit({
        model: 'gpt-image-1',
        image: [wireframeFile, imageFile],
        prompt,
        size: '1536x1024' as unknown as '1024x1024',
        quality: 'high',
      });
    } else {
      // If no image from previous step, just read the layout wireframe
      const wireframePath = path.join(process.cwd(), 'src', 'app', 'actions', 'storybook', 'layout-wireframe.png');
      const wireframeFile = await toFile(fs.createReadStream(wireframePath), 'layout-wireframe.png', {
        type: 'image/png',
      });

      // Use images.edit with just the wireframe
      response = await openai.images.edit({
        model: 'gpt-image-1',
        image: wireframeFile,
        prompt,
        size: '1536x1024' as unknown as '1024x1024',
        quality: 'high',
      });
    }

    const image_base64 = response.data?.[0]?.b64_json;

    if (!image_base64) {
      return {
        success: false,
        error: 'No image data received from API',
      };
    }

    return {
      success: true,
      data: image_base64,
    };
  } catch (error) {
    console.error(`Error executing step ${n}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
