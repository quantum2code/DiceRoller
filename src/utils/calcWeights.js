export function calcWeights(sides, baisNum, biasAmount) {
  const weights = Array.from({ length: sides }, (_, i) => 1);
  weights[baisNum - 1] += biasAmount * sides;
  return weights;
}
