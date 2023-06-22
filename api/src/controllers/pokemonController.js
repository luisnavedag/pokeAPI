const { Pokemon } = require("../db");
const axios = require("axios")
const {Op} = require("sequelize")


const gettingAllPokemons = async() => {
   try {
      const dbPokemons = await Pokemon.findAll();
      const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      const apiPokemons = apiResponse.data.results;
  
      const apiPokemonDetails = await Promise.all(
        apiPokemons.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const { id, name, sprites, stats, height, weight } = pokemonResponse.data;
          return {
            id,
            name,
            image: sprites.front_default,
            health: stats[0].base_stat,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            speed: stats[5].base_stat,
            height,
            weight,
          };
        })
      );
  
      const allPokemons = [...dbPokemons, ...apiPokemonDetails];
      return allPokemons;
    } catch (error) {
      throw new Error('No se pudieron obtener todos los Pokémon.');
    }
    };


const getPokemonById = async(id, source) => {
   if (source === 'api') {
     try {
       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
       const { name, sprites, stats, height, weight } = response.data;
 
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
 
       return pokemon;
     } catch (error) {
       throw new Error('No se pudo obtener el Pokémon de la API.');
     }
   } else if (source === 'bdd') {
     const pokemon = await Pokemon.findByPk(id)
     return pokemon
   } else {
     throw new Error('Origen no válido. Debes especificar "api" o "db" como fuente de datos.');
   }
 }

const createNewPokemon = async(name, image, health, attack, defense, speed, height, weight) =>{
   return await Pokemon.create({name, image, health, attack, defense, speed, height, weight});
}

const searchPokemonByName = async (searchName) => {
  const dbPokemons = await Pokemon.findAll({
    where: {
      name: {
        [Op.iLike]: `%${searchName}%`,
      },
    },
  });

  if (dbPokemons.length > 0) {
    return dbPokemons;
  }

  try {
    const apiResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`
    );

    const { id, name: pokemonName, sprites, stats, height, weight } =
      apiResponse.data;

    const pokemonDetails = {
      id,
      name: pokemonName,
      image: sprites.front_default,
      health: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      speed: stats[5].base_stat,
      height,
      weight,
    };

    return [pokemonDetails];
  } catch (error) {
    console.error(error);
    return [];
  }
};




module.exports = { createNewPokemon, gettingAllPokemons, searchPokemonByName, getPokemonById}