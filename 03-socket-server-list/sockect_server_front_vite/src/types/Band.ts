export type Band = {
  id: string
  name: string
  votes: number
  isEditing: boolean
}

export type BandEditData = {
  id: string
  newName: string
}

export interface BandAddProps {
  onAddBand: (name: string) => void
}

export interface BandListProps {
  bands: Band[];
  onVote: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}

export interface BandRowProps {
  band: Band;
  index: number;
  onVote: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}






