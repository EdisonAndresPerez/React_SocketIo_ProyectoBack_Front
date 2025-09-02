

import type { Band } from "../../types/Band";
import { BandRow } from "./BandRow";

interface BandListProps {
  bands: Band[];
  onVote: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}

const BandList: React.FC<BandListProps> = ({
  bands,
  onVote,
  onDelete,
  onEdit,
}) => {
  if (!bands || bands.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-music-note display-1 text-muted"></i>
        <h5 className="text-muted mt-3">No hay bandas registradas</h5>
        <p className="text-muted">Agrega la primera banda para comenzar</p>
      </div>
    );
  }

  const sortedBands = [...bands].sort((a, b) => b.votes - a.votes);

  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col" className="border-0 fw-semibold text-dark">
              <i className="bi bi-hash me-1"></i>Posición
            </th>
            <th scope="col" className="border-0 fw-semibold text-dark">
              <i className="bi bi-music-note me-1"></i>Nombre
            </th>
            <th
              scope="col"
              className="border-0 fw-semibold text-dark text-center"
            >
              <i className="bi bi-heart me-1"></i>Votos
            </th>
            <th
              scope="col"
              className="border-0 fw-semibold text-dark text-center"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedBands.map((band, index) => {
            return (
              <BandRow
                key={band.id}
                band={band}
                index={index}
                onVote={onVote}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BandList;
