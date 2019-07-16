import { Spinner } from '@blueprintjs/core'
import React from 'react'

export default function LoadingSmall() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <Spinner />
    </div>
  )
}
