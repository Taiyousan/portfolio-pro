// imports
import { useState, useEffect } from "react";
import { useGLTF, Gltf } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import { useControls } from "leva";

import Model from "./Model";



export default function Cube(props) {
    let model = useGLTF(`models/${props.model.name}.glb`); const cube = useGLTF("models/cube.glb");


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

    return (
        <animated.group scale={scale} position={props.groupPosition}>
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
            />
        </animated.group>
    );
}
