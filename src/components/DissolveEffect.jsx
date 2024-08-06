import React, { useEffect, useRef } from "react";
import * as kampos from "kampos";

const DissolveEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("DissolveEffect");
    // Notify when our images are ready
    function loadImage(src) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = function () {
          resolve(this);
        };
        img.src = src;
      });
    }
    // Get the image URLs
    const imageFromSrc = document.querySelector("#source-from").src;
    const imageToSrc = document.querySelector("#source-to").dataset.src;
    // Load images  and keep their promises so we know when to start
    const promisedImages = [loadImage(imageFromSrc), loadImage(imageToSrc)];

    const turbulence = kampos.effects.turbulence({
      noise: kampos.noise.perlinNoise,
    });

    // Depending of course on the size of the target canvas
    const WIDTH = 854;
    const HEIGHT = 480;
    const CELL_FACTOR = 2;
    const AMPLITUDE = CELL_FACTOR / WIDTH;

    turbulence.frequency = { x: AMPLITUDE, y: AMPLITUDE };
    turbulence.octaves = 1;
    turbulence.isFractal = true;

    const mapTarget = document.createElement("canvas"); // instead of document.createElement('canvas');
    mapTarget.width = WIDTH;
    mapTarget.height = HEIGHT;

    const dissolveMap = new kampos.Kampos({
      target: mapTarget,
      effects: [turbulence],
      noSource: true,
    });
    dissolveMap.draw();

    const dissolve = kampos.transitions.dissolve();
    dissolve.map = mapTarget;
    dissolve.high = 0.03; // for liquid-like effect

    const target = document.querySelector("#target");
    const hippo = new kampos.Kampos({ target, effects: [dissolve] });

    Promise.all(promisedImages)
      .then(([fromImage, toImage]) => {
        hippo.setSource({ media: fromImage, width: WIDTH, height: HEIGHT });

        dissolve.to = toImage;
      })
      .then(function () {
        hippo.play((time) => {
          dissolve.progress = Math.abs(Math.sin(time * 4e-4)); // multiply time by a factor to slow it down a bit
        });
      });

    return () => {
      dissolveMap.destroy();
      hippo.destroy();
    };
  }, []);

  return (
    <div
      style={{
        width: "854px",
        height: "480px",
        overflow: "hidden",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "1000",
        outline: "red solid 1px",
      }}
      className="diss"
    >
      <canvas ref={canvasRef} id="target">
        <img
          id="source-from"
          src="img/thumbs/boinaud.png"
          alt="My first image"
        />
        <img id="source-to" data-src="img/tree.jpg" alt="My second image" />
      </canvas>
    </div>
  );
};

export default DissolveEffect;
