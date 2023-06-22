const { getAllTypes } = require("../controllers/typesControllers");

const getTypes = async (req, res) => {
  try {
    const types = await getAllTypes();
    res.status(200).json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los tipos de Pokémon" });
  }
};

module.exports = { getTypes };