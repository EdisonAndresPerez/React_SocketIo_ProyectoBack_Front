'use client';

import React, { useState } from 'react';
import type { Band } from '../types/Band';

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
  const [editingBand, setEditingBand] = useState<Band | null>(null);
  const [newName, setNewName] = useState<string>('');

  const handleEdit = (band: Band) => {
    setEditingBand(band);
    setNewName(band.name);
  };

  const handleCancel = () => {
    setEditingBand(null);
    setNewName('');
  };

  const handleSave = () => {
    if (!editingBand) return;
    const name = newName.trim();
    if (!name) return;
    onEdit(editingBand.id, name);
    setEditingBand(null);
    setNewName('');
  };

  if (!bands || bands.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-music-note display-1 text-muted"></i>
        <h5 className="text-muted mt-3">No hay bandas registradas</h5>
        <p className="text-muted">Agrega la primera banda para comenzar</p>
      </div>
    );
  }

  // Ordenar bandas por votos (descendente)
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
            <th scope="col" className="border-0 fw-semibold text-dark text-center">
              <i className="bi bi-heart me-1"></i>Votos
            </th>
            <th scope="col" className="border-0 fw-semibold text-dark text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedBands.map((band, index) => {
            const isEditing = editingBand?.id === band.id;

            return (
              <tr key={band.id} className="align-middle">
                <td className="fw-bold text-primary">
                  {index === 0 && <i className="bi bi-trophy-fill text-warning me-1"></i>}
                  #{index + 1}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      className="form-control form-control-sm"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') handleCancel();
                      }}
                      autoFocus
                    />
                  ) : (
                    <div className="fw-semibold text-dark">{band.name}</div>
                  )}
                </td>

                <td className="text-center">
                  <span className="badge bg-primary rounded-pill fs-6 px-3 py-2">
                    {band.votes}
                  </span>
                </td>

                <td className="text-center">
                  <div className="btn-group" role="group">
                    {!isEditing ? (
                      <>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleEdit(band)}
                          title="Editar nombre"
                        >
                          <i className="bi bi-pencil-square me-1"></i>
                          Editar
                        </button>
                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() => onVote(band.id)}
                          title="Votar por esta banda"
                        >
                          <i className="bi bi-hand-thumbs-up me-1"></i>
                          +1
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => onDelete(band.id)}
                          title="Eliminar banda"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={handleSave}
                          title="Guardar cambios"
                        >
                          <i className="bi bi-check2-circle me-1"></i>
                          Guardar
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={handleCancel}
                          title="Cancelar"
                        >
                          <i className="bi bi-x-lg me-1"></i>
                          Cancelar
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BandList;
