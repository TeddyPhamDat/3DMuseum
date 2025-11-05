import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

const MOVEMENT_SPEED = 5
const keys = {
  KeyW: false,
  KeyA: false,
  KeyS: false,
  KeyD: false,
  Space: false,
  ShiftLeft: false,
}

export default function FirstPersonControls() {
  const { camera, gl } = useThree()
  const controlsRef = useRef()
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code in keys) {
        keys[event.code] = true
      }
    }

    const handleKeyUp = (event) => {
      if (event.code in keys) {
        keys[event.code] = false
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    if (!controlsRef.current) return

    // Reset velocity
    velocity.current.x = 0
    velocity.current.z = 0
    velocity.current.y = 0

    // Get movement direction
    direction.current.set(0, 0, 0)

    if (keys.KeyW) direction.current.z -= 1
    if (keys.KeyS) direction.current.z += 1
    if (keys.KeyA) direction.current.x -= 1
    if (keys.KeyD) direction.current.x += 1

    // Normalize and apply speed
    if (direction.current.length() > 0) {
      direction.current.normalize()
      direction.current.multiplyScalar(MOVEMENT_SPEED * delta)

      // Apply camera rotation to movement direction
      const quaternion = camera.quaternion.clone()
      direction.current.applyQuaternion(quaternion)

      // Only move horizontally (keep Y = 0 for ground movement)
      direction.current.y = 0

      velocity.current.copy(direction.current)
    }

    // Apply movement
    camera.position.add(velocity.current)

    // Keep camera at ground level (height = 1.7 for person height)
    camera.position.y = 1.7

    // Collision với tường - CỨNG Ở CẢ 2 CHIỀU
    const innerBounds = 9.5  // Inside museum
    const outerBounds = 20   // Outside area limit
    const doorArea = Math.abs(camera.position.x) < 1.5 // Door is 3 units wide, centered
    const doorWallZ = 10     // Vị trí chính xác của tường cửa
    const doorOpen = typeof window !== 'undefined' && !!window.__DOOR_OPEN

    // Lưu vị trí trước khi di chuyển
    const previousZ = camera.position.z - velocity.current.z

    // Kiểm tra collision với tường cửa
    const crossingDoorWall = (previousZ < doorWallZ && camera.position.z >= doorWallZ) || 
                             (previousZ > doorWallZ && camera.position.z <= doorWallZ)

    if (crossingDoorWall) {
      // Đang cố gắng băng qua tường cửa
      if (!doorOpen || !doorArea) {
        // Cửa đóng HOẶC không ở vùng cửa -> CHẶN CỨNG
        camera.position.z = previousZ
      }
    }

    // Giới hạn di chuyển bên trong và bên ngoài
    if (camera.position.z < doorWallZ) {
      // Bên trong bảo tàng
      camera.position.x = Math.max(-innerBounds, Math.min(innerBounds, camera.position.x))
      camera.position.z = Math.max(-innerBounds, camera.position.z)
    } else {
      // Bên ngoài bảo tàng
      camera.position.x = Math.max(-outerBounds, Math.min(outerBounds, camera.position.x))
      camera.position.z = Math.max(-outerBounds, Math.min(outerBounds, camera.position.z))
    }
  })

  return (
    <PointerLockControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      makeDefault
    />
  )
}