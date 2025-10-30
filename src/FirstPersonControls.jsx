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

    // Simple collision with walls but allow movement through door area
    const innerBounds = 9.5  // Inside museum
    const outerBounds = 20   // Outside area limit
    const doorArea = Math.abs(camera.position.x) < 1.5 // Door is 3 units wide, centered
    
    // If inside museum (z < 9.5), constrain to inner bounds but allow door exit
    if (camera.position.z < 9.5) {
      camera.position.x = Math.max(-innerBounds, Math.min(innerBounds, camera.position.x))
      camera.position.z = Math.max(-innerBounds, camera.position.z)
    } 
    // If in door area, allow free movement
    else if (camera.position.z >= 9.5 && camera.position.z <= 10.5 && doorArea) {
      // Allow movement through door
      camera.position.x = Math.max(-2, Math.min(2, camera.position.x))
    }
    // If outside, allow wider movement but with limits
    else {
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