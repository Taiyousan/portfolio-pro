// imports
import {
  CameraControls,
  Center,
  ContactShadows,
  Environment,
  Html,
  Resize,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import { useAppContext } from "../context/store";
import { TailSpin } from "react-loader-spinner";
import models from "../data/models.json";

// components
import Model from "./Model";
import Cube from "./Cube";
import Title from "./Title";

export default function Scene() {
  const context = useAppContext();
  const radius = 2;

  const calculatePosition = (index, total) => {
    const angle = ((2 * Math.PI) / total) * index;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return [x, y, 0];
  };

  const mouseMoveCamera = (e) => {
    if (context.allRotatingCubes === true) {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      context.cameraControlsRef.current?.setPosition(
        (context.defaultCameraPosition[0] * x) / 50,
        (context.defaultCameraPosition[1] * y) / 50,
        context.defaultCameraPosition[2],
        true
      );
      context.cameraControlsRef.current?.setTarget(
        (context.defaultCameraPosition[0] * x) / 100,
        (context.defaultCameraPosition[0] * y) / 100,

        0,
        true
      );
    }
  };

  const mouseOutCamera = () => {
    context.setAllRotatingCubes(true);
    context.resetCamera();
  };

  useEffect(() => {
    // log mouse position on mouse move
    window.addEventListener("mousemove", mouseMoveCamera);
    window.addEventListener("mouseout", mouseOutCamera);

    return () => {
      window.removeEventListener("mousemove", mouseMoveCamera);
      window.removeEventListener("mouseout", mouseOutCamera);
    };
  }, [context.allRotatingCubes]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[10, 15, 10]} />
      <Environment preset="city" />
      <CameraControls ref={context.cameraControlsRef} />
      {/* <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, -1, 0]}
        opacity={0.5}
        width={10}
        height={10}
        blur={0.5}
        far={10}
      /> */}

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
          {context.currentProject && <Title />}
          {models.map((model, index) => {
            // if (index > 4) return null;

            const groupPosition = calculatePosition(index, models.length);
            // console.log("groupPosition", groupPosition);

            return (
              <Cube
                key={index}
                model={model}
                delay={index * 250}
                groupPosition={groupPosition}
              />
            );
          })}
        </Suspense>
      </Center>
    </>
  );
}

useGLTF.preload("models/bbc.glb");
