// imports
import { useState, useEffect, useRef, useMemo } from "react";
import { useGLTF, Gltf, Float } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import { useControls } from "leva";

import Model from "./Model";
import { useFrame } from "@react-three/fiber";

export default function Cube(props) {
  let model = useGLTF(`models/${props.model.name}.glb`);
  const cube = useGLTF("models/cube.glb");

  const cubeGroup = useRef();

  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 1 : 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  useEffect(() => {
    setActive(true);
  }, []);

  const [
    {
      transmission,
      thickness,
      roughness,
      clearcoat,
      clearcoatRoughness,
      color,
    },
    set,
  ] = useControls(() => ({
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 0.4, min: 0, max: 1 },
    roughness: { value: 0, min: 0, max: 1 },
    clearcoat: { value: 1, min: 0, max: 1 },
    clearcoatRoughness: { value: 0.12, min: 0, max: 1 },
    color: { value: "#ffffff" },
  }));

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: transmission,
    thickness: thickness,
    roughness: roughness,
    clearcoat: clearcoat,
    clearcoatRoughness: clearcoatRoughness,
    // envMap: hdrEquirect,
    envMapIntensity: 1,
    color: color,
    transparent: true,
  });

  // Génère des vitesses de rotation aléatoires une seule fois par cube
  const rotationSpeeds = useMemo(
    () => ({
      x: (Math.random() - 0.5) * 0.01,
      y: (Math.random() - 0.5) * 0.01,
      z: (Math.random() - 0.5) * 0.01,
    }),
    []
  );

  useFrame(() => {
    if (cubeGroup.current) {
      cubeGroup.current.rotation.x += rotationSpeeds.x;
      cubeGroup.current.rotation.y += rotationSpeeds.y;
      cubeGroup.current.rotation.z += rotationSpeeds.z;
    }
  });
  return (
    <Float
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      // floatingRange={[1, 10]}
      rotation={[0, 0, 0]}
      enabled={false}
    >
      <animated.group
        scale={scale}
        position={props.groupPosition}
        ref={cubeGroup}
      >
        <animated.mesh
          castShadow
          receiveShadow
          geometry={cube.nodes.Cube.geometry}
          material={glassMaterial}
          scale={0.5}
          // onClick={handleClick}
          // onPointerEnter={handleHover}
          // onPointerLeave={handleUnhover}
        />
        <primitive
          object={model.scene}
          scale={props.model.scale}
          position-y={props.model.positionY}
          position-x={props.model.positionX}
          position-z={props.model.positionZ}
        />
      </animated.group>
    </Float>
  );
}
