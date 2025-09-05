export type Game = {
  id: string,
  namegame: string,
  genre: string,
  points: number,
  isEditing: boolean
}


export type GameEditData = {
  id: string,
  newName: string,
  newGenre: string
}


export interface  GameAddProps {
  onAddGame: (namegame: string, genre: string ) => void
}

export interface GameListProps {
  games: Game[];
  onVote: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (data: GameEditData) => void;
}

export interface GameRowProps {
  game: Game;
  index: number;
  onVote: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (data: GameEditData) => void;
}