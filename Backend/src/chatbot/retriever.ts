import { generateEmbedding } from "./embedding";
import { cosineSimilarity } from "./similarity";
import { getKnowledgeChunks } from "./vectorStore";

export async function retrieveRelevantChunks(
  question: string,
  topK = 3
) {
  const questionEmbedding = await generateEmbedding(question);

  const chunks = getKnowledgeChunks();

  const scored = chunks.map(chunk => ({
    ...chunk,
    score: cosineSimilarity(
      questionEmbedding,
      chunk.embedding
    )
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}