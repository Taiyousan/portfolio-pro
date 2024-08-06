import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Project() {
  const projectRef = useRef(null);

  useGSAP(() => {
    // gsap code here...
    gsap.from(".project", {
      x: -500,
      ease: "bounce.out",
      duration: 1,
      delay: 0.5,
    }); // <-- automatically reverted
  });
  return (
    <>
      <div className="project" ref={projectRef}>
        <div className="project-content">
          <div className="close">
            <img src="img/icons/close.png" alt="" />
          </div>
          <h1>Hello</h1>
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
        </div>
      </div>
    </>
  );
}
