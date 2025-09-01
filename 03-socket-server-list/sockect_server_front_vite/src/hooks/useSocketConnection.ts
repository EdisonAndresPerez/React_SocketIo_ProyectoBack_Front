import { useState, useEffect } from 'react'
import type { Band } from '../types/Band'
import useSocket from './useSocket'

export const useSocketConnection = () => {
  const [bands, setBands] = useState<Band[]>([])
  const { socket, isOnline, isConnecting } = useSocket()

useEffect(() => {
  const fetchBands = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/bandas')
      const data: Band[] = await res.json()
      setBands(data)
    } catch (error) {
      console.error('Error al obtener las bandas:', error)
    }
  }
  fetchBands()
}, [])


  useEffect(() => {
    if (!socket) return

    socket.on('band-added', (newBand: Band) => {
      console.log('📡 Nueva banda desde servidor:', newBand)
      setBands(prevBands => [...prevBands, newBand])
    })

    socket.on('band-deleted', (deletedBandId: string) => {
      console.log('📡 Banda eliminada desde servidor:', deletedBandId)
      setBands(prevBands => prevBands.filter(band => band.id !== deletedBandId))
    })

  socket.on('band-voted', (updatedBand: Band) => {
    setBands(prevBands =>
      prevBands.map(band => band.id === updatedBand.id ? updatedBand : band)
    )
  })

    socket.on('band-edited', (updatedBand: Band) => {
      console.log('✏️ Banda editada desde servidor:', updatedBand)
      setBands(prev =>
        prev.map(b => (b.id === updatedBand.id ? updatedBand : b))
      )
    })

    return () => {
      socket.off('bands-updated')
      socket.off('band-added')
      socket.off('band-deleted')
      socket.off('band-voted')
      socket.off('band-edited')
    }
  }, [socket])

  return { bands, setBands, socket, isOnline, isConnecting }
}
