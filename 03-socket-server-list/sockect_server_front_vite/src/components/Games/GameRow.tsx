'use client'

import React, { useState } from 'react'
import type { GameRowProps } from '../../types/Game'

export const GameRow: React.FC<GameRowProps> = ({
  game,
  index,
  onVote,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(game.namegame)
  const [newCategory, setNewCategory] = useState(game.genre)

  const handleSave = () => {
    const name = newName.trim()
    const category = newCategory.trim()


    if (!name && !category) return


    onEdit(game.id, name, category)
    setIsEditing(false)
  }
  const handleCancel = () => {
    setNewName(game.namegame)
    setNewCategory(game.genre)
    setIsEditing(false)
  }

  return (
    <tr className='align-middle'>
      <td className='fw-bold text-primary'>
        {index === 0 && <i className='bi bi-trophy-fill text-warning me-1'></i>}
        #{index + 1}
      </td>

      <td>
        {isEditing ? (
          <input
            className='form-control form-control-sm'
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSave()
              if (e.key === 'Escape') handleCancel()
            }}
            autoFocus
          />
        ) : (
          <div className='fw-semibold text-dark'>{game.namegame}</div>
        )}
      </td>

      <td className='text-center'>
        {isEditing ? (
          <input
            type='text'
            className='form-control form-control-sm'
            value={newCategory ?? ''}
            onChange={e => setNewCategory(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSave()
              if (e.key === 'Escape') handleCancel()
            }}
            autoFocus
          />
        ) : (
          <span className='badge bg-primary rounded-pill fs-6 px-3 py-2'>
            {game.genre}
          </span>
        )}
      </td>

      <td className='text-center'>
        <span className='badge bg-primary rounded-pill fs-6 px-3 py-2'>
          {game.points}
        </span>
      </td>

      <td className='text-center'>
        <div className='btn-group' role='group'>
          {!isEditing ? (
            <>
              <button
                className='btn btn-outline-secondary btn-sm'
                onClick={() => setIsEditing(true)}
                title='Editar nombre'
              >
                <i className='bi bi-pencil-square me-1'></i>Editar
              </button>

              <button
                className='btn btn-outline-success btn-sm'
                onClick={() => onVote(game.id)}
                title='Votar por este juego|'
              >
                <i className='bi bi-hand-thumbs-up me-1'></i>+1
              </button>

              <button
                className='btn btn-outline-danger btn-sm'
                onClick={() => onDelete(game.id)}
                title='Eliminar juego'
              >
                <i className='bi bi-trash'></i>
              </button>


            </>
          ) : (
            <>
              <button
                className='btn btn-success btn-sm'
                onClick={handleSave}
                title='Guardar cambios'
              >
                <i className='bi bi-check2-circle me-1'></i>Guardar
              </button>
              <button
                className='btn btn-outline-secondary btn-sm'
                onClick={handleCancel}
                title='Cancelar'
              >
                <i className='bi bi-x-lg me-1'></i>Cancelar
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
