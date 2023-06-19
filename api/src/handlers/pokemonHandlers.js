const axios = require("axios");
const { createNewPokemon, gettingAllPokemons } = require("../controllers/pokemonController")

//GET

// https://localhost:3001/pokemons
const getAllPokemons = async (req, res) => {
    try {
        // BRING FROM API
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        const { results } = response.data;
    
        const pokemonPromises = results.map(async (pokemon) => {
          const pokemonData = await axios.get(pokemon.url);
          const { id, name, sprites, stats, height, weight } = pokemonData.data;
    
          return {
            id,
            name,
            image: sprites.front_default,
            health: stats[0].base_stat,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            speed: stats[5].base_stat,
            height,
            weight
          };
        });
    
        const pokemonList = await Promise.all(pokemonPromises);
        // BRING FROM BBDD
        const bringAll = await gettingAllPokemons()

        const allPokemons = [...bringAll, ...pokemonList]
        res.status(200).json(allPokemons);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la lista de Pokémon' });
      }
}

// https://localhost:3001/pokemons/:idPokemon
const getPokemon = async (req, res) => {
    try {
        const { idPokemon } = req.params;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const { id, name, sprites, stats, height, weight } = response.data;
    
        const pokemon = {
          id,
          name,
          image: sprites.front_default,
          health: stats[0].base_stat,
          attack: stats[1].base_stat,
          defense: stats[2].base_stat,
          speed: stats[5].base_stat,
          height,
          weight
        };

        if(!pokemon) throw new Error("No existe pokémon con ese id");

        return res.status(200).json(pokemon)
    } catch (error) {
        return res.status(404).send("ERROR")
    }
}


//POST
// https://localhost:3001/pokemons/
const createPokemon = async (req, res) =>{
  try {
    const {name, image, health, attack, defense, speed, height, weight} = req.body;
    const newPokemon = await createNewPokemon(name, image, health, attack, defense, speed, height, weight);
    res.status(201).json(newPokemon)
  } catch (error) {
    res.status(404).json({error: error.message})

  }

}



module.exports = {getAllPokemons, createPokemon, getPokemon}