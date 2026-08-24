import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AdminApp from './admin/AdminApp'
import './index.css'

// Enrutado mínimo: /admin abre el panel, cualquier otra ruta el sitio.
// Se resuelve una sola vez al cargar, así que no hace falta un router.
const esAdmin = window.location.pathname.replace(/\/+$/, '') === '/admin'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{esAdmin ? <AdminApp /> : <App />}</React.StrictMode>,
)
