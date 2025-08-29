const Game = require('./game');

class GameList {

  constructor() {

    this.games = [
      new Game("andres", "Player 1", "Action"),
      new Game("fernando", "Player 2", "Adventure"),
      new Game("jorge", "Player 3", "Puzzle")
    ];
  }


  addGame(player, genre) {
    const newGame = new Game(player, genre);
    this.games.push(newGame);
    return this.games
  }

  removeGame(id) {
    this.games = this.games.filter(game => game.id !== id);
  }

  getGame() {
    return this.games;
  }

  increasePoints(id) {
    const game = this.games.find(game => game.id === id);
    if (game) {
      game.points += 1;
    }
    return this.games;
  }
}

module.exports = GameList;