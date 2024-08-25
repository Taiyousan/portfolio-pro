import { Text } from "@react-three/drei";
import { useAppContext } from "../context/store";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/three";

const Title = () => {
  const context = useAppContext();

  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1 : 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 250);
  }, []);

  return (
    <animated.group
      position={[
        context.currentProject?.focusGroupPosition[0],
        context.currentProject?.focusGroupPosition[1] - 0.7,
        context.currentProject?.focusGroupPosition[2],
      ]}
      scale={scale}
    >
      {/* <Text color="black" anchorX="center" anchorY="middle" fontSize={0.1}>
        {context.currentProject?.title}
      </Text> */}
    </animated.group>
  );
};

export default Title;
