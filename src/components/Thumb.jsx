import { useAppContext } from "../context/store";
import { Html, Float } from "@react-three/drei";

export default function Thumb() {
  const context = useAppContext();

  return (
    <Float
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <Html
        position={[
          context.currentProject?.focusGroupPosition[0] + 0.9,
          context.currentProject?.focusGroupPosition[1] + 0.4,
          context.currentProject?.focusGroupPosition[2],
        ]}
        // occlude="blending"
        wrapperClass="thumb-wrapper"
        transform
        scale={0.07}
        occlude="blending"
      >
        <div
          className="thumb"
          style={{
            backgroundImage: `url(img/thumbs/${context.currentProject.name}.png)`,
          }}
        >
          <div className="visit">
            <div className="btn-visit">Visiter</div>
          </div>
        </div>
      </Html>
    </Float>
  );
}
