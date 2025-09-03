import {Navigate, Route, Routes }  from  'react-router-dom'
import {LoginPages} from '../auth/pages/LoginPages'
import {RegisterPages} from '../auth/pages/RegisterPages'

export const AuthRoutes = () => {
  return (
    <Routes>

        <Route path="loginPages" element={ <LoginPages /> } />
        <Route path="registerPages" element={ <RegisterPages /> } />

        <Route path='/*' element={ <Navigate to="/loginPages" /> } />


    </Routes>
  )
}