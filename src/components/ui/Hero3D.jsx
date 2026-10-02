import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, MeshDistortMaterial } from '@react-three/drei';

function FloatingObject() {
  const meshRef = useRef();
  
  // Rotate the object slowly
  useFrame((state, delta) => {
    meshRef.current.rotation.x -= delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Float
      speed={2.5} 
      rotationIntensity={1} 
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        {/* Glowy Tech Material */}
        <meshStandardMaterial 
          color="#06b6d4" 
          wireframe={true} 
          emissive="#06b6d4"
          emissiveIntensity={1.5}
        />
      </mesh>
      
      {/* Inner solid core */}
      <mesh scale={1.4}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial 
          color="#083344"
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        <FloatingObject />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
