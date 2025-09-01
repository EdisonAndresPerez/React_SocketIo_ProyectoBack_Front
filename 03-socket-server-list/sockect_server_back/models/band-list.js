const Band = require("./band");

class BandList {
  constructor() {
    this.bands = [
      new Band("Avenged sevenfold"),
      new Band("Metricas frias"),
      new Band("breaking benjamin"),
      new Band("Metallika"),
      new Band("sliknop"),
      new Band("Minecraft"),
      new Band("Minecraft22"),
      new Band("Minecraft"),
      new Band("Minecraft22"),
      new Band("Minecraft"),
      new Band("Minecraft22"),
    ];
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

  increaseVotes(id) {
    const band = this.bands.find(band => band.id === id);
    if (!band) return null;
    band.votes += 1;
    return band;
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
