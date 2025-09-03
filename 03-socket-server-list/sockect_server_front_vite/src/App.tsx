import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthRoutes } from './router/AuthRoutes'
import {HomeBandas} from './pages/HomeBandas'


function App() {

  return (
    <Routes>
      {/* Rutas de autenticación */}
      <Route path="/*" element={<AuthRoutes />} />

      {/* Ruta principal (solo si ya hay login implementado con contexto o JWT) */}
      <Route path="/home" element={<HomeBandas />} />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/loginPages" />} />
    </Routes>

  )
}

export default App
