import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppContext } from "../context/store";

export default function Project() {
  const context = useAppContext();
  const projectRef = useRef(null);

  useGSAP(() => {
    // gsap code here...
    gsap.from(".project", {
      x: -500,
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
  });
  return (
    <>
      <div className="project" ref={projectRef}>
        <div className="project-content">
          <div className="close" onClick={context.outOfFocus}>
            <img src="img/icons/close.png" alt="" />
          </div>
          <h1 className="project-title">{context.currentProject.title}</h1>
          <div className="tag with">
            avec <span>Okénite</span>
          </div>
          <div className="tag for">
            pour <span>Le Musée des Beaux-Arts de Reims</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            doloremque quasi est fuga debitis accusamus, ut qui deleniti,
            incidunt neque placeat repudiandae autem nostrum suscipit ratione ab
            expedita nulla libero dicta doloribus nihil accusantium. Quidem
            harum deleniti sequi tempore quas veritatis architecto, dolor dolore
            quasi unde, vel ipsam numquam ipsa voluptates quos nemo
            exercitationem modi, debitis laborum iste ullam quis explicabo
            doloremque. Recusandae, assumenda atque ipsum vel laborum autem ad
            impedit dolor sed hic sapiente repellat iusto. Illum repudiandae
            dignissimos, ducimus consectetur, dolores tempora dicta iure quod
            cupiditate esse perferendis facilis laborum modi? Ex sunt totam qui?
            Veniam, culpa eum.
          </p>
          <div className="technos">
            {context.currentProject.technos.map((techno, index) => (
              <img src={`img/cards/icons/${techno}.png`} alt="" key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
