const db = require('../database');

const obtenerBandas = async (_req, res) => {
  try {
    const resultado = await db.query('SELECT * FROM bands');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener bandas', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = { obtenerBandas };
