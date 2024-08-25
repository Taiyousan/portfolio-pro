import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/store";
import ParticlesBackground from "./ParticlesBackground";

// import DissolveEffect from "./DissolveEffect";
import Project from "./Project";

export default function Overlay() {
  const context = useAppContext();

  const handleClick = () => {
    // context.cameraControlsRef.current?.reset(true);
    context.setAllRotatingCubes(true);
  };

  return (
    <>
      {context.allRotatingCubes && (
        <div className="bg">
          <ParticlesBackground />
        </div>
      )}
      <div className="overlay">
        {/* <img src="img/logo.svg" alt="" className="logo" onClick={handleClick} /> */}
        {context.isCards && (
          <div
            className="retour"
            onClick={() => {
              context.setIsCubes(true);
              context.setIsCards(false);
            }}
          >
            <img src="img/icons/retour.png" alt="" />
          </div>
        )}
        {context.currentProject && <Project />}
        <div className="mentions">Shams Benhamou - 2024</div>
      </div>
    </>
  );
}
