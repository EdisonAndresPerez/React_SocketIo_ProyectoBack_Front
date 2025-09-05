import { useState, useEffect } from 'react'
import type { Game } from '../types/Game'
import type { Band } from '../types/Band'
import useSocket from './useSocket'

export const useSocketConnection = () => {
  const [bands, setBands] = useState<Band[]>([])
  const [games, setGames] = useState<Game[]>([])
  const { socket, isOnline, isConnecting } = useSocket()

  // === FUNCIONES PARA EMITIR AL SERVIDOR ===
  const editGame = (id: string, newName: string, newGenre: string) => {
    if (!socket) return
    socket.emit('edit-game', { id, newName, newGenre })
  }

  // === FETCH INICIAL BANDAS ===
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

  // === FETCH INICIAL JUEGOS ===
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/games')
        const data = await res.json()
        setGames(data)
      } catch (error) {
        console.error('Error al obtener los juegos:', error)
      }
    }
    fetchGames()
  }, [])

  // === SOCKET: BANDAS ===
  useEffect(() => {
    if (!socket) return

    socket.on('band-added', (newBand: Band) => {
      setBands(prev => [...prev, newBand])
    })

    socket.on('band-deleted', (deletedBandId: string) => {
      setBands(prev => prev.filter(band => band.id !== deletedBandId))
    })

    socket.on('band-voted', (updatedBand: Band) => {
      setBands(prev => prev.map(band => band.id === updatedBand.id ? updatedBand : band))
    })

    socket.on('band-edited', (updatedBand: Band) => {
      setBands(prev => prev.map(b => b.id === updatedBand.id ? updatedBand : b))
    })

    return () => {
      socket.off('band-added')
      socket.off('band-deleted')
      socket.off('band-voted')
      socket.off('band-edited')
    }
  }, [socket])

  // === SOCKET: JUEGOS ===
  useEffect(() => {
    if (!socket) return

    socket.on('get-games', (games: Game[]) => {
      setGames(games)
    })

    socket.on('game-deleted', (deletedGameId: string) => {
      setGames(prev => prev.filter(game => game.id !== deletedGameId))
    })

    socket.on('game-voted', (updatedGame: Game) => {
      setGames(prev => prev.map(game => game.id === updatedGame.id ? updatedGame : game))
    })

    socket.on('game-edited', (updatedGame: Game) => {
      setGames(prev => prev.map(g => g.id === updatedGame.id ? updatedGame : g))
    })

    return () => {
      socket.off('game-added')
      socket.off('game-deleted')
      socket.off('game-voted')
      socket.off('game-edited')
    }
  }, [socket])

  return { bands, setBands, games, setGames, socket, isOnline, isConnecting, editGame }
}
