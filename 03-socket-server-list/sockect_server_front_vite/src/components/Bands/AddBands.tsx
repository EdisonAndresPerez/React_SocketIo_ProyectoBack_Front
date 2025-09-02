'use client';

import { useSocketConnection } from '../../hooks/useSocketConnection'
import BandAdd from './BandAdd'

export const AddBands = () => {
  const { socket, isOnline } = useSocketConnection()

  const addBand = (name: string) => {
    if (socket && isOnline) {
      socket.emit('add-band', { name })
    }
  }

  return (
    <>
      <div className='card shadow-sm border-0 h-fit'>
        <div className='card-header bg-white border-bottom-0 py-3'>
          <h3 className='card-title mb-0 text-dark fw-semibold'>
            <i className='bi bi-plus-circle me-2 text-success'></i>
            Agregar Banda
          </h3>
          <p className='text-muted mb-0 small'>Añade una nueva banda</p>
        </div>
        <div className='card-body'>
          <BandAdd onAddBand={addBand} />
        </div>
      </div>
    </>
  )
}

export default AddBands
