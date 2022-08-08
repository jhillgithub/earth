import { useEffect, useRef, useMemo } from "react";

data = [
    {
        lat: 30.266666,
        lon: -97.733330,
        population: 965872,
        name: "austin, tx, us"
    },
    {
        lat: 24.555059,
        lon: -81.779984,
        population: 24495,
        name: "key west, florida, us"
    },
    {
        lat: 51.5072,
        lon: -0.1276,
        population: 8982000,
        name: "london, uk"
    },
    {
        lat: -33.8688,
        lon: 151.2093,
        population: 53123000,
        name: "sydney, au"
    }
];

// offset the point to sit more on the surface of the sphere.
const RADIUS_ADJUSTMENT = 1.05;

// @NOTE: this assumes that the texture's x axis was moved 90 degrees
function calcPosFromLatLonRad(lat, lon) {
    var phi = (lat) * (Math.PI / 180);
    var theta = (90 + lon) * (Math.PI / 180);
    let z = RADIUS_ADJUSTMENT * (Math.cos(phi) * Math.cos(theta));
    let x = RADIUS_ADJUSTMENT * (Math.cos(phi) * Math.sin(theta));
    let y = RADIUS_ADJUSTMENT * (Math.sin(phi));
    return [x, y, z];
}

export const Points = () => {

    const positions = useMemo(() => {
        return data.map((point) => calcPosFromLatLonRad(point.lat, point.lon));
    });

    return (
        <group>
            {
                positions && positions.map((pos) => (
                    <mesh position={pos}>
                        <sphereBufferGeometry args={[.0125, 16, 16]} />
                        <meshStandardMaterial color={0xff0000} emissiveIntensity={5} emissive={0x0000ff} />
                    </mesh>
                ))
            }
        </group>
    );
};