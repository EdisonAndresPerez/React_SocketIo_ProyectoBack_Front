import {useState, useEffect} from 'react'
import type { Band } from '../types/Band'
import  useSocket  from './useSocket'

export const useSocketConnection = () => {
  const [bands, setBands] = useState<Band[]>([])
   const { socket, isOnline, isConnecting } = useSocket()
  

  useEffect(() => {
     if (!socket) return

    socket.emit('get-bandas')

    socket.on('bandas', (bandasFromServer: Band[]) => {
      setBands(bandasFromServer)
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

    return () => {
      socket.off('bandas')
      socket.off('bands-updated')
      socket.off('band-added')
      socket.off('band-deleted')
      socket.off('band-voted')
      socket.off('band-edited')
    }
  }, [socket])


  return { bands, setBands, socket, isOnline, isConnecting}
}