import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import Museum from './Museum'
import FirstPersonControls from './FirstPersonControls'

export default function App() {
  return (
    <div className="app-root">
      <Canvas 
        shadows // BẬT SHADOWS nhưng tối ưu
        camera={{ position: [0, 1.7, 18], fov: 75 }}
        gl={{
          antialias: true, // BẬT antialiasing cho đẹp hơn
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.5]} // Pixel ratio tối ưu
        performance={{ min: 0.5 }} // Tự động điều chỉnh
      >
        <ambientLight intensity={0.5} />
        <directionalLight 
          castShadow
          position={[10, 15, 10]} 
          intensity={0.7}
          shadow-mapSize={[512, 512]} // Shadow resolution thấp hơn để tăng FPS
          shadow-camera-far={40}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
          shadow-bias={-0.0001}
        />
        {/* Thêm đèn phụ để tạo chiều sâu */}
        <hemisphereLight intensity={0.3} groundColor="#444444" />
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
