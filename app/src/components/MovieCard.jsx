import { Card, Elevation } from '@blueprintjs/core'
import React from 'react'
import styles from './MovieCard.module.css'

export default function MovieCard({ pic, title, desc, rating, onClick }) {
  return (
    <Card
      onClick={onClick}
      interactive={true}
      elevation={Elevation.ONE}
      style={{
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ position: 'relative' }}>
        <div className={styles.overlay}>
          {rating}{' '}
          <span role='img' aria-label='star'>
            ⭐
          </span>
        </div>
        <img
          style={{ maxWidth: 300, maxHeight: 300, marginBottom: '10px' }}
          src={pic}
          alt='movie'
        />
      </div>
      <h5
        style={{ textAlign: 'center', cursor: 'pointer', fontWeight: 'bold' }}
        className='bp3-heading'
      >
        {title}
      </h5>
      <p className='bp3-text-muted' style={{ textAlign: 'center' }}>
        {desc}
      </p>
    </Card>
  )
}
