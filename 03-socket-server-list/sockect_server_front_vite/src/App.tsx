'use client'

import { useEffect, useState } from 'react'
import BandAdd from './components/BandAdd'
import BandList from './components/BandList'
import ServiceStatus from './components/ServiceStatus'
import useSocket from './hooks/useSocket'
import type { Band } from './types/Band'

function App() {
  const [bands, setBands] = useState<Band[]>([])
  const { socket, isOnline, isConnecting } = useSocket()

  // Escuchar eventos del socket
  useEffect(() => {
    if (!socket) return

    // Eventos de bandas desde el servidor
    socket.on('bands-updated', (updatedBands: Band[]) => {
      console.log('📡 Bandas actualizadas desde servidor:', updatedBands)
      setBands(updatedBands)
    })

    socket.on('band-added', (newBand: Band) => {
      console.log('📡 Nueva banda desde servidor:', newBand)
      setBands(prevBands => [...prevBands, newBand])
    })

    socket.on('band-deleted', (deletedBandId: string) => {
      console.log('📡 Banda eliminada desde servidor:', deletedBandId)
      setBands(prevBands => prevBands.filter(band => band.id !== deletedBandId))
    })

    socket.on('band-voted', (updatedBand: Band) => {
      console.log('📡 Voto recibido desde servidor:', updatedBand)
      setBands(prevBands =>
        prevBands.map(band => (band.id === updatedBand.id ? updatedBand : band))
      )
    })

        socket.on('band-edited', (updatedBand: Band) => {
      console.log('✏️ Banda editada desde servidor:', updatedBand);
      setBands(prev =>
        prev.map(b => (b.id === updatedBand.id ? updatedBand : b))
      );
    });


    // Cleanup de listeners
    return () => {
      socket.off('bandas')
      socket.off('bands-updated')
      socket.off('band-added')
      socket.off('band-deleted')
      socket.off('band-voted')
      socket.off('band-edited')
    }
  }, [socket])

  useEffect(() => {
    if (!socket) return

    socket.emit('get-bandas')

    socket.on('bandas', (bandasFromServer: Band[]) => {
      setBands(bandasFromServer)
    })

    return () => {
      socket.off('bandas')
    }
  }, [socket])


  const addBand = (name: string) => {
   if (socket && isOnline) {
      socket.emit('add-band', { name });
    }
  };

  const deleteBand = (id: string) => {
    // Enviar al servidor
    if (socket && isOnline) {
      socket.emit('delete-band', id)
    }


    setBands(prevBands => prevBands.filter(band => band.id !== id))
  }

  const voteBand = (id: string) => {
    // Enviar al servidor
    if (socket && isOnline) {
      socket.emit('vote-band', id)
    }

    // Actualizar estado local
    setBands(prevBands =>
      prevBands.map(band =>
        band.id === id ? { ...band, votes: band.votes + 1 } : band
      )
    )
  }

  const onEdit = (id: string, name: string) => {
    if (!socket || !isOnline) return;
    socket.emit('edit-band', { id, newName: name }, (ack?: { ok: boolean; error?: string }) => {
      if (ack && !ack.ok) {
        console.error('Falló edición:', ack.error);
      }
    });
  };


  return (
    <div className='min-vh-100 bg-light'>
      {/* Header */}
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary shadow-sm'>
        <div className='container'>
          <h1 className='navbar-brand mb-0 h1 fw-bold'>
            <i className='bi bi-music-note-beamed me-2'></i>
            BandNames
          </h1>
          <ServiceStatus isOnline={isOnline} isConnecting={isConnecting} />
        </div>
      </nav>

      {/* Main Content */}
      <div className='container py-5'>
        <div className='row g-4'>
          {/* Band List Section */}
          <div className='col-lg-8'>
            <div className='card shadow-sm border-0'>
              <div className='card-header bg-white border-bottom-0 py-3'>
                <h3 className='card-title mb-0 text-dark fw-semibold'>
                  <i className='bi bi-list-ul me-2 text-primary'></i>
                  Lista de Bandas
                </h3>
                <p className='text-muted mb-0 small'>
                  Vota por tus bandas favoritas
                </p>
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

          {/* Add Band Section */}
          <div className='col-lg-4'>
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

            {/* Stats Card */}
            <div className='card shadow-sm border-0 mt-4'>
              <div className='card-body text-center'>
                <h4 className='text-primary fw-bold mb-1'>{bands.length}</h4>
                <p className='text-muted mb-2 small'>Bandas registradas</p>
                <h4 className='text-success fw-bold mb-1'>
                  {bands.reduce((total, band) => total + band.votes, 0)}
                </h4>
                <p className='text-muted mb-0 small'>Votos totales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
