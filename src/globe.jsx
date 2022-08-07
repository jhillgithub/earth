import { useEffect, useMemo, useRef } from "react";
import { Sparkles, useTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import map from '../assets/earth_diffuseOriginal.jpg';
import normalMap from '../assets/earth_normal.jpg';
import displacementMap from '../assets/earth_height.jpg';
import aoMap from '../assets/earth_ao.jpg';
export const Globe = ({ displacementScale = 0.025, size = 1, amount = 50, color = 'white', emissive, glow, ...props }) => {
  const ref = useRef();
  const maps = useTexture({
    map,
    normalMap,
    displacementMap,
    aoMap,
  });

  useFrame((state, delta) => (ref.current.rotation.y += 0.0005));
  return (
    <group>

      <Sparkles count={amount} scale={size * 2} size={2} speed={.1} />
      <mesh ref={ref} rotation={[0, -Math.PI / 8, 0]}>
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial
          {...maps}
        />
      </mesh>
    </group>
  );
};
