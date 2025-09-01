"use client"

import type React from "react"
import { useState} from "react"

interface BandAddProps {
  onAddBand: (name: string) => void
}

const BandAdd: React.FC<BandAddProps> = ({ onAddBand }) => {
  const [bandName, setBandName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (bandName.trim() === "") return

    setIsLoading(true)

    setTimeout(() => {
      onAddBand(bandName.trim())
      setBandName("")
      setIsLoading(false)
    }, 300)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="bandName" className="form-label fw-semibold text-dark">
          Nombre de la banda
        </label>
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">
            <i className="bi bi-music-note text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            id="bandName"
            placeholder="Ej: The Beatles"
            value={bandName}
            onChange={(e) => setBandName(e.target.value)}
            disabled={isLoading}
            maxLength={50}
          />
        </div>
        <div className="form-text">
          <small className="text-muted">{bandName.length}/50 caracteres</small>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-success w-100 fw-semibold"
        disabled={bandName.trim() === "" || isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Agregando...
          </>
        ) : (
          <>
            <i className="bi bi-plus-lg me-2"></i>
            Agregar Banda
          </>
        )}
      </button>
    </form>
  )
}

export default BandAdd
