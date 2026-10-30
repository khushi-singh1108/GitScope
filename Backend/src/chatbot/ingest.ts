import fs from "fs";
import path from "path";
import { generateEmbedding } from "./embedding";

const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 100;

function splitText(text: string): string[] {
  const chunks: string[] = [];

  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + CHUNK_SIZE, text.length);

    chunks.push(text.slice(start, end));

    start += CHUNK_SIZE - CHUNK_OVERLAP;
  }

  return chunks;
}

async function ingest() {
  const knowledgePath = path.join(process.cwd(), "knowledge-base");

  const files = fs
    .readdirSync(knowledgePath)
    .filter(file => file.endsWith(".md"));

  const allChunks = [];

  for (const file of files) {
    console.log(`Processing ${file}`);

    const content = fs.readFileSync(
      path.join(knowledgePath, file),
      "utf8"
    );

    const chunks = splitText(content);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      if (!chunk) continue;

      const embedding = await generateEmbedding(chunk);

      allChunks.push({
        id: `${file}-${i}`,
        title: file.replace(".md", ""),
        content: chunk,
        embedding
      });
    }
  }

  fs.writeFileSync(
    path.join(process.cwd(), "data", "embeddings.json"),
    JSON.stringify(allChunks, null, 2)
  );

  console.log("Embeddings generated successfully.");
}

ingest();