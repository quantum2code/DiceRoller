import { useEffect, useState } from "react";
import { calcWeights } from "../utils/calcWeights";
import { randNumGenFromWeights } from "../utils/randNumGenFromWeights";

export function useDiceRoll(sides = 6) {
  const [weights, setWeights] = useState(
    Array.from({ length: sides }, (_, i) => 1)
  );
  const [baisNum, setBaisNum] = useState(6);
  const [biasAmount, setBaisAmount] = useState(0);
  const [weightSum, setWeightSum] = useState(6);
  const [randNum, setRandNum] = useState(1);

  useEffect(() => {
    const newWeights = calcWeights(sides, baisNum, biasAmount);
    setWeights(newWeights);
    setWeightSum(weights.reduce((a, b) => a + b, 0));
  }, [baisNum, biasAmount]);

  const randomNumGen = () => randNumGenFromWeights(sides, weights, weightSum);

  return {
    randNum,
    setRandNum,
    baisNum,
    setBaisNum,
    biasAmount,
    setBaisAmount,
    randomNumGen,
  };
}
