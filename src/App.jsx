import { useDiceRoll } from "./hooks/useDiceRoll";

function App() {
  const {
    randNum,
    setRandNum,
    baisNum,
    setBaisNum,
    biasAmount,
    setBaisAmount,
    randomNumGen,
  } = useDiceRoll(6)

  return (
    <>
      <h1>Random Number</h1>
      <p>{randNum}</p>
      <button onClick={() => setRandNum(randomNumGen())}>Roll the dice!</button>
      <form action="set"></form>
    </>
  );
}

export default App;
