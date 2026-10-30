import { loadKnowledgeBase } from "./vectorStore";
import { retrieveRelevantChunks } from "./retriever";

async function main() {
  loadKnowledgeBase();

  const results = await retrieveRelevantChunks(
    "How does Redis caching work?"
  );

  console.log(results);
}

main();