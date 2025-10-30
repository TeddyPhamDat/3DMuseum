import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

function Wall({ position = [0, 1.5, -5], rotation = [0, 0, 0], color = '#f0f0f0', size = [10, 3, 0.3] }) {
  // Extended historical revolutionary images
  const historicalEvents = [
    { year: '1930', event: 'Thành lập Đảng Cộng sản Việt Nam', color: '#FF4500' },
    { year: '1941', event: 'Thành lập Việt Minh', color: '#DC143C' },
    { year: '1945', event: 'Cách mạng tháng Tám', color: '#B22222' },
    { year: '1946', event: 'Kháng chiến chống Pháp', color: '#8B0000' },
    { year: '1954', event: 'Chiến thắng Điện Biên Phủ', color: '#FF6347' },
    { year: '1969', event: 'Di chúc Chủ tịch Hồ Chí Minh', color: '#CD5C5C' },
    { year: '1975', event: 'Giải phóng miền Nam', color: '#DC143C' },
    { year: '1986', event: 'Đổi mới kinh tế', color: '#FF4500' },
    { year: '2006', event: 'Gia nhập WTO', color: '#B22222' }
  ]

  // Calculate photos that can fit (2 rows)
  const photosPerRow = Math.min(Math.floor(size[0] / 2.5), 4)
  const totalPhotos = Math.min(photosPerRow * 2, historicalEvents.length)

  return (
    <group position={position} rotation={rotation}>
      {/* Tường chính */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Đèn track lighting */}
      <group position={[0, 1.8, 0.5]}>
        <mesh>
          <boxGeometry args={[size[0] * 0.8, 0.1, 0.1]} />
          <meshStandardMaterial color={'#2C2C2C'} />
        </mesh>
        {Array.from({length: photosPerRow}).map((_, i) => (
          <spotLight 
            key={i}
            position={[-size[0]/2 + 1.5 + i * (size[0]-3)/(photosPerRow-1), -0.3, 0]} 
            target-position={[-size[0]/2 + 1.5 + i * (size[0]-3)/(photosPerRow-1), -1.5, 0]}
            intensity={1.2} 
            angle={Math.PI / 6}
            penumbra={0.3}
            castShadow
          />
        ))}
      </group>

      {/* Khung ảnh lịch sử - 2 hàng */}
      {historicalEvents.slice(0, totalPhotos).map((event, i) => {
        const isTopRow = i < photosPerRow
        const columnIndex = i % photosPerRow
        const xPosition = -size[0]/2 + 1.5 + columnIndex * (size[0]-3)/(photosPerRow-1)
        const yPosition = isTopRow ? 0.8 : -0.5
        
        return (
          <group key={i} position={[xPosition, yPosition, size[2]/2 + 0.01]}>
            {/* Khung tranh gỗ */}
            <mesh castShadow>
              <planeGeometry args={[2, 1.5]} />
              <meshStandardMaterial color={'#654321'} />
            </mesh>
            {/* Ảnh lịch sử */}
            <mesh position={[0, 0, 0.01]} castShadow>
              <planeGeometry args={[1.8, 1.3]} />
              <meshStandardMaterial color={event.color} />
            </mesh>
            {/* Hiệu ứng ảnh cũ */}
            <mesh position={[0, 0, 0.012]} castShadow>
              <planeGeometry args={[1.7, 1.2]} />
              <meshStandardMaterial 
                color={'#8B7355'} 
                transparent 
                opacity={0.2}
              />
            </mesh>
            {/* Năm */}
            <Text
              position={[0, -0.5, 0.02]}
              fontSize={0.12}
              color="#FFD700"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {event.year}
            </Text>
            {/* Bảng tên sự kiện */}
            <mesh position={[0, -0.8, 0.01]}>
              <planeGeometry args={[2, 0.3]} />
              <meshStandardMaterial color={'#1C1C1C'} />
            </mesh>
            <Text
              position={[0, -0.8, 0.02]}
              fontSize={0.06}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.9}
            >
              {event.event}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

function Floor() {
  return (
    <>
      {/* Sàn chính (cỏ xanh) - mở rộng */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={'#228B22'} />
      </mesh>
      
      {/* Đường đi dẫn đến cửa - mở rộng */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 14]}>
        <planeGeometry args={[5, 8]} />
        <meshStandardMaterial color={'#696969'} />
      </mesh>
      
      {/* Sàn bên trong bảo tàng - sàn gạch bóng - mở rộng */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial 
          color={'#F5F5DC'} 
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </>
  )
}

function Ceiling() {
  return (
    <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={'#F5F5DC'} />
    </mesh>
  )
}

function MuseumSign() {
  return (
    <group position={[0, 3.2, 10.2]}>
      {/* Nền bảng hiệu */}
      <mesh>
        <planeGeometry args={[6, 1]} />
        <meshStandardMaterial color={'#8B0000'} />
      </mesh>
      {/* Chữ */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.3}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        DẤU ẤN CÁCH MẠNG
      </Text>
    </group>
  )
}

function VintageVehicle({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Dây chắn xung quanh xe thay vì nền đen - SỬA LỖI */}
      <group>
        {/* Cột chắn 4 góc */}
        <mesh position={[-3, 0.75, -2.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5]} />
          <meshStandardMaterial color={'#C0C0C0'} metalness={0.8} />
        </mesh>
        <mesh position={[3, 0.75, -2.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5]} />
          <meshStandardMaterial color={'#C0C0C0'} metalness={0.8} />
        </mesh>
        <mesh position={[-3, 0.75, 2.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5]} />
          <meshStandardMaterial color={'#C0C0C0'} metalness={0.8} />
        </mesh>
        <mesh position={[3, 0.75, 2.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5]} />
          <meshStandardMaterial color={'#C0C0C0'} metalness={0.8} />
        </mesh>

        {/* Dây chắn ngang - SỬA ROTATION */}
        <mesh position={[0, 1, -2.5]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.02, 0.02, 6]} />
          <meshStandardMaterial color={'#8B0000'} />
        </mesh>
        <mesh position={[0, 1, 2.5]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.02, 0.02, 6]} />
          <meshStandardMaterial color={'#8B0000'} />
        </mesh>
        <mesh position={[-3, 1, 0]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 5]} />
          <meshStandardMaterial color={'#8B0000'} />
        </mesh>
        <mesh position={[3, 1, 0]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 5]} />
          <meshStandardMaterial color={'#8B0000'} />
        </mesh>

        {/* Biển cảnh báo nhỏ */}
        <mesh position={[-1, 1, 2.6]}>
          <planeGeometry args={[0.3, 0.15]} />
          <meshStandardMaterial color={'#FFD700'} />
        </mesh>
        <Text
          position={[-1, 1, 2.61]}
          fontSize={0.04}
          color="#8B0000"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          KHÔNG
          VÀO
        </Text>
      </group>

      {/* Xe Jeep - Thân xe chính - NÂNG CAO HƠN */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[3.5, 1, 2]} />
        <meshStandardMaterial color={'#4A5D23'} roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Cabin - NÂNG CAO HƠN */}
      <mesh position={[0.6, 1.4, 0]} castShadow>
        <boxGeometry args={[2.3, 0.8, 1.8]} />
        <meshStandardMaterial color={'#3A4D1A'} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Mái xe - NÂNG CAO HƠN */}
      <mesh position={[0.6, 1.9, 0]} castShadow>
        <boxGeometry args={[2.3, 0.1, 1.8]} />
        <meshStandardMaterial color={'#2D3D0F'} />
      </mesh>

      {/* Capô xe - SỬA VỊ TRÍ VÀ NÂNG CAO */}
      <mesh position={[-1.0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.8, 0.4, 1.8]} />
        <meshStandardMaterial color={'#4A5D23'} roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Bánh xe - LÀM CHÂN XE NÂNG CAO */}
      <mesh position={[-1.0, 0.25, 0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25]} />
        <meshStandardMaterial color={'#2C2C2C'} roughness={0.9} />
      </mesh>
      <mesh position={[-1.0, 0.25, -0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25]} />
        <meshStandardMaterial color={'#2C2C2C'} roughness={0.9} />
      </mesh>
      <mesh position={[1.0, 0.25, 0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25]} />
        <meshStandardMaterial color={'#2C2C2C'} roughness={0.9} />
      </mesh>
      <mesh position={[1.0, 0.25, -0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25]} />
        <meshStandardMaterial color={'#2C2C2C'} roughness={0.9} />
      </mesh>

      {/* Vành bánh xe */}
      <mesh position={[-1.0, 0.25, 0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3]} />
        <meshStandardMaterial color={'#696969'} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-1.0, 0.25, -0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3]} />
        <meshStandardMaterial color={'#696969'} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.0, 0.25, 0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3]} />
        <meshStandardMaterial color={'#696969'} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.0, 0.25, -0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3]} />
        <meshStandardMaterial color={'#696969'} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Kính chắn gió - NÂNG CAO HƠN */}
      <mesh position={[0.4, 1.6, 0]} castShadow rotation={[0.1, 0, 0]}>
        <planeGeometry args={[1.6, 0.9]} />
        <meshPhysicalMaterial 
          color={'#E6F3FF'} 
          transparent 
          opacity={0.4}
          transmission={0.9}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Đèn pha - SỬA VỊ TRÍ CHO ĐÚNG */}
        <mesh position={[-1.75, 0.9, 0]} rotation={[0, Math.PI/2, 0]} castShadow>
          <planeGeometry args={[0.8, 0.6]} />
          <meshStandardMaterial color={'#2C2C2C'} roughness={0.9} />
        </mesh>
        <mesh position={[-1.75, 0.6, 0]} rotation={[0, Math.PI/2, 0]} castShadow>
          <planeGeometry args={[0.5, 0.2]} />
          <meshStandardMaterial color={'#FFFFFF'} />
        </mesh>
       
        <mesh position={[-1.75, 1.0, 0.35]} castShadow rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1]} />
          <meshStandardMaterial color={'#FFFACD'} emissive={'#FFFACD'} emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[-1.75, 1.0, -0.35]} castShadow rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1]} />
          <meshStandardMaterial color={'#FFFACD'} emissive={'#FFFACD'} emissiveIntensity={0.3} />
        </mesh>

      {/* Ghế lái - NÂNG CAO HƠN */}
      <mesh position={[0.3, 1.4, 0.5]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color={'#654321'} roughness={0.8} />
      </mesh>
      <mesh position={[0.3, 1.4, -0.5]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color={'#654321'} roughness={0.8} />
      </mesh>

      {/* Vô lăng - NÂNG CAO HƠN */}
      <mesh position={[0.9, 1.5, 0.5]} castShadow rotation={[0, 0, Math.PI/2]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color={'#2C2C2C'} />
      </mesh>

      {/* Cửa xe - NÂNG CAO HƠN */}
      <mesh position={[-0.5, 1.4, 0.9]} castShadow>
        <boxGeometry args={[1.8, 0.7, 0.05]} />
        <meshStandardMaterial color={'#4A5D23'} />
      </mesh>
      <mesh position={[-0.5, 1.4, -0.9]} castShadow>
        <boxGeometry args={[1.8, 0.7, 0.05]} />
        <meshStandardMaterial color={'#4A5D23'} />
      </mesh>

      {/* Tay nắm cửa - NÂNG CAO HƠN */}
      <mesh position={[0.2, 1.4, 0.95]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.08]} />
        <meshStandardMaterial color={'#C0C0C0'} metalness={0.8} />
      </mesh>
      <mesh position={[0.2, 1.4, -0.95]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.08]} />
        <meshStandardMaterial color={'#C0C0C0'} metalness={0.8} />
      </mesh>

      {/* Đèn chiếu sáng cho xe */}
      <spotLight 
        position={[0, 4, 3]} 
        target-position={[0, 0, 0]}
        intensity={2} 
        angle={Math.PI / 3}
        penumbra={0.3}
        castShadow
      />

      {/* Bảng thông tin xe - ĐẶT NGOÀI KHU VỰC DÂY CHẮN PHÍA TRƯỚC XE */}
      <mesh position={[1, 1.5, 2.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[2.5, 1.8]} />
        <meshStandardMaterial color={'#8B0000'} />
      </mesh>
      <Text
        position={[1, 2.0, 2.51]}
        fontSize={0.18}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Xe Jeep SP307BW
      </Text>
      <Text
        position={[1, 1.5, 2.51]}
        fontSize={0.09}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.3}
      >
        Xe quân sự Mỹ được sử dụng trong chiến tranh Việt Nam. 
        Được thu hồi và trưng bày tại bảo tàng
        như biểu tượng của chiến thắng.
      </Text>
      <Text
        position={[1, 0.9, 2.51]}
        fontSize={0.07}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        Năm sản xuất: 1969
      </Text>
    </group>
  )
}

