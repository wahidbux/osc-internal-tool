import { writeFile, mkdir } from "fs/promises";
import { dirname } from "path";
import type { InferenceClient } from "@huggingface/inference";
import hfClient from "../utils/huggingface-client";
import openaiClient from "../utils/gemini-client";
import { ENHANCE_IMAGE_DESCRIPTION } from "../utils/prompt";

class ImageGeneration {
  client: InferenceClient | null = null;
  constructor() {
    this.client = hfClient;
  }
  async enhancePromptForImage(prompt: string) {
    try {
      const response = await openaiClient.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
          { role: "system", content: ENHANCE_IMAGE_DESCRIPTION },
          { role: "user", content: prompt },
        ],
      });
      if (!response) throw new Error("image prompt enhancement failed!");
      return response.choices[0]?.message.content;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async generateImage(prompt: string) {
    try {
      if (prompt.trim().length === 0) {
        return null;
      }

      const enhancedPrompt = await this.enhancePromptForImage(prompt);
      if (!enhancedPrompt) throw new Error("No Enhanced prompt found");

      console.log("prompt is : ", enhancedPrompt);

      const result = await this.client?.textToImage({
        provider: "nebius",
        model: "black-forest-labs/FLUX.1-dev",
        inputs: enhancedPrompt,
        parameters: { num_inference_steps: 5 },
      });

      if (!result) throw new Error("No result from textToImage");

      //   @ts-ignore
      const arrayBuffer = await result.arrayBuffer();

      const savePath = "./public/generated-image.png";
      return await this.saveImageToDisk(arrayBuffer, savePath);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async saveImageToDisk(buffer: ArrayBuffer, filePath: string) {
    try {
      const dir = dirname(filePath);
      await mkdir(dir, { recursive: true });

      const nodeBuffer = Buffer.from(buffer);
      await writeFile(filePath, nodeBuffer);
      console.log(`Image saved to ${filePath}`);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
const imageGeneration = new ImageGeneration();
export default imageGeneration;
