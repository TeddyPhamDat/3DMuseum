import React from 'react'
import { useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react'

export function LOD({ children, distance = 15 }) {
  const [visible, setVisible] = useState(true)
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    
    const cameraPosition = state.camera.position
    const meshPosition = meshRef.current.position
    const dist = cameraPosition.distanceTo(meshPosition)
    
    // Chỉ render khi camera gần
    setVisible(dist < distance)
  })

  return (
    <group ref={meshRef} visible={visible}>
      {children}
    </group>
  )
}

export function SimpleLOD({ children, highDetail, lowDetail, distance = 10 }) {
  const [useHighDetail, setUseHighDetail] = useState(true)
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    
    const cameraPosition = state.camera.position
    const meshPosition = meshRef.current.position
    const dist = cameraPosition.distanceTo(meshPosition)
    
    setUseHighDetail(dist < distance)
  })

  return (
    <group ref={meshRef}>
      {useHighDetail ? (highDetail || children) : lowDetail}
    </group>
  )
}