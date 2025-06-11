import { useEffect, useState } from "react";
// import randomNumGen from "./utils/randomNumGen";
// import baisWeightGen from "./utils/biasWeightGen";

function App() {
  const sides = 6;
  const [weights, setWeights] = useState(
    Array.from({ length: sides }, (_, i) => 1)
  );
  const [baisNum, setBaisNum] = useState(6);
  const [biasAmount, setBaisAmount] = useState(0);
  const [weightSum, setWeightSum] = useState(6);
  const [randNum, setRandNum] = useState(1);

  useEffect(() => {
    const sides = 6;
    const weights = Array.from({ length: sides }, (_, i) => 1);
    weights[baisNum - 1] += biasAmount * sides; // scale by # of sides
    setWeights(weights)
    const total = weights.reduce((a, b) => a + b, 0);
    setWeightSum(total)
  }, [baisNum, biasAmount]);


const randomNumGen = () => {
  const r = Math.random() * weightSum;
  let accum = 0;
  for (let i = 0; i < sides; i++) {
    accum += weights[i];
    if (r < accum) return i + 1;
  }
}

  return (
    <>
      <h1>Random Number</h1>
      <p>{randNum}</p>
      <button onClick={() => setRandNum(randomNumGen())}>New number</button>
      <form action="set"></form>
    </>
  );
}

export default App;
