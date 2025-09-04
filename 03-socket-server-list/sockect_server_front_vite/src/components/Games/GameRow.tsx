'use client'

import React, { useState } from "react"
import type { GameRowProps } from "../../types/Game"


export const GameRow: React.FC<GameRowProps> = ({ game, index, onVote, onDelete, onEdit }) => {

const [isEditing, setIsEditing] = useState(false);
const [newName, setNewName] = useState(game.name);


const handleSave = () => {
  const name = newName.trim();
  if (!name) return;
  onEdit(game.id, name);
  setIsEditing(false);
}

  const handleCancel = () => {
    setNewName(game.name);
    setIsEditing(false);
  };


  return (
    <div>








    </div>
  )
}

