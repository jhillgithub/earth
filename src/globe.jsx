import { useEffect, useMemo, useRef } from "react";
import { Sparkles, useTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import clouds from '../assets/earth_clouds_diffuseOriginal.jpg';
import map from '../assets/earth_diffuseOriginal.png';
import normalMap from '../assets/earth_normal.jpg';
import displacementMap from '../assets/earth_height.jpg';
import aoMap from '../assets/earth_ao.jpg';
import { Points } from "./Points";
import * as THREE from 'three';

export const Globe = ({ displacementScale = 0.025, size = 1, amount = 50, color = 'white', emissive, glow, ...props }) => {

  const groupRef = useRef();

  useFrame((state) => {
    groupRef.current.rotation.y += 0.0005;
  });
  return (
    <group>

      <Sparkles count={amount} scale={size * 2} size={2} speed={.1} />

      <group ref={groupRef} rotation={[0, -Math.PI / 8, 0]}>
        <Earth />
        <Points />
        <Clouds />
      </group>
    </group>
  );
};

export const Earth = () => {
  const ref = useRef();
  const maps = useTexture({
    map,
    normalMap,
    displacementMap,
    aoMap,
  });

  // // @NOTE: This is an alternative way to adjust the map for the lat of the points
  // // the 90 degree offset was added to the position calculation instead
  // if (maps && maps.map) {
  //   // maps.map.wrapS = THREE.RepeatWrapping;
  //   // maps.map.offset.x = 1.5708 / (2 * Math.PI);
  // };

  return (
    <group>

      <mesh
        ref={ref}
      // 
      >
        <sphereGeometry args={[1, 100, 100]} />
        {maps &&
          <meshStandardMaterial
            {...maps}
          />}
      </mesh>
    </group>
  );
};

export const Clouds = () => {
  const ref = useRef();
  const map = useTexture(clouds);
  useFrame((state, delta) => {
    ref.current.rotation.y += 0.0000275;
    ref.current.rotation.x += 0.0000275;
    ref.current.rotation.z += 0.0000275;
  });

  return (
    <mesh ref={ref} scale={[1.075, 1.075, 1.075]}>
      <sphereGeometry args={[1, 100, 100]} />
      <meshPhongMaterial
        map={map}
        color={0xffffff}
        transparent={true}
        opacity={0.075}
      />
    </mesh>
  );
};