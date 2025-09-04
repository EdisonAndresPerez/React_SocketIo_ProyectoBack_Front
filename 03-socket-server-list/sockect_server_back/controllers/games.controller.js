const bd = require('../database');

const obtenerJuegos = async (_req, res)  => {
  try {
    const resultado = await bd.query('SELECT * FROM games');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener juegos', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = { obtenerJuegos };
