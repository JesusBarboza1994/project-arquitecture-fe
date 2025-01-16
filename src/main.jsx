import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Global } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { reset, global } from './styles/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global styles={reset} />
    <Global styles={global} />
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
)
