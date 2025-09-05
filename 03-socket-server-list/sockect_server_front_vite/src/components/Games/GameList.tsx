import { GameRow } from './GameRow'
import type { GameListProps } from '../../types/Game'

const GameList: React.FC<GameListProps> = ({
  games,
  onVote,
  onDelete,
  onEdit
}) => {
  if (!games || games.length === 0) {
    return (
      <div className='text-center py-5'>
        <i className='bi bi-music-note display-1 text-muted'></i>
        <h5 className='text-muted mt-3'>No hay Juegos registradas</h5>
        <p className='text-muted'>Agrega el primer juego para comenzar</p>
      </div>
    )
  }
  const sortedGames = [...games].sort((a, b) => b.points - a.points)

  return (
    <div className='table-responsive'>
      <table className='table table-hover mb-0'>
        <thead className='table-light'>
          <tr>
            <th scope='col' className='border-0 fw-semibold text-dark'>
              <i className='bi bi-hash me-1'></i>Posición
            </th>
            <th scope='col' className='border-0 fw-semibold text-dark'>
              <i className='bi bi-music-note me-1'></i>Nombre
            </th>
            <th scope='col' className='border-0 fw-semibold text-dark'>
              <i className='bi bi-music-note me-1'></i>Genero
            </th>
            <th
              scope='col'
              className='border-0 fw-semibold text-dark text-center'
            >
              <i className='bi bi-heart me-1'></i>Puntos
            </th>
            <th
              scope='col'
              className='border-0 fw-semibold text-dark text-center'
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedGames.map((game, index) => {
            return (
              <GameRow
                key={game.id}
                game={game}
                index={index}
                onVote={onVote}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default GameList
