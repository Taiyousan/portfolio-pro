import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from 'r3f-perf'

import { Html } from "@react-three/drei";
import Scene from "./components/Scene";
import Overlay from "./components/Overlay";
import { AppContextProvider } from "./context/store";
import { Leva } from "leva";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "./context/store";

export const LevelContext = React.createContext();

export default function CanvasContent() {
  const context = useAppContext();

  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, 8],
        }}
      >
        {/* <Suspense
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
        > */}
        <Scene />
        {/* <Perf /> */}
        {/* </Suspense> */}
      </Canvas>
      <Overlay />
      <Leva hidden />
    </>
  );
}
