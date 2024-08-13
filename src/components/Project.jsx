import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppContext } from "../context/store";

export default function Project() {
  const context = useAppContext();
  const projectRef = useRef(null);

  const [hoveredTechno, setHoveredTechno] = useState(null);
  const [reachedBottom, setReachedBottom] = useState(false);

  useGSAP(() => {
    // gsap code here...
    gsap.from(".project", {
      x: -600,
      ease: "bounce.out",
      duration: 1,
      delay: 0.5,
    });
    gsap.from(".tag", {
      x: -500,
      ease: "bounce.out",
      duration: 1,
      delay: 1.5,
    });
    gsap.from(".technos", {
      x: -500,
      ease: "bounce.out",
      duration: 1,
      delay: 1.5,
    });
    gsap.from(".close", {
      x: -600,
      ease: "bounce.out",
      duration: 1,
      delay: 0.5,
    });
    gsap.from(".bottom-border", {
      x: -600,
      ease: "bounce.out",
      duration: 1,
      delay: 0.5,
    });
  });

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setReachedBottom(true);
    } else {
      setReachedBottom(false);
    }
  };
  return (
    <>
      <div className="close" onClick={context.outOfFocus}>
        <img src="img/icons/close.png" alt="" />
      </div>
      <div className="bottom-border">
        <img
          src="img/icons/down.png"
          alt=""
          className={reachedBottom ? "reached-bottom" : ""}
        />
      </div>
      <div
        className="project"
        ref={projectRef}
        onScroll={(e) => {
          handleScroll(e);
        }}
      >
        <div className="project-content">
          <h1 className="project-title">{context.currentProject.title}</h1>
          <div className="tag with">
            avec <span>Okénite</span>
          </div>
          <div className="tag for">
            pour <span>Le Musée des Beaux-Arts de Reims</span>
          </div>
          <div
            className="technos"
            onPointerOut={() => {
              setHoveredTechno(null);
            }}
          >
            {context.currentProject.technos.map((techno, index) => (
              <img
                src={`img/cards/icons/${techno}.png`}
                alt=""
                key={index}
                onPointerMove={() => {
                  setHoveredTechno(techno);
                }}
              />
            ))}
          </div>
          <div className={hoveredTechno ? "techno-name active" : "techno-name"}>
            {hoveredTechno}
          </div>
          {context.currentProject.texts.map((text, index) => (
            <p key={index} className="project-text">
              {text}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
