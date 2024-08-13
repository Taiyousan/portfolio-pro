import { useAppContext } from "../context/store";
import { Html, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import { useEffect, useState } from "react";

export default function Thumb() {
  const context = useAppContext();
  const { nodes, materials } = useGLTF("models/laptop.glb");
  const [active, setActive] = useState(false);

  const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x252525 });

  const { scale } = useSpring({
    scale: active ? 0.12 : 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 750);
  }, []);

  return (
    <>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={1} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <animated.group
          dispose={null}
          position={[
            context.currentProject?.focusGroupPosition[0] + 0.9,
            context.currentProject?.focusGroupPosition[1] + 0.15,
            context.currentProject?.focusGroupPosition[2],
          ]}
          rotation-x={(-Math.PI / 2) * -0.27}
          rotation-y={(Math.PI / 2) * -0.27}
          scale={scale}
        >
          <group name="Scene">
            <group name="Top_Body">
              <mesh
                name="Plane001"
                castShadow
                receiveShadow
                geometry={nodes.Plane001.geometry}
                material={materials.Body}
              />
              <mesh
                name="Plane001_1"
                castShadow
                receiveShadow
                geometry={nodes.Plane001_1.geometry}
                material={materials["Screen Mat"]}
              />
              <mesh
                name="Plane001_2"
                castShadow
                receiveShadow
                geometry={nodes.Plane001_2.geometry}
                material={materials["Screen Emitter"]}
              />
              <mesh
                name="Plane001_3"
                castShadow
                receiveShadow
                geometry={nodes.Plane001_3.geometry}
                material={materials["Screen Mat Text"]}
              />
              <mesh
                name="Plane001_4"
                castShadow
                receiveShadow
                geometry={nodes.Plane001_4.geometry}
                material={materials.TouchPad}
              />
              <mesh
                name="Plane001_5"
                castShadow
                receiveShadow
                geometry={nodes.Plane001_5.geometry}
                material={materials.Knurling}
              />
              <mesh
                name="Plane001_6"
                castShadow
                receiveShadow
                geometry={nodes.Plane001_6.geometry}
                material={materials.Keyboard}
              />
            </group>
            <mesh
              name="screen"
              castShadow
              receiveShadow
              geometry={nodes.screen.geometry}
              // material={materials["Screen Glass"]}
              material={blackMaterial}
            >
              <Html
                // occlude="blending"
                wrapperClass="thumb-wrapper"
                transform
                scale={0.38}
                occlude="blending"
                position={[0, 1.7, -0.82]}
                rotation-x={(-Math.PI / 2) * 0.27}
              >
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(img/thumbs/${context.currentProject.name}.png)`,
                  }}
                >
                  <div className="visit">
                    <a
                      className="btn-visit"
                      href={context.currentProject.href}
                      target="blank"
                    >
                      Visiter
                    </a>
                  </div>
                </div>
              </Html>
            </mesh>
          </group>
        </animated.group>
      </Float>
    </>
  );
}

useGLTF.preload("models/laptop.glb");
