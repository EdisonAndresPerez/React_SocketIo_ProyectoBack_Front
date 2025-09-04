export type Game = {
  id: string,
  name: string,
  points: number,
  isEditing: boolean
}


export type GameEditData = {
  id: string,
  newName: string
}


export interface  GameAddProps {
  onAddGame: (name: string) => void
}

export interface GameListProps {
  games: Game[];
  onVote: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}

export interface GameRowProps {
  game: Game;
  index: number;
  onVote: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}