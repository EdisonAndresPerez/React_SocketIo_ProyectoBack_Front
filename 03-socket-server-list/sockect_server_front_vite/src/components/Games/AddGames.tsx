'use client'
import { useSocketConnection } from '../../hooks/useSocketConnection'
import GameAdd from './GameAdd'

export const AddGames = () => {
  const { socket, isOnline } = useSocketConnection()

  const addGame = (gameName: string, gameGenre: string) => {
    if (socket && isOnline) {
      socket.emit('add-game', { namegame: gameName, genre: gameGenre })
    }
  }

  return (
    <>
      <div className='card shadow-sm border-0 h-fit'>
        <div className='card-header bg-white border-bottom-0 py-3'>
          <h3 className='card-title mb-0 text-dark fw-semibold'>
            <i className='bi bi-plus-circle me-2 text-success'></i>
            Agregar Juego
          </h3>
          <p className='text-muted mb-0 small'>Añade un nuevo juego</p>
        </div>
        <div className='card-body'>
          <GameAdd onAddGame={addGame} />
        </div>
      </div>
    </>
  )
}

export default AddGames
