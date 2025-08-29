
const {v4: uuidv4} = require('uuid')

class Game {
  constructor(player, genre, players){
    this.id = uuidv4();
    this.player = player;
    this.players = players;
    this.genre = genre || "desconocido";
    this.points = 0;
  }
}

module.exports = Game;