import React, { useEffect, useRef } from "react";
import * as kampos from "kampos";

import Project from "./Project";

const DissolveEffect = () => {
  const canvasRef = useRef(null);

  const { Kampos, effects, noise, transitions } = kampos;

  useEffect(() => {
    const target = document.getElementById("target");

    function loadImage(src) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = function () {
          resolve(this);
        };
        img.src = src;
      });
    }

    const mapTarget = document.createElement("canvas");

    // const MAP_HEIGHT = 480;
    const MAP_HEIGHT = window.innerHeight;
    const MAP_WIDTH = 500;

    /* Change to true to see the effect with dynamic noise animation */
    const DYNAMIC = true;

    /* Try flipping between animation types */
    const TYPE = "LIQUID";
    //const TYPE = 'SMOKE';
    const ANIMATIONS = {
      SMOKE: {
        octaves: 8,
        edge: 0.4,
        cellFactor: 4,
      },
      LIQUID: {
        octaves: 1,
        edge: 0.03,
        cellFactor: 2,
      },
      CUSTOM: {
        octaves: 8,
        edge: 0.3,
        cellFactor: 4,
      },
    };

    mapTarget.width = MAP_WIDTH;
    mapTarget.height = MAP_HEIGHT;

    /* this factor controls the size of the blobs in the noise - increase for smaller blobs */
    const AMPLITUDE = ANIMATIONS[TYPE].cellFactor / MAP_WIDTH;
    const frequency = { x: AMPLITUDE, y: AMPLITUDE };

    /* increase number on range (1, 8) to go from water-like effect into clouds-like one */
    const octaves = ANIMATIONS[TYPE].octaves;

    /* change to false (or comment out) if you want to see the turbulence noise variant */
    const isFractal = true;

    /* create the turbulence effect we need for the map texture */
    const turbulence = effects.turbulence({
      noise: noise.simplex,
      frequency,
      isFractal,
    });

    const dissolveMap = new Kampos({
      target: mapTarget,
      effects: [turbulence],
      noSource: true,
    });

    /* create the dissolve map by generating a single noise frame */
    dissolveMap.draw();

    /* you can play with this value on the range of (0.0, 1.0) to go from hard clipping to a smooth smoke-like mask */
    const high = ANIMATIONS[TYPE].edge;

    /* create the effects/transitions we need */
    const dissolve = transitions.dissolve({ high });
    dissolve.map = mapTarget;

    /* init kampos */
    const instance = new Kampos({ target, effects: [dissolve] });

    /* make sure videos are loaded and playing*/
    Promise.all([
      loadImage(`img/blank.png`),
      loadImage(`img/fullblack.png`),
    ]).then((images) => {
      const width = MAP_WIDTH;
      const height = MAP_HEIGHT;
      let index = 0;

      if (DYNAMIC) {
        dissolve.textures[1].update = true;
      }

      /* paint initial scene */
      instance.setSource({ media: images[0], width, height });
      dissolve.to = images[1];
      instance.draw();

      function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
      }

      function changeImage(prevImage, nextImage) {
        /* set media source */
        instance.setSource({ media: prevImage, width, height });

        /* set media to transition into */
        dissolve.to = nextImage;

        const start = performance.now();

        /* start kampos */
        instance.play(function draw() {
          const time = performance.now() - start;

          /* this is invoked once in every animation frame */
          if (DYNAMIC) {
            turbulence.time = time * 2;
            dissolveMap.draw();
          }

          /* you can reduce time factor for slower transition, or increase for faster */
          const progress = easeOutCubic(time * (DYNAMIC ? 2e-4 : 4e-4) * 2.5);
          dissolve.progress = progress;

          if (progress * 100 >= 99.9) {
            instance.stop();

            // bind the event again
            bindClick();
          }
        });
      }

      function next() {
        const from = images[index];

        // next...
        index = (index + 1) % images.length;

        const to = images[index];

        changeImage(from, to);
      }

      function prev() {
        const from = images[index];

        // prev...
        index = (index - 1 + images.length) % images.length;

        const to = images[index];

        changeImage(from, to);
      }

      function startAnim(event) {
        next();
      }

      // function bindClick() {
      //   target.classList.add("clickable");
      //   target.addEventListener("click", click, { once: true });
      // }

      // bindClick();
      setTimeout(() => {
        next();
      }, 1000);
    });

    return () => {
      dissolveMap.destroy();
      instance.destroy();
    };
  }, []);

  return (
    <>
      <div
        style={{
          width: "854px",
          height: "480px",
          overflow: "hidden",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "1",
          // outline: "red solid 1px",
        }}
        className="diss"
      >
        <canvas ref={canvasRef} id="target"></canvas>
      </div>
      <Project />
    </>
  );
};

export default DissolveEffect;
