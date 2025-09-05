'use client'

import type React from 'react'
import { useState } from 'react'
import type { GameAddProps } from '../../types/Game'

const GameAdd: React.FC<GameAddProps> = ({ onAddGame }) => {
  const [gameName, setGameName] = useState('')
  const [gameGenre, setGameGenre] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Nombre del juego:', gameName)
    console.log('Categoría del juego:', gameGenre)

    if (gameName.trim() === '' || gameGenre.trim() === '') return

    setIsLoading(true)

    setTimeout(() => {
      onAddGame(gameName.trim(), gameGenre.trim())
      setGameName('')
      setGameGenre('')
      setIsLoading(false)
    }, 300)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='gameName' className='form-label fw-semibold text-dark'>
          Nombre del juego
        </label>
        <div className='input-group'>
          <span className='input-group-text bg-light border-end-0'>
            <i className='bi bi-controller text-muted'></i>
          </span>
          <input
            type='text'
            className='form-control border-start-0 ps-0'
            id='gameName'
            placeholder='Ej: Minecraft'
            value={gameName}
            onChange={e => setGameName(e.target.value)}
            disabled={isLoading}
            maxLength={50}
          />
        </div>
        <div className='form-text'>
          <small className='text-muted'>{gameName.length}/50 caracteres</small>
        </div>
      </div>

      <div className='mb-3'>
        <label htmlFor='gameGenre' className='form-label fw-semibold text-dark'>
          Categoría del juego
        </label>
        <div className='input-group'>
          <span className='input-group-text bg-light border-end-0'>
            <i className='bi bi-tags text-muted'></i>
          </span>
          <input
            type='text'
            className='form-control border-start-0 ps-0'
            id='gameGenre'
            placeholder='Ej: Aventura'
            value={gameGenre}
            onChange={e => setGameGenre(e.target.value)}
            disabled={isLoading}
            maxLength={50}
          />
        </div>
        <div className='form-text'>
          <small className='text-muted'>{gameGenre.length}/50 caracteres</small>
        </div>
      </div>

      <button
        type='submit'
        className='btn btn-success w-100 fw-semibold'
        disabled={
          gameName.trim() === '' || gameGenre.trim() === '' || isLoading
        }
      >
        {isLoading ? (
          <>
            <span
              className='spinner-border spinner-border-sm me-2'
              role='status'
            ></span>
            Agregando...
          </>
        ) : (
          <>
            <i className='bi bi-plus-lg me-2'></i>
            Agregar juego
          </>
        )}
      </button>
    </form>
  )
}

export default GameAdd
