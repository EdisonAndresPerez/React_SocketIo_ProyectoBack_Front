import { useState, useEffect } from 'react'
import type { Game } from '../types/Game' 
import type { Band } from '../types/Band'
import useSocket from './useSocket'

export const useSocketConnection = () => {
  const [bands, setBands] = useState<Band[]>([])
  const [games, setGames] = useState<Game[]>([])
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
    const  fetchGames = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/juegos')
        const data = await res.json()
        setGames(data)
      } catch (error) {
        console.error('Error al obtener los juegos:', error)
      }
    }
    fetchGames()
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


  useEffect( () => {
 if (!socket) return

    socket.on('get-games', (games: Game[]) => {
      console.log('📡 Nuevos juegos desde servidor:', games)
      setGames(games)
    })

    socket.on('game-deleted', (deletedGameId: string) => {
      console.log('📡 Juego eliminado desde servidor:', deletedGameId)
      setGames(prevGames => prevGames.filter(game => game.id !== deletedGameId))
    })

     socket.on('game-voted', (updatedGame: Game) => {
    setGames(prevGames =>
      prevGames.map(game => game.id === updatedGame.id ? updatedGame : game)
    )
  })

      socket.on('game-edited', (updatedGame: Game) => {
      console.log('✏️ Juego editado desde servidor:', updatedGame)
      setGames(prev =>
        prev.map(g => (g.id === updatedGame.id ? updatedGame : g))
      )
    })


  return () => {
      socket.off('games-updated')
      socket.off('game-added')
      socket.off('game-deleted')
      socket.off('game-voted')
      socket.off('game-edited')
    }

  }, [socket])

  return { bands, setBands, games, setGames, socket, isOnline, isConnecting }
}
