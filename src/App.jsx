import Dice from "./components/Dice";
import { useDiceRoll } from "./hooks/useDiceRoll";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

function App() {
  const {
    randNum,
    setRandNum,
    baisNum,
    setBaisNum,
    biasAmount,
    setBaisAmount,
    randomNumGen,
  } = useDiceRoll(6);

  const {nodes, materials} = useGLTF('/dice.gltf')

  console.log(nodes)
  console.log(materials)

  return (
    <>
      <Canvas className="w-[20rem] h-[20rem] border-2 border-red-400">
        <ambientLight intensity={1} />
        <directionalLight color="white" position={[0, 5, 5]} />
        <OrbitControls />
        <mesh geometry={nodes.dice.geometry} material={materials.dice_material} />

        {/* <Dice /> */}
      </Canvas>

      <h1>Random Number</h1>
      <p>{randNum}</p>
      <button onClick={() => setRandNum(randomNumGen())}>Roll the dice!</button>
      <form action="set"></form>
    </>
  );
}

export default App;
