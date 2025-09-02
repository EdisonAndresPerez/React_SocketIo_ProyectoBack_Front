'use client';


import { useSocketConnection } from '../../hooks/useSocketConnection'
import ServiceStatus from './ServiceStatus'

export const Navbar = () => {
    const { isOnline, isConnecting } = useSocketConnection()
  return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary shadow-sm'>
        <div className='container'>
          <h1 className='navbar-brand mb-0 h1 fw-bold'>
            <i className='bi bi-music-note-beamed me-2'></i>
            BandNames
          </h1>
          <ServiceStatus isOnline={isOnline} isConnecting={isConnecting} />
        </div>
      </nav>
  )
}

export default Navbar
