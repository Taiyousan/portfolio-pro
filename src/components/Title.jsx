import { Text } from "@react-three/drei";
import { useAppContext } from "../context/store";
import { useEffect } from "react";

const Title = () => {
  const context = useAppContext();
  useEffect(() => {
    console.log("ok");
  }, []);

  return (
    <Text
      color="black"
      anchorX="center"
      anchorY="middle"
      position={context.currentProject?.focusGroupPosition}
      fontSize={0.5}
    >
      {context.currentProject?.name}
    </Text>
  );
};

export default Title;
