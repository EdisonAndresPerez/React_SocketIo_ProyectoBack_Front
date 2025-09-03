import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthRoutes } from './router/AuthRoutes'
import {HomeBandas} from './pages/HomeBandas'
import { PrivateRoute } from './router/PrivateRouter'


function App() {

  return (
    <Routes>
      {/* Rutas de autenticación */}
      <Route path="/*" element={<AuthRoutes />} />

           <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomeBandas />
          </PrivateRoute>
        }
      />
      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/loginPages" />} />
    </Routes>

  )
}

export default App
