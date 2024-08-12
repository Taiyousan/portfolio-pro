// imports
import { useState, useEffect, useRef, useMemo } from "react";
import { useGLTF, Gltf, Float, Text, Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import { useAppContext } from "../context/store";

export default function AboutButton() {
  const context = useAppContext();
  const model = useGLTF("models/picto-shams.glb");
  const [hovered, setHovered] = useState(false);

  // mesh
  const { scale, positionY } = useSpring({
    scale: context.allRotatingCubes ? (hovered ? 0.5 : 0.3) : 0,
    positionY: context.currentProject || !context.allRotatingCubes ? 8 : 0,
    config: { mass: 1, tension: 400, friction: 50, precision: 0.0001 },
  });

  // text
  const { textScale, textPositionY } = useSpring({
    textScale: hovered ? 0.3 : 0,
    textPositionY: hovered ? -1.5 : 0,
    config: { mass: 1, tension: 400, friction: 50, precision: 0.0001 },
  });

  return (
    <Float
      speed={3} // Animation speed, defaults to 1
      rotationIntensity={5} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <animated.group
        position-y={positionY}
        rotation-x={(Math.PI / 2) * 1}
        scale={scale}
        onClick={() => {
          context.setAllRotatingCubes(false);
          context.setIsCards(true);
        }}
      >
        <animated.group
          scale={textScale}
          position-z={textPositionY}
          rotation-x={(Math.PI / 2) * -1}
        >
          <Text color={"#000"}>À propos de moi</Text>
        </animated.group>
        <animated.mesh
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <primitive object={model.scene} />
        </animated.mesh>
      </animated.group>
    </Float>
  );
}

useGLTF.preload("models/picto-shams.glb");
