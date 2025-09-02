'use client';

import { useSocketConnection } from '../../hooks/useSocketConnection'

export const StatsCards = () => {
  const { bands } = useSocketConnection()

  return (
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
  )
}

export default StatsCards
