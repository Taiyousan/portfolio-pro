// imports
import { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

export default function Model() {
  let model = useGLTF(`models/model.glb`);

  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 1 : 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <animated.group scale={scale}>
      <primitive object={model.scene} />
    </animated.group>
  );
}
