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
      position={[
        context.currentProject?.focusGroupPosition[0],
        context.currentProject?.focusGroupPosition[1] - 0.7,
        context.currentProject?.focusGroupPosition[2],
      ]}
      fontSize={0.18}
    >
      {context.currentProject?.name}
    </Text>
  );
};

export default Title;
