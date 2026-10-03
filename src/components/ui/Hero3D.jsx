import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, MeshDistortMaterial } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';

function FloatingObject() {
  const meshRef = useRef();
  const { isDark, colorTheme } = useTheme();
  
  // Rotate the object slowly
  useFrame((state, delta) => {
    meshRef.current.rotation.x -= delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  // Determine colors based on active theme
  // In Dark Mode: use brighter accent for high contrast
  // In Light Mode: use darker accent for high contrast against white
  let accentColor = isDark ? '#34D399' : '#047857'; // Green (light/dark)
  let coreColor = isDark ? '#062c22' : '#d1fae5'; // Core background

  if (colorTheme === 'blue') {
    accentColor = isDark ? '#60A5FA' : '#1E3A8A'; // Blue (light/dark)
    coreColor = isDark ? '#0f172a' : '#dbeafe';
  } else if (colorTheme === 'amber') {
    accentColor = isDark ? '#FBBF24' : '#92400E'; // Amber (light/dark)
    coreColor = isDark ? '#1e1b15' : '#fef3c7';
  }

  return (
    <Float
      speed={2.5} 
      rotationIntensity={1} 
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        {/* Responsive Tech Material */}
        <meshStandardMaterial 
          color={accentColor} 
          wireframe={true} 
          emissive={accentColor}
          emissiveIntensity={isDark ? 1.5 : 0.8}
        />
      </mesh>
      
      {/* Inner solid core */}
      <mesh scale={1.4}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial 
          color={coreColor}
          transparent
          opacity={isDark ? 0.8 : 0.4}
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
