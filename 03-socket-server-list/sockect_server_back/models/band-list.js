const client = require("../database");
const Band = require("./band");

class BandList {
  constructor() {
    this.bands = []
  }

  getBands() {
    return this.bands;
  }

  async loadInitialBands() {
    const result = await client.query('SELECT * FROM bands');
    this.bands = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      votes: row.votes
    }));
  }

  async addBand(name) {
    try {
      const result = await client.query(
        'INSERT INTO bands (name, votes) VALUES ($1, $2) RETURNING *',
        [name, 0]
      );
      const newBand = result.rows[0];
      this.bands.push(newBand);
      return newBand;
    } catch (error) {
      console.error('Error agregando banda:', error);
      return null;
    }
  }

  async removeBand(id) {
    try {
      await client.query('DELETE FROM bands WHERE id = $1', [id]);
      return true;
    } catch (error) {
      console.error('Error eliminando banda:', error);
      return false;
    }
  }

  async increaseVotes(id) {
    try {
      const result = await client.query(
        'UPDATE bands SET votes = votes + 1 WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error aumentando votos:', error);
      return null;
    }
  }

  async changeName(id, newName) {
    if (!newName?.trim()) return null;
    try {
      const result = await client.query(
        'UPDATE bands SET name = $1 WHERE id = $2 RETURNING *',
        [newName.trim(), id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error cambiando nombre:', error);
      return null;
    }
  }

}
module.exports = BandList;
