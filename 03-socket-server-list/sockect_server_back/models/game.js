
const {v4: uuidv4} = require('uuid')

class Game {
  constructor(nameGame, genre, points) {
    this.id = uuidv4();
    this.nameGame = nameGame;
    this.genre = genre || "desconocido";
    this.points = 0;
  }
}

module.exports = Game;