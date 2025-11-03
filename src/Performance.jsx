import React from 'react'
import { Perf } from 'r3f-perf'

export default function Performance() {
  return (
    <>
      {/* Performance Monitor - chỉ hiển thị trong development */}
      {process.env.NODE_ENV === 'development' && (
        <Perf 
          position="top-left"
          showGraph={true}
          deepAnalyze={false}
          minimal={false}
        />
      )}
    </>
  )
}