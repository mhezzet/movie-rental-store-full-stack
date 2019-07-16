import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Apollo from './store'
import './styles/index.css'

ReactDOM.render(
  <Apollo>
    <App />
  </Apollo>,
  document.getElementById('root')
)
