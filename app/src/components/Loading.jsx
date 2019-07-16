import { Spinner } from '@blueprintjs/core'
import React from 'react'

export default function Loading() {
  return (
    <div
      style={{
        top: '50%',
        left: '50%',
        position: 'absolute'
      }}
    >
      <Spinner />
    </div>
  )
}
