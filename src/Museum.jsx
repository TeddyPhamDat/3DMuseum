import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function VietnamFlag({ position, rotation, size = [1.2, 0.8] }) {
  // Sử dụng texture JPG cho lá cờ Việt Nam
  const flagTexture = useTexture('/vietnam-flag.jpg')
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial 
        map={flagTexture} 
        // color={'#DC143C'}
        side={2}
      />
    </mesh>
  )
}

function Wall({ position = [0, 1.5, -5], rotation = [0, 0, 0], color = '#f0f0f0', size = [10, 3, 0.3], startIndex = 0, count = 11 }) {
  // Extended historical revolutionary images
  const historicalEvents = [
    { 
      year: '1930', 
      event: 'Thành lập Đảng Cộng sản Việt Nam', 
      image: '/1930.png',
      description: 'Ngày 3/2/1930, tại Hương Cảng (Trung Quốc), Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản trong nước thành Đảng Cộng sản Việt Nam.'
    },
    { 
      year: '1945', 
      event: 'Bác Hồ đọc Bảng Tuyên Ngôn Độc Lập', 
      image: '/1945.png',
      description: 'Ngày 2/9/1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.'
    },
    { 
      year: '1951', 
      event: 'Đại hội đảng lần thứ II', 
      image: '/1951.png',
      description: 'Đại hội lần thứ II của Đảng họp từ 11-19/2/1951 tại Tuyên Quang, chính thức lấy tên là Đảng Lao động Việt Nam.'
    },
    { 
      year: '1954', 
      event: 'Chiến thắng Điện Biên Phủ', 
      image: '/1954.png',
      description: 'Chiến thắng lịch sử Điện Biên Phủ ngày 7/5/1954 đã lập nên chiến công vang dội, buộc thực dân Pháp phải ký Hiệp định Genève.'
    },
    { 
      year: '1960', 
      event: 'Đại hội đảng lần thứ III', 
      image: '/1960.png',
      description: 'Đại hội lần thứ III họp từ 5-10/9/1960 tại Hà Nội, đề ra đường lối xây dựng chủ nghĩa xã hội ở miền Bắc và giải phóng miền Nam.'
    },
    { 
      year: '1975', 
      event: 'Giải phóng miền Nam thống nhất Đất nước', 
      image: '/1975.png',
      description: 'Ngày 30/4/1975, chiến dịch Hồ Chí Minh thắng lợi hoàn toàn, giải phóng miền Nam, thống nhất đất nước, kết thúc 21 năm chia cắt.'
    },
    { 
      year: '1976', 
      event: 'Đại hội đảng lần thứ IV', 
      image: '/1976.png',
      description: 'Đại hội lần thứ IV họp từ 14-20/12/1976, là Đại hội Đảng thống nhất toàn quốc sau khi đất nước hoàn toàn độc lập và thống nhất.'
    },
    { 
      year: '1986', 
      event: 'Đại hội đảng lần thứ VI', 
      image: '/1986.png',
      description: 'Đại hội lần thứ VI họp từ 15-18/12/1986, khởi xướng công cuộc Đổi mới toàn diện đất nước, mở ra thời kỳ phát triển mới.'
    },
    { 
      year: '1991', 
      event: 'Đại hội đảng lần thứ VII', 
      image: '/1991.png',
      description: 'Đại hội lần thứ VII họp từ 24-27/6/1991, tiềp tục đẩy mạnh công cuộc đổi mới, phát triển kinh tế thị trường định hướng xã hội chủ nghĩa.'
    },
    { 
      year: '2011', 
      event: 'Đại hội đảng lần thứ XI', 
      image: '/2011.png',
      description: 'Đại hội lần thứ XI họp từ 12-19/1/2011, đề ra mục tiêu phấn đấu đến năm 2020 nước ta cơ bản trở thành nước công nghiệp.'
    },
    { 
      year: '2021', 
      event: 'Đại hội đảng lần thứ XIII', 
      image: '/2021.png',
      description: 'Đại hội lần thứ XIII họp từ 25/1-2/2/2021, vạch ra phương hướng phát triển đất nước trong giai đoạn mới, hướng tới thịnh vượng.'
    },
  ]

  // Load all textures
  const textures = useTexture([
    '/1930.png',
    '/1945.png',
    '/1951.png',
    '/1954.png',
    '/1960.png',
    '/1975.png',
    '/1976.png',
    '/1986.png',
    '/1991.png',
    '/2011.png',
    '/2021.png',
  ])

  // Get pictures for this wall
  const wallEvents = historicalEvents.slice(startIndex, startIndex + count)
  
  // CHIỀU NGANG - 1 hàng duy nhất
  const pictureWidth = 2.0 // Chiều rộng của mỗi khung ảnh
  const pictureSpacing = 0.3 // Khoảng cách giữa các ảnh
  const totalPictureWidth = pictureWidth + pictureSpacing
  
  return (
    <group position={position} rotation={rotation}>
      {/* Tường chính - CÓ ÁNH SÁNG */}
      <mesh receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Đèn spotlight nhẹ cho các khung tranh */}
      <pointLight 
        position={[0, 0, 0.8]} 
        intensity={0.5}
        distance={8}
        decay={2}
        color="#FFF8DC"
      />

      {/* Khung ảnh lịch sử - 1 HÀNG NGANG */}
      {wallEvents.map((event, i) => {
        // Tính toán vị trí X - căn đều theo chiều ngang
        const totalWidth = wallEvents.length * totalPictureWidth - pictureSpacing
        const startX = -totalWidth / 2
        const xPosition = startX + (i * totalPictureWidth) + (pictureWidth / 2)
        
        // Vị trí Y - giữa tường
        const yPosition = 0
        
        return (
          <group key={i} position={[xPosition, yPosition, size[2]/2 + 0.01]}>
            {/* Khung tranh gỗ với chất liệu đẹp */}
            <mesh castShadow>
              <planeGeometry args={[pictureWidth, 1.8]} />
              <meshStandardMaterial 
                color={'#654321'} 
                roughness={0.7}
                metalness={0.1}
              />
            </mesh>
            {/* Ảnh lịch sử */}
            <mesh position={[0, 0, 0.01]} castShadow>
              <planeGeometry args={[1.8, 1.5]} />
              <meshStandardMaterial 
                map={textures[startIndex + i]}
                roughness={0.6}
              />
            </mesh>
            {/* Năm */}
            <Text
              position={[0, -0.55, 0.02]}
              fontSize={0.12}
              color="#FFD700"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {event.year}
            </Text>
            {/* Bảng tên sự kiện */}
            <mesh position={[0, -0.95, 0.01]}>
              <planeGeometry args={[pictureWidth, 0.6]} />
              <meshStandardMaterial color={'#1C1C1C'} />
            </mesh>
            <Text
              position={[0, -0.95, 0.02]}
              fontSize={0.06}
              color="#FFD700"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.9}
              fontWeight="bold"
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
        <meshStandardMaterial 
          color={'#228B22'} 
          roughness={0.9}
        />
      </mesh>
      
      {/* Đường đi dẫn đến cửa - mở rộng */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 14]}>
        <planeGeometry args={[5, 8]} />
        <meshStandardMaterial 
          color={'#696969'}
          roughness={0.7}
        />
      </mesh>
      
      {/* Sàn bên trong bảo tàng - sàn gạch bóng - mở rộng */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial 
          color={'#F5F5DC'} 
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>
    </>
  )
}

function Ceiling() {
  return (
    <group>
      {/* Trần chính - màu kem sang trọng */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial 
          color={'#FFF8DC'} 
          roughness={0.4}
        />
      </mesh>
      
      {/* Khung trang trí trần - hình chữ nhật */}
      <mesh position={[0, 3.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8, 9, 4]} />
        <meshStandardMaterial 
          color={'#D4AF37'} 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Đèn chùm trung tâm đẹp hơn */}
      <group position={[0, 3.5, 0]}>
        {/* Chụp đèn tròn */}
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.8, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color={'#FFFAF0'} 
            transparent 
            opacity={0.8}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
        
        {/* Các bóng đèn nhỏ xung quanh */}
        {Array.from({length: 4}).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2
          const x = Math.cos(angle) * 0.6
          const z = Math.sin(angle) * 0.6
          return (
            <group key={i} position={[x, -0.4, z]}>
              <mesh>
                <sphereGeometry args={[0.08, 8, 6]} />
                <meshStandardMaterial 
                  color={'#FFFACD'} 
                  emissive={'#FFFACD'} 
                  emissiveIntensity={0.4}
                />
              </mesh>
            </group>
          )
        })}
        
        {/* Ánh sáng từ đèn chùm */}
        <pointLight 
          position={[0, -0.5, 0]} 
          intensity={1.0}
          color="#FFFAF0"
          distance={15}
          decay={2}
        />
      </group>
      
      {/* Hoa văn trang trí 4 góc */}
      {[
        [-8, 0, -8], [8, 0, -8], [-8, 0, 8], [8, 0, 8]
      ].map((pos, i) => (
        <group key={i} position={[pos[0], 3.92, pos[2]]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 0.6, 8]} />
            <meshStandardMaterial 
              color={'#CD853F'} 
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
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
      {/* Dây chắn xung quanh xe */}
      <group>
        {/* Cột chắn 4 góc với chất liệu kim loại */}
        <mesh position={[-3, 0.75, -2.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial 
            color={'#C0C0C0'} 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[3, 0.75, -2.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial 
            color={'#C0C0C0'} 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-3, 0.75, 2.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial 
            color={'#C0C0C0'} 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[3, 0.75, 2.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial 
            color={'#C0C0C0'} 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Dây chắn ngang */}
        <mesh position={[0, 1, -2.5]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.02, 0.02, 6, 8]} />
          <meshStandardMaterial color={'#8B0000'} />
        </mesh>
        <mesh position={[0, 1, 2.5]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.02, 0.02, 6, 8]} />
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

      {/* Cabin - Chất liệu xe quân sự */}
      <mesh position={[0.6, 1.4, 0]} castShadow>
        <boxGeometry args={[2.3, 0.8, 1.8]} />
        <meshStandardMaterial 
          color={'#3A4D1A'} 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Mái xe */}
      <mesh position={[0.6, 1.9, 0]} castShadow>
        <boxGeometry args={[2.3, 0.1, 1.8]} />
        <meshStandardMaterial 
          color={'#2D3D0F'}
          roughness={0.8}
        />
      </mesh>

      {/* Capô xe */}
      <mesh position={[-1.0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.8, 0.4, 1.8]} />
        <meshStandardMaterial 
          color={'#4A5D23'} 
          roughness={0.8}
        />
      </mesh>

      {/* Bánh xe với chất liệu cao su */}
      <mesh position={[-1.0, 0.25, 0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 12]} />
        <meshStandardMaterial 
          color={'#2C2C2C'} 
          roughness={0.9}
        />
      </mesh>
      <mesh position={[-1.0, 0.25, -0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 12]} />
        <meshStandardMaterial 
          color={'#2C2C2C'} 
          roughness={0.9}
        />
      </mesh>
      <mesh position={[1.0, 0.25, 0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 12]} />
        <meshStandardMaterial 
          color={'#2C2C2C'} 
          roughness={0.9}
        />
      </mesh>
      <mesh position={[1.0, 0.25, -0.9]} castShadow rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 12]} />
        <meshStandardMaterial 
          color={'#2C2C2C'} 
          roughness={0.9}
        />
      </mesh>

      {/* Vành bánh xe kim loại */}
      <mesh position={[-1.0, 0.25, 0.9]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 12]} />
        <meshStandardMaterial 
          color={'#696969'} 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-1.0, 0.25, -0.9]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 12]} />
        <meshStandardMaterial 
          color={'#696969'} 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[1.0, 0.25, 0.9]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 12]} />
        <meshStandardMaterial 
          color={'#696969'} 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[1.0, 0.25, -0.9]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 12]} />
        <meshStandardMaterial 
          color={'#696969'} 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Kính chắn gió trong suốt */}
      <mesh position={[0.4, 1.6, 0]} rotation={[0.1, 0, 0]}>
        <planeGeometry args={[1.6, 0.9]} />
        <meshStandardMaterial 
          color={'#E6F3FF'} 
          transparent 
          opacity={0.4}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Đèn pha */}
        <mesh position={[-1.75, 0.9, 0]} rotation={[0, Math.PI/2, 0]}>
          <planeGeometry args={[0.8, 0.6]} />
          <meshStandardMaterial 
            color={'#2C2C2C'} 
            roughness={0.9}
          />
        </mesh>
        <mesh position={[-1.75, 0.6, 0]} rotation={[0, Math.PI/2, 0]}>
          <planeGeometry args={[0.5, 0.2]} />
          <meshStandardMaterial color={'#FFFFFF'} />
        </mesh>
        <Text
          position={[-1.75, 0.6, 0.11]}
          rotation={[0, Math.PI/2, 0]}
          fontSize={0.08}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          SP307BW
        </Text>
        <mesh position={[-1.75, 1.0, 0.35]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 12]} />
          <meshStandardMaterial 
            color={'#FFFACD'} 
            emissive={'#FFFACD'} 
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[-1.75, 1.0, -0.35]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 12]} />
          <meshStandardMaterial 
            color={'#FFFACD'} 
            emissive={'#FFFACD'} 
            emissiveIntensity={0.3}
          />
        </mesh>

      {/* Ghế lái */}
      <mesh position={[0.3, 1.4, 0.5]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial 
          color={'#654321'} 
          roughness={0.8}
        />
      </mesh>
      <mesh position={[0.3, 1.4, -0.5]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial 
          color={'#654321'} 
          roughness={0.8}
        />
      </mesh>

      {/* Vô lăng */}
      <mesh position={[0.9, 1.5, 0.5]} rotation={[0, 0, Math.PI/2]}>
        <torusGeometry args={[0.15, 0.02, 6, 16]} />
        <meshStandardMaterial color={'#2C2C2C'} />
      </mesh>

      {/* Cửa xe */}
      <mesh position={[-0.5, 1.4, 0.9]} castShadow>
        <boxGeometry args={[1.8, 0.7, 0.05]} />
        <meshStandardMaterial color={'#4A5D23'} />
      </mesh>
      <mesh position={[-0.5, 1.4, -0.9]} castShadow>
        <boxGeometry args={[1.8, 0.7, 0.05]} />
        <meshStandardMaterial color={'#4A5D23'} />
      </mesh>

      {/* Tay nắm cửa kim loại */}
      <mesh position={[0.2, 1.4, 0.95]}>
        <cylinderGeometry args={[0.02, 0.02, 0.08, 8]} />
        <meshStandardMaterial 
          color={'#C0C0C0'} 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.2, 1.4, -0.95]}>
        <cylinderGeometry args={[0.02, 0.02, 0.08, 8]} />
        <meshStandardMaterial 
          color={'#C0C0C0'} 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Đèn chiếu sáng cho xe */}
      <spotLight 
        position={[0, 4, 3]} 
        target-position={[0, 0, 0]}
        intensity={1.0}
        angle={Math.PI / 3}
        penumbra={0.3}
      />

      {/* Bảng thông tin xe */}
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
  const flagTexture = useTexture('/vietnam-flag.jpg')
  
  const artifacts = {
    weapon: { 
      name: 'Súng K54 - Vũ khí cách mạng Việt Nam',
      description: 'Súng lục Tokarev TT-33 do Liên Xô sản xuất'
    },
    helmet: { 
      name: 'Nón cối Quân đội Nhân dân Việt Nam',
      description: 'Mũ cối bộ đội thời kháng chiến chống Mỹ'
    },
    flag: { 
      name: 'Cờ đỏ sao vàng - Quốc kỳ Việt Nam',
      description: 'Lá cờ được sử dụng trong các trận đánh lịch sử'
    },
    medal: { 
      name: 'Huân chương Sao Vàng - Huân chương cao quý nhất',
      description: 'Huân chương được trao cho những công trần xuất sắc'
    }
  }
  
  const artifact = artifacts[artifactType] || artifacts.weapon

  const renderArtifact = () => {
    switch(artifactType) {
      case 'weapon':
        return (
          <group rotation={[0, Math.PI/4, 0]}>
            {/* Thân súng chính */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.9, 0.08, 0.08]} />
              <meshStandardMaterial 
                color={'#2C2C2C'} 
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            
            {/* Báng súng */}
            <mesh position={[0.35, -0.06, 0]}>
              <boxGeometry args={[0.4, 0.16, 0.08]} />
              <meshStandardMaterial 
                color={'#654321'} 
                roughness={0.8}
              />
            </mesh>
            
            {/* Nòng súng */}
            <mesh position={[-0.45, 0, 0]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
              <meshStandardMaterial 
                color={'#1C1C1C'} 
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            
            {/* Cò súng */}
            <mesh position={[0.1, -0.05, 0]}>
              <boxGeometry args={[0.03, 0.06, 0.02]} />
              <meshStandardMaterial 
                color={'#2C2C2C'} 
                metalness={0.7}
              />
            </mesh>
            
            {/* Kính ngắm */}
            <mesh position={[-0.1, 0.05, 0]}>
              <boxGeometry args={[0.1, 0.03, 0.03]} />
              <meshStandardMaterial 
                color={'#2C2C2C'} 
                metalness={0.8}
              />
            </mesh>
          </group>
        )
        
      case 'helmet':
        return (
          <group>
            {/* Nón cối chính */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.18, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
              <meshStandardMaterial 
                color={'#3A5F2D'} 
                roughness={0.9}
              />
            </mesh>
            
            {/* Vành nón */}
            <mesh position={[0, -0.12, 0]} rotation={[Math.PI/2, 0, 0]}>
              <torusGeometry args={[0.19, 0.02, 6, 16]} />
              <meshStandardMaterial 
                color={'#2D4A20'} 
                roughness={0.9}
              />
            </mesh>
            
            {/* Quai cằm */}
            <mesh position={[0.12, -0.14, 0]} rotation={[0, 0, Math.PI/4]}>
              <cylinderGeometry args={[0.008, 0.008, 0.15, 6]} />
              <meshStandardMaterial color={'#4A4A4A'} />
            </mesh>
            <mesh position={[-0.12, -0.14, 0]} rotation={[0, 0, -Math.PI/4]}>
              <cylinderGeometry args={[0.008, 0.008, 0.15, 6]} />
              <meshStandardMaterial color={'#4A4A4A'} />
            </mesh>
            

          </group>
        )
        
      case 'flag':
        return (
          <group>
            {/* Lá cờ với texture thật */}
            <mesh position={[0, 0.1, 0]}>
              <planeGeometry args={[0.5, 0.35]} />
              <meshStandardMaterial map={flagTexture} side={2} />
            </mesh>
            
           
          </group>
        )
        
      case 'medal':
        return (
          <group>
            {/* Huy chương chính - đứng thẳng */}
            <mesh position={[0, 0.1, 0]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.03, 20]} />
              <meshStandardMaterial 
                color={'#FFD700'} 
                metalness={0.9}
                roughness={0.1}
                emissive={'#FFD700'} 
                emissiveIntensity={0.2}
              />
            </mesh>
            
            {/* Ngôi sao giữa huy chương - đứng thẳng */}
            <mesh position={[0, 0.1, 0.02]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.015, 5]} />
              <meshStandardMaterial map={flagTexture} side={3} />
            </mesh>
            
            {/* Dải ruy băng đỏ - treo từ trên xuống */}
            <mesh position={[0, 0.28, 0]}>
              <boxGeometry args={[0.12, 0.25, 0.02]} />
              <meshStandardMaterial color={'#DC143C'} />
            </mesh>
            
            {/* Khoen treo - nằm ngang */}
            <mesh position={[0, 0.42, 0]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.04, 0.012, 6, 12]} />
              <meshStandardMaterial 
                color={'#DAA520'} 
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            
            {/* Viền huy chương - đứng thẳng */}
            <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.15, 0.015, 6, 20]} />
              <meshStandardMaterial 
                color={'#B8860B'} 
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            
            {/* Nền đỏ cho sao - đứng thẳng */}
            <mesh position={[0, 0.1, 0.015]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.10, 0.10, 0.008, 20]} />
              <meshStandardMaterial 
                color={'#8B0000'} 
                roughness={0.7}
              />
            </mesh>
            
            {/* Điểm nhấn vàng quanh sao - đứng thẳng */}
            <mesh position={[0, 0.1, 0.025]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.08, 0.008, 6, 12]} />
              <meshStandardMaterial 
                color={'#FFD700'} 
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        )
        
      default:
        return (
          <mesh>
            <boxGeometry args={[0.3, 0.2, 0.6]} />
            <meshStandardMaterial color={'#8B4513'} />
          </mesh>
        )
    }
  }

  return (
    <group position={position}>
      {/* Bục đế gỗ */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.4, 0.8, 1.4]} />
        <meshStandardMaterial 
          color={'#8B4513'} 
          roughness={0.7}
        />
      </mesh>
      
      {/* Mặt bục */}
      <mesh position={[0, 0.81, 0]} castShadow>
        <boxGeometry args={[1.4, 0.02, 1.4]} />
        <meshStandardMaterial color={'#DEB887'} />
      </mesh>
      
      {/* Khung kính dưới */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[1.2, 0.08, 1.2]} />
        <meshStandardMaterial 
          color={'#C0C0C0'} 
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* Hộp kính trong suốt */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[1.1, 0.7, 1.1]} />
        <meshPhysicalMaterial 
          color={'#ffffff'} 
          transparent 
          opacity={0.15}
          transmission={0.9}
          roughness={0.05}
          metalness={0.05}
        />
      </mesh>
      
      {/* Khung kính trên */}
      <mesh position={[0, 1.61, 0]}>
        <boxGeometry args={[1.2, 0.08, 1.2]} />
        <meshStandardMaterial 
          color={'#C0C0C0'} 
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* Cổ vật bên trong */}
      <group position={[0, 1.25, 0]}>
        {renderArtifact()}
      </group>
      
      {/* Đèn LED chiếu sáng */}
      <pointLight position={[0, 1.8, 0]} intensity={0.4} color="#FFFFFF" />
      
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
        <meshStandardMaterial 
          color={'#654321'} 
          roughness={0.7}
        />
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
          <meshStandardMaterial 
            color={'#8B4513'} 
            roughness={0.7}
          />
        </mesh>

        {/* Tay nắm cửa trái - trong cùng group nên sẽ xoay theo */}
        <mesh position={[1.1, 1.2, 0.1]}>
          <sphereGeometry args={[0.04, 8, 6]} />
          <meshStandardMaterial 
            color={'#FFD700'} 
            metalness={0.8}
            roughness={0.2}
          />
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
          <meshStandardMaterial 
            color={'#8B4513'} 
            roughness={0.7}
          />
        </mesh>

        {/* Tay nắm cửa phải - trong cùng group nên sẽ xoay theo */}
        <mesh position={[-1.1, 1.2, 0.1]}>
          <sphereGeometry args={[0.04, 8, 6]} />
          <meshStandardMaterial 
            color={'#FFD700'} 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Bậc thang cửa */}
      <mesh position={[0, 0.1, 0.5]} castShadow>
        <boxGeometry args={[4.5, 0.2, 1]} />
        <meshStandardMaterial 
          color={'#A0522D'} 
          roughness={0.7}
        />
      </mesh>
      
      {/* Bậc thang thứ hai */}
      <mesh position={[0, 0.05, 0.8]} castShadow>
        <boxGeometry args={[5, 0.1, 0.4]} />
        <meshStandardMaterial 
          color={'#8B4513'} 
          roughness={0.7}
        />
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
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 3.5, 0]} intensity={0.6} color="#FFFFFF" />
      
      {/* Tường sau - màu tím nhạt - 4 pictures */}
      <Wall 
        position={[0, 2, -10]} 
        color={'#E6E6FA'} 
        size={[40, 10, 0.3]}
        startIndex={0}
        count={4}
      />

      {/* Tường trái - màu vàng nhạt - 4 pictures */}
      <Wall 
        position={[-10, 2, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        color={'#F0E68C'} 
        size={[40, 10, 0.3]}
        startIndex={4}
        count={4}
      />

      {/* Tường phải - màu hồng nhạt - 3 pictures */}
      <Wall 
        position={[10, 2, 0]} 
        rotation={[0, -Math.PI / 2, 0]} 
        color={'#FFE4E1'} 
        size={[40, 10, 0.3]}
        startIndex={8}
        count={4}
      />

      {/* Tường trước với cửa - màu be - KHÔNG có khung hình ngoài */}
      <group position={[0, 0, 10]}>
        {/* Tường bên trái cửa */}
        <mesh position={[-5.65, 2, 0]} castShadow>
         <boxGeometry args={[8.7, 4, 0.3]} />
          <meshStandardMaterial 
            color={'#F5F5DC'} 
            roughness={0.8}
          />
        </mesh>
        
        {/* Tường bên phải cửa */}
        <mesh position={[5.65, 2, 0]} castShadow>
          <boxGeometry args={[8.7, 4, 0.3]} />
          <meshStandardMaterial 
            color={'#F5F5DC'} 
            roughness={0.8}
          />
        </mesh>
        
        {/* Tường trên cửa */}
        <mesh position={[0, 3, 0]} castShadow>
          <boxGeometry args={[6, 2, 0.3]} />
          <meshStandardMaterial 
            color={'#F5F5DC'} 
            roughness={0.8}
          />
        </mesh>
        
        <Door position={[0, 0, 0]} />
      </group>

      {/* Bảng hiệu bảo tàng */}
      <MuseumSign />

      {/* Trang trí mặt tiền - Lịch sử Đảng */}
      <group position={[0, 0, 12]}>
        {/* Cột cờ bên trái */}
        <mesh position={[-8, 2.5, 2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 5, 8]} />
          <meshStandardMaterial 
            color={'#8B4513'} 
            roughness={0.7}
          />
        </mesh>
        
        {/* Cờ Việt Nam bên trái với texture */}
        <VietnamFlag 
          position={[-7.2, 4, 2]} 
          rotation={[0, 0, 0.05]} 
          size={[1.2, 0.8]} 
        />

        {/* Cột cờ bên phải */}
        <mesh position={[8, 2.5, 2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 5, 8]} />
          <meshStandardMaterial 
            color={'#8B4513'} 
            roughness={0.7}
          />
        </mesh>
        
        {/* Cờ Việt Nam bên phải với texture */}
        <VietnamFlag 
          position={[7.2, 4, 2]} 
          rotation={[0, 0, -0.05]} 
          size={[1.2, 0.8]} 
        />

        {/* Bảng khẩu hiệu cách mạng trái */}
        <mesh position={[-6, 1.5, 1]} rotation={[0, Math.PI/6, 0]}>
          <planeGeometry args={[2.5, 0.8]} />
          <meshStandardMaterial color={'#8B0000'} />
        </mesh>
        <Text
          position={[-6, 1.5, 1.01]}
          rotation={[0, Math.PI/6, 0]}
          fontSize={0.12}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          maxWidth={2.3}
        >
          ĐẢNG CỘNG SAN VIỆT NAM
          QUANG VINH - VĨ ĐẠI
        </Text>

        {/* Bảng khẩu hiệu cách mạng phải */}
        <mesh position={[6, 1.5, 1]} rotation={[0, -Math.PI/6, 0]}>
          <planeGeometry args={[2.5, 0.8]} />
          <meshStandardMaterial color={'#8B0000'} />
        </mesh>
        <Text
          position={[6, 1.5, 1.01]}
          rotation={[0, -Math.PI/6, 0]}
          fontSize={0.12}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          maxWidth={2.3}
        >
          LÃNH ĐẠO CÁCH MẠNG
          GIẢI PHÓNG DÂN TỘC
        </Text>

        {/* Đèn chiếu sáng mặt tiền - Giảm số lượng */}
        <spotLight 
          position={[0, 6, 3]} 
          target-position={[0, 3, 0]}
          intensity={1.2}
          angle={Math.PI / 4}
          penumbra={0.4}
          color="#FFFAF0"
        />
      </group>

      {/* Xe cổ quân sự - đặt ở trung tâm */}
      <VintageVehicle position={[0, 0, -3]} />

      {/* Các hộp kính trưng bày cổ vật - di chuyển ra xa tường và xa xe */}
      <DisplayCase position={[6, 0, -6]} artifactType="weapon" />
      <DisplayCase position={[-6, 0, 6]} artifactType="helmet" />
      <DisplayCase position={[6, 0, 6]} artifactType="flag" />
      <DisplayCase position={[-6, 0, -6]} artifactType="medal" />

  // ...existing code...
    </>
  )
}