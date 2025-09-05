const client = require('../database');
const Game = require('./game');

class GameList {
  constructor() {
    this.games = [];
  }

  getGames() {
    return this.games;
  }

  async loadInitialGames() {
    const result = await client.query('SELECT * FROM games');
    this.games = result.rows.map(row => ({
      id: row.id,
      namegame: row.namegame, 
      genre: row.genre,
      points: row.points
    }));
  }

  async addGame(nameGame, genre) {
    try {
      const result = await client.query(
        'INSERT INTO games (namegame, genre, points) VALUES ($1, $2, $3) RETURNING *',
        [nameGame, genre, 0]
      );
      const newGame = {
        id: result.rows[0].id,
        namegame: result.rows[0].namegame,
        genre: result.rows[0].genre,
        points: result.rows[0].points
      };
      this.games.push(newGame);
      return newGame;
    } catch (error) {
      console.error('Error agregando juego:', error);
      return null;
    }
  }

  async removeGame(id) {
    try {
      await client.query('DELETE FROM games WHERE id = $1', [id]);
      return true;
    } catch (error) {
      console.log('error al eliminar juego:', error);
      return false;
    }
  }

  async increasePoints(id) {
    try {
      const result = await client.query(
        'UPDATE games SET points = points + 1 WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.log('error al aumentar puntos:', error);
      return null;
    }
  }

  async changeNameGame(id, newNameGame, newGenre) {
    try {
      const result = await client.query(
        'UPDATE games SET namegame = $1, genre = $2 WHERE id = $3 RETURNING *',
        [newNameGame, newGenre, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("error al cambiar el nombre del juego y la categoría", error);
      return null;
    }
  }
}

module.exports = GameList;
