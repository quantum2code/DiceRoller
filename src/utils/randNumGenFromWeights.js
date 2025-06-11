export function randNumGenFromWeights(sides, weights, weightSum) {
  const r = Math.random() * weightSum;
  let accum = 0;
  for (let i = 0; i < sides; i++) {
    accum += weights[i];
    if (r < accum) return i + 1;
  }
  return 1;
}
