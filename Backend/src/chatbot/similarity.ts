export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Embedding dimensions do not match.");
  }

  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    const ai = a[i];
    const bi = b[i];

    if (ai === undefined || bi === undefined) continue;

    dot += ai * bi;
    magA += ai * ai;
    magB += bi * bi;
  }

  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);

  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dot / (magA * magB);
}