import { createRoot } from 'react-dom/client'
import './assets/style/main.css'
import { App } from './App.jsx'

const elRoot = document.getElementById('root')
createRoot(elRoot).render( <App />)
