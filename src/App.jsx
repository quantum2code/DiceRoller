import { useDiceRoll } from "./hooks/useDiceRoll";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import React, { useEffect, useState } from "react";

function App() {
  const [isRotating, setIsRotating] = useState(false);
  const {
    randNum,
    setRandNum,
    baisNum,
    setBaisNum,
    biasAmount,
    setBaisAmount,
    randomNumGen,
  } = useDiceRoll(6);

  const { nodes, materials } = useGLTF("/dice.gltf");

  console.log(nodes);
  console.log(materials);

  function RotateDice() {
    const Dice = React.useRef();
    useFrame(({ clock }) => {
      const a = clock.elapsedTime;
      if (isRotating) {
        Dice.current.rotation.x = a * 5;
        Dice.current.rotation.y = a * 15;
      }
    });

    useEffect(()=>{
      if(isRotating){
        setTimeout(()=>{
          setIsRotating(false)
          
        },1500)
      }
    }, [isRotating])
    return (
      <mesh
        ref={Dice}
        geometry={nodes.dice.geometry}
        material={materials.dice_material}
      />
    );
  }

  return (
    <>
      <Canvas className="w-[20rem] h-[20rem] border-2 border-red-400">
        <ambientLight intensity={0.2} />
        <directionalLight color="white" position={[0, 5, 5]} />
        <RotateDice />
        {/* <OrbitControls />
        <mesh
          geometry={nodes.dice.geometry}
          material={materials.dice_material}
        /> */}
        {/* <Dice /> */}
      </Canvas>

      <h1>Random Number</h1>
      <p>{randNum}</p>
      <button
        onClick={() => {
          setRandNum(randomNumGen());
          setIsRotating(true);
        }}
      >
        Roll the dice!
      </button>
      <form action="set"></form>
    </>
  );
}

export default App;
