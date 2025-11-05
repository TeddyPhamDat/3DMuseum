import { useFrame, useThree } from '@react-three/fiber'
import { useState, useRef, useMemo } from 'react'
import * as THREE from 'three'

// LOD Component - tự động chuyển quality theo khoảng cách
export function AdaptiveLOD({ 
  children, 
  position = [0, 0, 0], 
  highDetailDistance = 10,
  mediumDetailDistance = 20,
  lowDetailDistance = 30
}) {
  const groupRef = useRef()
  const [detailLevel, setDetailLevel] = useState('high')
  const { camera } = useThree()

  useFrame(() => {
    if (!groupRef.current) return

    const distance = camera.position.distanceTo(
      new THREE.Vector3(...position)
    )

    if (distance < highDetailDistance) {
      if (detailLevel !== 'high') setDetailLevel('high')
    } else if (distance < mediumDetailDistance) {
      if (detailLevel !== 'medium') setDetailLevel('medium')
    } else if (distance < lowDetailDistance) {
      if (detailLevel !== 'low') setDetailLevel('low')
    } else {
      if (detailLevel !== 'none') setDetailLevel('none')
    }
  })

  if (detailLevel === 'none') return null

  return (
    <group ref={groupRef} position={position}>
      {typeof children === 'function' ? children(detailLevel) : children}
    </group>
  )
}

// Adaptive Material - dùng Standard khi gần, Basic khi xa
export function useAdaptiveMaterial(distance, useStandard = true) {
  return useMemo(() => {
    return distance < 15 && useStandard ? 'standard' : 'basic'
  }, [distance, useStandard])
}
