// imports
import { useState, useEffect, useRef, useMemo } from "react";
import { useGLTF, Gltf, Float } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import { useControls } from "leva";

import Model from "./Model";
import { useFrame } from "@react-three/fiber";

import { useAppContext } from "../context/store";

export default function Cube(props) {
  let model = useGLTF(`models/${props.model.name}.glb`);
  const cube = useGLTF("models/cube.glb");
  const context = useAppContext();

  const cubeGroup = useRef();

  const [active, setActive] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [clicked, setClicked] = useState(false);
  const { scale } = useSpring({
    scale: active ? 1 : 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  const { positionY } = useSpring({
    positionY: active ? props.groupPosition[1] : -8,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
    // onChange: (positionY) => {
    //   if (props.model.name === "boinaud") {
    //     console.log("positionY", positionY.value);
    //   }
    // },
  });
  const { glassOpacity } = useSpring({
    value: !clicked ? 1 : 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
    onChange: (glassOpacity) => {
      glassMaterial.opacity = glassOpacity.value.value;
      glassMaterial.needsUpdate = true;
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, props.delay);
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
      // x: (Math.random() - 0.5) * 0.01,
      // y: (Math.random() - 0.5) * 0.01,
      // z: (Math.random() - 0.5) * 0.01,
      x: 0.005,
      y: 0.005,
      z: 0.005,
    }),
    []
  );

  // Store the initial rotation quaternion
  const initialRotation = useMemo(() => new THREE.Quaternion(), []);

  const [rotationSpeedFactor, setRotationSpeedFactor] = useState(1);

  useFrame(() => {
    if (cubeGroup.current) {
      if (context.allRotatingCubes) {
        cubeGroup.current.rotation.x += rotationSpeeds.x;
        cubeGroup.current.rotation.y += rotationSpeeds.y * rotationSpeedFactor;
        cubeGroup.current.rotation.z += rotationSpeeds.z;
      } else if (!context.allRotatingCubes && clicked) {
        // Interpolate rotation back to initial rotation
        cubeGroup.current.quaternion.slerp(initialRotation, 0.1);
      }
    }
  });

  useEffect(() => {
    if (context.allRotatingCubes) {
      setClicked(false);
      setActive(true);
    } else if (!context.allRotatingCubes && !clicked) {
      setActive(false);
    } else if (!context.allRotatingCubes && clicked) {
      setActive(true);
    }
  }, [context.allRotatingCubes]);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      recentrer();
      focusOnCube();
    }
  };
  const easeOutQuad = (t) => t * (2 - t);

  const handleHover = () => {
    setRotationSpeedFactor(30);

    // Déclenche la diminution progressive après un délai de 2 secondes
    setTimeout(() => {
      let start = null;
      const duration = 500; // Durée de l'effet de ease

      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Utilisation d'une fonction d'interpolation pour une transition en douceur
        const easedProgress = easeOutQuad(progress / duration);
        const newSpeedFactor = 10 - 9 * easedProgress;

        setRotationSpeedFactor(newSpeedFactor);

        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          setRotationSpeedFactor(1); // Assurez-vous que la vitesse est ramenée à 1 à la fin
        }
      };

      requestAnimationFrame(animate);
    }, 500); // Délai avant de commencer la diminution progressive
  };

  const recentrer = () => {
    // setIsRotating(false);
    context.setAllRotatingCubes(false);
  };

  const focusOnCube = () => {
    context.cameraControlsRef.current?.setPosition(
      props.groupPosition[0],
      props.groupPosition[1],
      2,
      true
    );
    context.cameraControlsRef.current?.setTarget(
      props.groupPosition[0],
      props.groupPosition[1],
      props.groupPosition[2],
      true
    );
  };

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
        ref={cubeGroup}
        position-x={props.groupPosition[0]}
        position-y={positionY}
        position-z={props.groupPosition[2]}
        onPointerEnter={() => {
          if (!clicked) handleHover();
        }}
      >
        <animated.mesh
          castShadow
          receiveShadow
          geometry={cube.nodes.Cube.geometry}
          material={glassMaterial}
          scale={0.5}
          onClick={handleClick}
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
