'use client';

import BandList from './BandList'
import { useSocketConnection } from '../../hooks/useSocketConnection'

export const Bandas = () => {
  const { bands, socket, isOnline } = useSocketConnection()

  const deleteBand = (id: string) => {
    if (!socket || !isOnline) return
    socket.emit('delete-band', id)
  }

  const voteBand = (id: string) => {
    if (!socket || !isOnline) return
    socket.emit('vote-band', id)
  }

  const onEdit = (id: string, name: string) => {
    if (!socket || !isOnline) return
    socket.emit('edit-band', { id, newName: name })
  }

  return (
    <div className='col-lg-8'>
      <div className='card shadow-sm border-0'>
        <div className='card-header bg-white border-bottom-0 py-3'>
          <h3 className='card-title mb-0 text-dark fw-semibold'>
            <i className='bi bi-list-ul me-2 text-primary'></i>
            Lista de Bandas
          </h3>
          <p className='text-muted mb-0 small'>Vota por tus bandas favoritas</p>
        </div>
        <div className='card-body p-0'>
          <BandList
            bands={bands}
            onVote={voteBand}
            onDelete={deleteBand}
            onEdit={onEdit}
          />
        </div>
      </div>
    </div>
  )
}

export default Bandas