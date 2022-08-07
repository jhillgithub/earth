import { Environment, OrbitControls, Stars, Lightformer, ContactShadows } from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Globe, Earth, Clouds } from "./globe";

const App = () => {
    return (
        <Canvas shadows camera={{ position: [0, 1, 7], fov: 30 }}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            {/* <spotLight position={[-5, 0, 1]} angle={0.3} penumbra={.5} castShadow intensity={2} shadow-bias={-0.0001} /> */}
            <pointLight position={[10, 10, 10]} />
            <hemisphereLight args={[0xffffbb, 0x080820, 1]} />
            <directionalLight position={[-10, 0, -3.5]} intensity={.5} color="orange" />
            <directionalLight position={[-3, -2, -3.5]} intensity={0.2} color="#0c8cbf" />
            <spotLight position={[5, 0, 5]} intensity={2.5} penumbra={1} angle={0.35} castShadow color="#0c8cbf" />
            <ambientLight intensity={0.2} />
            <ContactShadows resolution={1024} frames={1} position={[0, -1.16, 0]} scale={10} blur={3} opacity={1} far={10} />


            <color attach="background" args={['#15151a']} />
            <Suspense>
                <Environment preset="city" />
                {/* <fog attach="fog" s args={["blue", 3, 20]} /> */}
                <OrbitControls />
                <Globe />
                {/* <Earth /> */}
                <EffectComposer>
                    {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.5} height={300} />
                    <Noise opacity={0.02} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Suspense>
        </Canvas>
    );
};

export default App;
