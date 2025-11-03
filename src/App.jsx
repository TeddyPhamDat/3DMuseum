import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import Museum from './Museum'
import FirstPersonControls from './FirstPersonControls'

export default function App() {
  return (
    <div className="app-root">
      <Canvas 
        shadows 
        camera={{ position: [0, 1.7, 18], fov: 75 }}
        gl={{
          antialias: false, // Tắt antialiasing để tăng FPS
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.5]} // Giới hạn pixel ratio
        performance={{ min: 0.5 }} // Tự động giảm chất lượng khi FPS thấp
      >
        <ambientLight intensity={0.4} /> {/* Giảm intensity */}
        <directionalLight 
          castShadow 
          position={[5, 10, 5]} 
          intensity={0.8}
          shadow-mapSize={[1024, 1024]} // Giảm shadow resolution
          shadow-camera-far={50}
          shadow-camera-near={1}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-camera-left={-20}
          shadow-camera-right={20}
        />
        <Sky sunPosition={[100, 20, 100]} />
        <Museum />
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