function DisplayCase({ position, artifactType }) {
  const artifacts = {
    weapon: { 
      color: '#8B4513', 
      name: 'Súng K54 - Vũ khí cách mạng',
      shape: 'rifle'
    },
    helmet: { 
      color: '#2F4F4F', 
      name: 'Nón cối - Biểu tượng bộ đội',
      shape: 'helmet'
    },
    flag: { 
      color: '#DC143C', 
      name: 'Cờ Đảng - Ngôi sao vàng',
      shape: 'flag'
    },
    book: { 
      color: '#8B0000', 
      name: 'Tác phẩm Hồ Chí Minh toàn tập',
      shape: 'book'
    }
  }
  
  const artifact = artifacts[artifactType] || artifacts.weapon

  const renderArtifact = () => {
    switch(artifact.shape) {
      case 'rifle':
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.8, 0.05, 0.05]} />
              <meshStandardMaterial color={artifact.color} />
            </mesh>
            <mesh position={[0.25, 0, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.05]} />
              <meshStandardMaterial color={'#654321'} />
            </mesh>
          </group>
        )
      case 'helmet':
        return (
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.15, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={artifact.color} />
          </mesh>
        )
      case 'flag':
        return (
          <group>
            <mesh position={[0, 0.1, 0]}>
              <planeGeometry args={[0.4, 0.3]} />
              <meshStandardMaterial color={artifact.color} />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
              <sphereGeometry args={[0.03]} />
              <meshStandardMaterial color={'#FFD700'} />
            </mesh>
            <mesh position={[-0.15, 0, 0]}>
              <cylinderGeometry args={[0.005, 0.005, 0.3]} />
              <meshStandardMaterial color={'#8B4513'} />
            </mesh>
          </group>
        )
      case 'book':
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.25, 0.35, 0.05]} />
              <meshStandardMaterial color={artifact.color} />
            </mesh>
            <mesh position={[0, 0, 0.026]}>
              <planeGeometry args={[0.2, 0.3]} />
              <meshStandardMaterial color={'#FFD700'} />
            </mesh>
          </group>
        )
      default:
        return <mesh><boxGeometry args={[0.3, 0.2, 0.6]} /><meshStandardMaterial color={artifact.color} /></mesh>
    }
  }

  return (
    <group position={position}>
      {/* Bục đế gỗ với chi tiết */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.4, 0.8, 1.4]} />
        <meshStandardMaterial color={'#8B4513'} />
      </mesh>
      
      {/* Mặt bục */}
      <mesh position={[0, 0.81, 0]} castShadow>
        <boxGeometry args={[1.4, 0.02, 1.4]} />
        <meshStandardMaterial color={'#DEB887'} />
      </mesh>
      
      {/* Khung kính dưới */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[1.2, 0.08, 1.2]} />
        <meshStandardMaterial color={'#C0C0C0'} />
      </mesh>
      
      {/* Hộp kính trong suốt */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[1.1, 0.7, 1.1]} />
        <meshPhysicalMaterial 
          color={'#ffffff'} 
          transparent 
          opacity={0.15}
          transmission={0.95}
          roughness={0.05}
          metalness={0.1}
          ior={1.5}
        />
      </mesh>
      
      {/* Khung kính trên */}
      <mesh position={[0, 1.61, 0]}>
        <boxGeometry args={[1.2, 0.08, 1.2]} />
        <meshStandardMaterial color={'#C0C0C0'} />
      </mesh>
      
      {/* Cổ vật bên trong */}
      <group position={[0, 1.25, 0]}>
        {renderArtifact()}
      </group>
      
      {/* Đèn LED chiếu sáng */}
      <pointLight position={[0, 1.8, 0]} intensity={0.5} color="#FFFFFF" />
      
      {/* Bảng tên hiện đại */}
      <mesh position={[0, 0.95, 0.7]}>
        <planeGeometry args={[1.0, 0.25]} />
        <meshStandardMaterial color={'#1C1C1C'} />
      </mesh>
      
      {/* Text trên bảng tên */}
      <Text
        position={[0, 0.95, 0.71]}
        fontSize={0.06}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.9}
      >
        {artifact.name}
      </Text>
    </group>
  )
}

