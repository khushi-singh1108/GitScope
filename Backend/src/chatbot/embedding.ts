import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { pipeline } from "@xenova/transformers";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

let extractor: any = null;

async function getExtractor() {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/bge-small-en-v1.5"
    );
  }

  return extractor;
}

export async function generateEmbedding(
  text: string
): Promise<number[]> {
  const extractor = await getExtractor();

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}
(async () => {
  const embedding = await generateEmbedding(
    "What is GitScope?"
  );

  console.log(embedding.length);
})();