import { useAppContext } from "../context/store";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useGLTF, Html, Float } from "@react-three/drei";

import cardsData from "../data/cards.json";

const Cards = () => {
  const context = useAppContext();

  const [active, setActive] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

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
        return (
          <Card
            key={index}
            data={card}
            index={index}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        );
      })}
    </animated.group>
  );
};

const CardCover = ({ data }) => {
  return (
    <Html
      occlude
      transform
      position={[0, 0, 0.035]}
      scale={[0.38, 0.38, 0.38]}
      pointerEvents="none"
    >
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
        <h1 style={{ color: data.color }}>{data.title}</h1>
      </div>
    </Html>
  );
};

const Card = ({ data, index, currentCard, setCurrentCard }) => {
  const { nodes } = useGLTF("models/card.glb");

  const context = useAppContext();

  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (context.isCubes) {
      setTimeout(() => {
        setActive(false);
      }, index * 10);
    } else {
      setTimeout(() => {
        setActive(true);
      }, index * 100);
    }
  }, [context.isCubes]);

  const { scale, positionY } = useSpring({
    scale: active ? 1 : 0,
    positionY: active ? 0 : -8,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const { rotationX, rotationY, rotationZ } = useSpring({
    rotationX: hovered ? Math.PI : 0,
    rotationY: hovered ? Math.PI : 0,
    rotationZ: hovered ? Math.PI : 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  useEffect(() => {
    let timeoutId;
    if (currentCard === null) {
      timeoutId = setTimeout(() => {
        setHovered(false);
      }, 250);
    } else if (currentCard !== index) {
      setHovered(false);
    } else {
      setHovered(true);
    }

    // Cleanup function to clear timeout if currentCard changes before 1000ms
    return () => clearTimeout(timeoutId);
  }, [currentCard, index]);

  const handleHover = () => {
    setCurrentCard(index);
  };

  const handleHoverOut = () => {
    setCurrentCard(null);
  };

  return (
    <Float>
      <animated.group
        dispose={null}
        position-x={data.position[0]}
        position-y={positionY}
        position-z={data.position[2]}
        scale={scale}
        onPointerOver={handleHover}
        onPointerOut={handleHoverOut}
      >
        <animated.group name="Scene" rotation-y={rotationY}>
          <mesh
            name="Plane"
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={nodes.Plane.material}
          >
            <CardCover data={data} />
          </mesh>
        </animated.group>
      </animated.group>
    </Float>
  );
};

export default Cards;