function Door({ position = [0, 1, 5] }) {
  const leftDoorRef = useRef()
  const rightDoorRef = useRef()
  const groupRef = useRef()
  const [isOpen, setIsOpen] = useState(false)

  useFrame((state, delta) => {
    if (!leftDoorRef.current || !rightDoorRef.current || !groupRef.current) return

    const camPos = state.camera.position
    const doorWorldPos = new THREE.Vector3()
    groupRef.current.getWorldPosition(doorWorldPos)
    const distance = camPos.distanceTo(doorWorldPos)

    // Open the door whenever the player is near (either side) so exiting/entering works both ways.
    const openDistance = 5
    const closeDistance = 6

    const shouldOpen = distance < openDistance
    const shouldClose = distance > closeDistance

    if (shouldOpen && !isOpen) setIsOpen(true)
    if (shouldClose && isOpen) setIsOpen(false)

    // Expose current door state for movement logic (FirstPersonControls) to read.
    if (typeof window !== 'undefined') window.__DOOR_OPEN = isOpen

    // Góc xoay: mở ra ngoài (-90 độ cho trái, +90 độ cho phải)
    const leftTargetRotation = isOpen ? Math.PI / 2 : 0
    const rightTargetRotation = isOpen ? -Math.PI / 2 : 0

    // Animation mượt cho cả 2 cánh
    leftDoorRef.current.rotation.y += (leftTargetRotation - leftDoorRef.current.rotation.y) * delta * 4
    rightDoorRef.current.rotation.y += (rightTargetRotation - rightDoorRef.current.rotation.y) * delta * 4
  })

  return (
    <group ref={groupRef} position={position}>
      {/* CHỈ có khung trên - KHÔNG có cột trái phải */}
      <mesh position={[0, 2.7, 0]} castShadow>
        <boxGeometry args={[3.4, 0.6, 0.25]} />
        <meshStandardMaterial color={'#654321'} />
      </mesh>
      
      {/* TƯỜNG VÔ HÌNH BÍT LỖ - chỉ hiện khi cửa đóng */}
      {!isOpen && (
        <>
          {/* Bít lỗ trái */}
          <mesh position={[-1.3, 1.2, 0.05]}>
            <boxGeometry args={[1.3, 2.4, 0.1]} />
            <meshStandardMaterial transparent opacity={0} />
          </mesh>
          {/* Bít lỗ phải */}
          <mesh position={[1.3, 1.2, 0.05]}>
            <boxGeometry args={[1.3, 2.4, 0.1]} />
            <meshStandardMaterial transparent opacity={0} />
          </mesh>
        </>
      )}
      
      {/* Cửa trái - pivot tại cạnh trái - TAY NẮM XOAY THEO */}
      <group position={[-1.3, 0, 0]} ref={leftDoorRef}>
        <mesh
          position={[0.65, 1.2, 0.05]}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen((s) => !s)
          }}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'default'}
          castShadow
        >
          <boxGeometry args={[1.3, 2.4, 0.08]} />
          <meshStandardMaterial color={'#8B4513'} />
        </mesh>

        {/* Tay nắm cửa trái - trong cùng group nên sẽ xoay theo */}
        <mesh position={[1.1, 1.2, 0.1]}>
          <sphereGeometry args={[0.04]} />
          <meshStandardMaterial color={'#FFD700'} />
        </mesh>
      </group>
      
      {/* Cửa phải - pivot tại cạnh phải - TAY NẮM XOAY THEO */}
      <group position={[1.3, 0, 0]} ref={rightDoorRef}>
        <mesh
          position={[-0.65, 1.2, 0.05]}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen((s) => !s)
          }}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'default'}
          castShadow
        >
          <boxGeometry args={[1.3, 2.4, 0.08]} />
          <meshStandardMaterial color={'#8B4513'} />
        </mesh>

        {/* Tay nắm cửa phải - trong cùng group nên sẽ xoay theo */}
        <mesh position={[-1.1, 1.2, 0.1]}>
          <sphereGeometry args={[0.04]} />
          <meshStandardMaterial color={'#FFD700'} />
        </mesh>
      </group>

      {/* Bậc thang cửa */}
      <mesh position={[0, 0.1, 0.5]} castShadow>
        <boxGeometry args={[4.5, 0.2, 1]} />
        <meshStandardMaterial color={'#A0522D'} />
      </mesh>
      
      {/* Bậc thang thứ hai */}
      <mesh position={[0, 0.05, 0.8]} castShadow>
        <boxGeometry args={[5, 0.1, 0.4]} />
        <meshStandardMaterial color={'#8B4513'} />
      </mesh>

      {/* Vùng click ẩn cho dễ tương tác */}
      <mesh
        position={[0, 1.2, 0.1]}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
        visible={false}
      >
        <boxGeometry args={[2.6, 2.4, 0.5]} />
      </mesh>
    </group>
  )
}

