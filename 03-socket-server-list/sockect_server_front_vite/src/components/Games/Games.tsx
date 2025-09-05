'use client'

import GameList from "./GameList"
import { useSocketConnection } from "../../hooks/useSocketConnection"
import type { GameEditData } from "../../types/Game"

export const Games = () =>  {
const { games, socket, isOnline} = useSocketConnection()

const deleteGame = (id: string) => {
  if(!socket || !isOnline) return
  socket.emit('delete-game', id)
}

const voteGame = (id: string) => {
  if(!socket || !isOnline) return
  socket.emit('vote-game', id)
}

const onEdit = (data: GameEditData) => {
  if(!socket || !isOnline) return
  socket.emit('edit-game', { id: data.id, newName: data.newName, newGenre: data.newGenre })
}



  return (
  <div className='col-lg-8'>
      <div className='card shadow-sm border-0'>
        <div className='card-header bg-white border-bottom-0 py-3'>
          <h3 className='card-title mb-0 text-dark fw-semibold'>
            <i className='bi bi-list-ul me-2 text-primary'></i>
            Lista de Juegos
          </h3>
          <p className='text-muted mb-0 small'>Vota por tus juegos favoritos</p>
        </div>
        <div className='card-body p-0'>
          <GameList
            games={games}
            onVote={voteGame}
            onDelete={deleteGame}
            onEdit={onEdit}
          />
        </div>
      </div>
    </div>
  )
}

export default Games
