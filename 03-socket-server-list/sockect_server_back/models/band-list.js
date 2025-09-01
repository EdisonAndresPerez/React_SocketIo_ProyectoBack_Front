const client = require("../database");
const Band = require("./band");

class BandList {
  constructor() {
    this.bands = []
  }
    async loadInitialBands() {
      const result = await client.query('SELECT * FROM bands');
      this.bands = result.rows.map(row => ({
        id: row.id,
        name: row.name,
        votes: row.votes
      }));
    }

  addBand(name) {
    if (!name?.trim()) return null;
    const newBand = new Band(name.trim());
    this.bands.push(newBand);
    return newBand;
  }

  removeBand(id) {
    const index = this.bands.findIndex((band) => band.id === id);
    if (index === -1) return false;
    this.bands.splice(index, 1);
    return true;
  }

  getBands() {
    return this.bands;
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

  changeName(id, newName) {
    if (!newName?.trim()) return null;
    const band = this.bands.find(band => band.id === id);
    if (!band) return null;
    band.name = newName.trim();
    return band;
  }
}
module.exports = BandList;
