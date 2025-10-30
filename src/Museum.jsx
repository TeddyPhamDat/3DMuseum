import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

function Wall({ position = [0, 1.5, -5], rotation = [0, 0, 0], color = '#f0f0f0', size = [10, 3, 0.3] }) {
  // Historical revolutionary images from 1935 to present
  const historicalEvents = [
    { year: '1935', event: 'Thành lập Đảng Cộng sản Đông Dương', color: '#FF4500' },
    { year: '1945', event: 'Cách mạng tháng Tám thành công', color: '#DC143C' },
    { year: '1951', event: 'Đại hội II - Thành lập Đảng Lao động VN', color: '#B22222' },
    { year: '1976', event: 'Đại hội IV - Thống nhất đất nước', color: '#8B0000' },
    { year: '1986', event: 'Đại hội VI - Khởi xướng Đổi mới', color: '#FF6347' },
    { year: '2021', event: 'Đại hội XIII - Kỷ nguyên mới', color: '#CD5C5C' }
  ]

  return (
    <group position={position} rotation={rotation}>
      {/* Tường chính */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Khung ảnh lịch sử */}
      {historicalEvents.slice(0, 3).map((event, i) => (
        <group key={i} position={[-3 + i * 3, 0, size[2]/2 + 0.01]}>
          {/* Khung tranh */}
          <mesh>
            <planeGeometry args={[1.8, 1.2]} />
            <meshStandardMaterial color={'#8B4513'} />
          </mesh>
          {/* Ảnh */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[1.6, 1]} />
            <meshStandardMaterial color={event.color} />
          </mesh>
          {/* Năm */}
          <Text
            position={[0, -0.35, 0.02]}
            fontSize={0.12}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {event.year}
          </Text>
          {/* Bảng tên sự kiện */}
          <mesh position={[0, -0.7, 0.01]}>
            <planeGeometry args={[1.8, 0.3]} />
            <meshStandardMaterial color={'#FFD700'} />
          </mesh>
          <Text
            position={[0, -0.7, 0.02]}
            fontSize={0.06}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.6}
          >
            {event.event}
          </Text>
        </group>
      ))}
    </group>
  )
}

function Floor() {
  return (
    <>
      {/* Sàn chính (cỏ xanh) - mở rộng hơn */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={'#228B22'} />
      </mesh>
      
      {/* Sàn bên trong bảo tàng - mở rộng ra gần cửa hơn */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[20, 22]} />
        <meshStandardMaterial color={'#F5F5DC'} />
      </mesh>
      
      {/* Đường đi dẫn đến cửa - nối liền */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 12]}>
        <planeGeometry args={[4, 6]} />
        <meshStandardMaterial color={'#696969'} />
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

      {/* Hộp bảo tàng hình chữ nhật */}
      
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

      {/* TƯỜNG BÍT 4 GÓC - không cho vào từ góc */}
      {/* Góc trái sau */}
      <mesh position={[-10, 2, -10]} castShadow>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color={'#8B8B8B'} />
      </mesh>
      
      {/* Góc phải sau */}
      <mesh position={[10, 2, -10]} castShadow>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color={'#8B8B8B'} />
      </mesh>
      
      {/* Góc trái trước */}
      <mesh position={[-10, 2, 10]} castShadow>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color={'#8B8B8B'} />
      </mesh>
      
      {/* Góc phải trước */}
      <mesh position={[10, 2, 10]} castShadow>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color={'#8B8B8B'} />
      </mesh>

      {/* Tường trước với cửa - màu be */}
      <group position={[0, 0, 10]}>
        {/* Tường bên trái cửa - chỉnh để khít với mép cửa (mép trái cửa tại x = -1.3) */}
        <mesh position={[-5.65, 2, 0]} castShadow>
          {/* width = 8.7 -> spans from x = -10 to x = -1.3 */}
          <boxGeometry args={[8.7, 4, 0.3]} />
          <meshStandardMaterial color={'#F5F5DC'} />
        </mesh>
        
        {/* Tường bên phải cửa - chỉnh để khít với mép cửa (mép phải cửa tại x = 1.3) */}
        <mesh position={[5.65, 2, 0]} castShadow>
          {/* width = 8.7 -> spans from x = 1.3 to x = 10 */}
          <boxGeometry args={[8.7, 4, 0.3]} />
          <meshStandardMaterial color={'#F5F5DC'} />
  </mesh>
        
        {/* Tường trên cửa */}
        <mesh position={[0, 3, 0]} castShadow>
          <boxGeometry args={[2.6, 2, 0.3]} />
          <meshStandardMaterial color={'#F5F5DC'} />
        </mesh>
        
        <Door position={[0, 0, 0]} />
      </group>

      {/* Bảng hiệu bảo tàng */}
      <MuseumSign />

      {/* Các hộp kính trưng bày cổ vật */}
      <DisplayCase position={[4, 0, -3]} artifactType="weapon" />
      <DisplayCase position={[-4, 0, 3]} artifactType="helmet" />
      <DisplayCase position={[6, 0, 0]} artifactType="flag" />
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