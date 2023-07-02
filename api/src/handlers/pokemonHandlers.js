const axios = require("axios");
const { createNewPokemon, gettingAllPokemons, getPokemonById, searchPokemonByName } = require("../controllers/pokemonController");


//GET

// https://localhost:3001/pokemons
const getAllPokemons = async (req, res) => {
   try {
    const results = await gettingAllPokemons();
    res.status(200).json(results)
   } catch (error) {
    res.status(500).send("Error al buscar los Pokemons")
   }
  

    
};

// https://localhost:3001/pokemons/:idPokemon
const getPokemon = async (req, res) => {
      const { idPokemon } = req.params;
      const source = isNaN(idPokemon) ? "bdd" : "api"
    try {
      const pokemon = await getPokemonById(idPokemon, source);
      res.status(200).json(pokemon)
    } catch (error) {
      return res.status(404).send("ERROR")
    }
}

const getByName = async(req, res) => {
  try {
    const { name } = req.query;
  
    const result = await searchPokemonByName(name);
    res.status(200).json(result)
  } catch (error) {
    res.status(404).send("There is no Pokémon with that name")
  }

}


//POST
// https://localhost:3001/pokemons/
const createPokemon = async (req, res) => {
  try {
    const { name, image, health, attack, defense, speed, height, weight, types, createdInDB } = req.body;

    const newPokemon = await createNewPokemon(name, image, health, attack, defense, speed, height, weight, types, createdInDB );


    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(500).send("No se pudo crear el Pokémon");
  }
};



module.exports = {getAllPokemons, createPokemon, getPokemon, getByName}