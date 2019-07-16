import { Button } from '@blueprintjs/core'
import React from 'react'

export default function MovieDetail({
  setView,
  movie,
  onAddToBasket,
  disableAddToBasket
}) {
  return (
    <div>
      <Button
        style={{ margin: '1rem' }}
        onClick={() => setView('gallery')}
        text='BACK'
      />
      <div
        style={{
          margin: 'auto',
          width: 700,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h2
          style={{ textAlign: 'center', marginBottom: 20 }}
          className='bp3-heading'
        >
          {movie.title} ({movie.releaseYear})
        </h2>
        <img
          style={{ width: 230, marginBottom: '10px' }}
          src={movie.poster}
          alt='movie'
        />
        <p className='bp3-text-muted' style={{ textAlign: 'center' }}>
          {movie.description}
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <span>Number in stock</span>
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: 'ivory',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    padding: '0px 4px',
                    color: '#30404D'
                  }}
                >
                  {movie.numberInStock}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Rating</span>
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: 'ivory',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    padding: '0px 4px',
                    color: '#30404D'
                  }}
                >
                  {movie.releaseYear} ⭐
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Genre</span>
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: 'ivory',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    padding: '0px 4px',
                    color: '#30404D'
                  }}
                >
                  {movie.genre[0]}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          disabled={disableAddToBasket}
          onClick={() => onAddToBasket(movie)}
          style={{ margin: '1rem' }}
          rightIcon='add'
          text='ADD TO BASKET'
        />
      </div>
    </div>
  )
}
