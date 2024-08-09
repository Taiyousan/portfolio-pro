import { useAppContext } from "../context/store";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useGLTF, Html } from "@react-three/drei";

import cardsData from "../data/cards.json";

const Cards = () => {
  const context = useAppContext();

  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1 : 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
      context.setCanMoveCamera(true);
    }, 250);
  }, []);

  return (
    <animated.group>
      {/* <Card /> */}
      {cardsData.map((card, index) => {
        return <Card key={index} data={card} index={index} />;
      })}
    </animated.group>
  );
};

const CardCover = ({ data }) => {
  return (
    <Html occlude transform position={[0, 0, 0.035]} scale={[0.38, 0.38, 0.38]}>
      <div className="card-container">
        <img
          src={`img/cards/${data.cornerImg}`}
          alt=""
          className="top-left corner"
        />
        <img
          src={`img/cards/${data.cornerImg}`}
          alt=""
          className="bottom-right corner"
        />
        <h1>{data.title}</h1>
      </div>
    </Html>
  );
};

const Card = ({ data, index }) => {
  const { nodes, materials } = useGLTF("models/card.glb");

  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, index * 100);
  }, []);

  const { scale, positionY } = useSpring({
    scale: active ? 1 : 0,
    positionY: active ? 0 : -8,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const [rotate, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  useEffect(() => {
    if (hovered) {
      api.start({ x: 0 });
    } else {
      api.start({ x: 500 });
    }
  }, [hovered]);

  return (
    <animated.group
      dispose={null}
      position-x={data.position[0]}
      position-y={positionY}
      position-z={data.position[2]}
      scale={scale}
      onMouseEnter={() => setHovered(true)}
      //   rotation-y={rotate}
    >
      <group name="Scene">
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={nodes.Plane.material}
        >
          <CardCover data={data} />
        </mesh>
      </group>
    </animated.group>
  );
};

export default Cards;
