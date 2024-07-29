import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/store";
import ParticlesBackground from "./ParticlesBackground";

export default function Overlay() {
  const context = useAppContext();

  const handleClick = () => {
    // context.cameraControlsRef.current?.reset(true);
    context.setAllRotatingCubes(true);
  };

  return (
    <>
      <div className="bg">
        <ParticlesBackground />
      </div>
      <div className="overlay">
        <img src="img/logo.svg" alt="" className="logo" onClick={handleClick} />
      </div>
    </>
  );
}
