import { useEffect, useRef, useState, Fragment } from "react";
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
      e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 1;

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
          {context.currentProject.href && (
            <div className="tag href"><a
              href={context.currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              Visiter
            </a></div>
          )}
          {context.currentProject.with && (
            <div className="tag with">
              avec{" "}
              {context.currentProject.with.map((name, index) => (
                <Fragment key={index}>
                  {index > 0 ? " & " : ""}
                  <span>{name}</span>
                </Fragment>
              ))}
            </div>
          )}



          {context.currentProject.role && (
            <div className="tag role">
              En tant que <span>{context.currentProject.role}</span>
            </div>
          )}

          {context.currentProject.tasks && (
            <div className="tag tasks">
              Tâches :{" "}
              <ul>
                {context.currentProject.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>
          )}

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
          <p className="warning">Les modèles 3D utilisés sur ce portfolio sont issus de sources en ligne et sont libres de droit.</p>

        </div>
      </div>
      <p className="warning">Les modèles 3D utilisés sur ce portfolio sont issus de sources en ligne et sont libres de droit.</p>

    </>
  );
}