export default function Museum() {
  return (
    <>
      {/* Sàn và trần */}
      <Floor />
      <Ceiling />

      {/* Ánh sáng tổng thể cho bảo tàng */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 3.5, 0]} intensity={1} color="#FFFFFF" />
      
      {/* Tường sau - màu tím nhạt */}
      <Wall 
        position={[0, 2, -10]} 
        color={'#E6E6FA'} 
        size={[20, 4, 0.3]}
      />

      {/* Tường trái - màu vàng nhạt */}
      <Wall 
        position={[-10, 2, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        color={'#F0E68C'} 
        size={[20, 4, 0.3]}
      />

      {/* Tường phải - màu hồng nhạt */}
      <Wall 
        position={[10, 2, 0]} 
        rotation={[0, -Math.PI / 2, 0]} 
        color={'#FFE4E1'} 
        size={[20, 4, 0.3]}
      />

      {/* Tường trước với cửa - màu be */}
      <group position={[0, 0, 10]}>
        {/* Tường bên trái cửa */}
        <mesh position={[-5.65, 2, 0]} castShadow>
         <boxGeometry args={[8.7, 4, 0.3]} />
          <meshStandardMaterial color={'#F5F5DC'} />
        </mesh>
        
        {/* Tường bên phải cửa */}
        <mesh position={[5.65, 2, 0]} castShadow>
          <boxGeometry args={[8.7, 4, 0.3]} />
          <meshStandardMaterial color={'#F5F5DC'} />
        </mesh>
        
        {/* Tường trên cửa */}
        <mesh position={[0, 3, 0]} castShadow>
          <boxGeometry args={[6, 2, 0.3]} />
          <meshStandardMaterial color={'#F5F5DC'} />
        </mesh>
        
        <Door position={[0, 0, 0]} />
      </group>

      {/* Bảng hiệu bảo tàng */}
      <MuseumSign />

      {/* Xe cổ quân sự - đặt ở trung tâm */}
      <VintageVehicle position={[0, 0, -3]} />

      {/* Các hộp kính trưng bày cổ vật - di chuyển ra xa tường và xa xe */}
      <DisplayCase position={[6, 0, -6]} artifactType="weapon" />
      <DisplayCase position={[-6, 0, 6]} artifactType="helmet" />
      <DisplayCase position={[6, 0, 6]} artifactType="flag" />
      <DisplayCase position={[-6, 0, -6]} artifactType="book" />

      {/* Cột trang trí bên ngoài */}
      <mesh position={[5, 1, 12]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 2]} />
        <meshStandardMaterial color={'#708090'} />
      </mesh>

      <mesh position={[-5, 1, 12]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 2]} />
        <meshStandardMaterial color={'#708090'} />
      </mesh>
    </>
  )
}