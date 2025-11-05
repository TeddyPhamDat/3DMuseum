import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Museum from './Museum'
import FirstPersonControls from './FirstPersonControls'

// Loading placeholder
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#FFD700" />
    </mesh>
  )
}

export default function App() {
  return (
    <div className="app-root">
      <Canvas 
        shadows="soft"
        camera={{ position: [0, 1.7, 18], fov: 75 }}
        gl={{
          antialias: window.innerWidth > 1920 ? true : false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false
        }}
        dpr={[0.8, 1.5]}
        performance={{ min: 0.4, max: 1, debounce: 200 }}
        frameloop="always"
      >
        <color attach="background" args={['#87CEEB']} />
        <fog attach="fog" args={['#87CEEB', 15, 50]} />
        
        <directionalLight 
          castShadow
          position={[10, 15, 10]} 
          intensity={0.8}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={40}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
          shadow-bias={-0.0001}
        />
        
        <Suspense fallback={<Loader />}>
          <Museum />
        </Suspense>
        <FirstPersonControls />
      </Canvas>
      <div className="ui">
        <h1>Bảo tàng 3D</h1>
        <p>Click vào màn hình để điều khiển. WASD để di chuyển. Cửa mở tự động.</p>
        <div className="controls">
          <small>W: Tiến | S: Lùi | A: Trái | D: Phải</small>
        </div>
      </div>
    </div>
  )
}
