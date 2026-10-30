import fs from "fs";
import path from "path";

export interface KnowledgeChunk {
  id: string;
  title: string;
  content: string;
  embedding: number[];
}

let chunks: KnowledgeChunk[] = [];

export function loadKnowledgeBase() {
  const filePath = path.join(
    process.cwd(),
    "data",
    "embeddings.json"
  );

  const data = fs.readFileSync(filePath, "utf8");

  chunks = JSON.parse(data);

  console.log(`Loaded ${chunks.length} knowledge chunks.`);
}

export function getKnowledgeChunks() {
  return chunks;
}