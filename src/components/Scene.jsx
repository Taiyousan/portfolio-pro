// imports
import {
  CameraControls,
  Center,
  ContactShadows,
  Environment,
  Html,
  Resize,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useAppContext } from "../context/store";
import { TailSpin } from "react-loader-spinner";

// components
import Model from "./Model";

export default function Scene() {
  const context = useAppContext();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[10, 15, 10]} />
      <Environment preset="city" />
      <CameraControls ref={context.cameraControlsRef} />
      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, -1, 0]}
        opacity={0.5}
        width={10}
        height={10}
        blur={0.5}
        far={10}
      />

      <Center>
        <Suspense
          fallback={
            <Html>
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#373e54"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </Html>
          }
        >
          <Model />
        </Suspense>
      </Center>
    </>
  );
}
