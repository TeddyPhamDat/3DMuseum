import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import Museum from './Museum'
import FirstPersonControls from './FirstPersonControls'

export default function App() {
  return (
    <div className="app-root">
      <Canvas shadows camera={{ position: [0, 1.7, 18], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <directionalLight castShadow position={[5, 10, 5]} intensity={1} />
        <Sky sunPosition={[100, 20, 100]} />
        <Museum />
        <FirstPersonControls />
      </Canvas>
      <div className="ui">
        <h1>Bảo tàng 3D</h1>
        <p>Click vào màn hình để điều khiển. WASD để di chuyển. Click cửa để mở.</p>
        <div className="controls">
          <small>W: Tiến | S: Lùi | A: Trái | D: Phải</small>
        </div>
      </div>
    </div>
  )
}
