import { useDiceRoll } from "./hooks/useDiceRoll";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import React, { useEffect, useState, useRef } from "react";

function App() {
  const [isRotating, setIsRotating] = useState(false);
  const rotationDataRef = useRef(null);
  const [displayNum, setDisplayNum] = useState("??")
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

  const faceRotations = {
    1: [0, 0, 0],
    2: [Math.PI / 2, 0, 0],
    3: [0, -Math.PI / 2,0],
    4: [0, Math.PI / 2,0],
    5: [-Math.PI / 2, 0, 0],
    6: [Math.PI, 0, 0],
  };

  function RotateDice() {
    const Dice = React.useRef();
    useFrame(({ clock }) => {
      const a = clock.elapsedTime;
      if (isRotating) {
        Dice.current.rotation.x = a * 5;
        Dice.current.rotation.y = a * 15;
        rotationDataRef.current = Dice.current.rotation;
      } else if (randNum) {
        const targetEuler = new THREE.Euler(...faceRotations[randNum]);
        // Smoothly interpolate (lerp) current rotation towards target rotation
        Dice.current.rotation.x += (targetEuler.x - Dice.current.rotation.x) * 0.2;
        Dice.current.rotation.y += (targetEuler.y - Dice.current.rotation.y) * 0.2;
        Dice.current.rotation.z += (targetEuler.z - Dice.current.rotation.z) * 0.2;
      }
    });

    useEffect(() => {
      if (isRotating) {
        setTimeout(() => {
          setIsRotating(false);
          setDisplayNum(randNum)
        }, 1500);
      }
    }, [isRotating]);
    return (
      <mesh
        ref={Dice}
        geometry={nodes.dice.geometry}
        material={materials.dice_material}
        scale={0.2}
      />
    );
  }

  return (
    <>
    <div className=" flex flex-col items-center gap-[1rem] m-0">
      <div className="w-[15rem] h-[15rem]">
        <Canvas
          camera={{ fov: 10 }}
        >
          <ambientLight intensity={2} />
          <directionalLight color="white" position={[0, 5, 5]} />
          <spotLight color={"white"} position={[0,5,6]} intensity={10} angle={-Math.PI/4}/>
          <RotateDice />
        </Canvas>
      </div>

      <h1 className="italic">and you number is.....</h1>
      <p className="font-mono text-2xl">{displayNum}</p>
      <button
        onClick={() => {
          setRandNum(randomNumGen());
          setIsRotating(true);
          setDisplayNum("??")
        }}
      >
        Roll the dice!
      </button>
    </div>
    </>
  );
}

export default App;
