const { Pokemon, Type } = require("../db");
const axios = require("axios")
const {Op} = require("sequelize")


const gettingAllPokemons = async() => {
   try {
      const dbPokemons = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ['name'],
          through: { attributes: [] }, 
        },
      });

      const dbPokemonsWithTypes = dbPokemons.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        health: pokemon.health,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        types: pokemon.Types.map((type) => type.name),
        height: pokemon.height,
        weight: pokemon.weight,
        createdInDB: pokemon.createdInDB
      }));

      const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30');
      const apiPokemons = apiResponse.data.results;
  
      const apiPokemonDetails = await Promise.all(
        apiPokemons.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const { id, name, sprites, stats, height, weight, types } = pokemonResponse.data;
          return {
            id,
            name,
            image: sprites.other['official-artwork'].front_default,
            health: stats[0].base_stat,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            speed: stats[5].base_stat,
            types: types.map((typeData) => typeData.type.name),
            height,
            weight,
          };
        })
      );
  
      const allPokemons = [...dbPokemonsWithTypes, ...apiPokemonDetails];
      return allPokemons;
    } catch (error) {
      throw new Error('No se pudieron obtener todos los Pokémon.');
    }
    };


const getPokemonById = async(id, source) => {
   if (source === 'api') {
     try {
       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
       const { name, sprites, stats, height, weight, types } = response.data;
 
       const pokemon = {
         id,
         name,
         image: sprites.other['official-artwork'].front_default,
         types: types.map((typeData) => typeData.type.name),
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
    try {
      const pokemon = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ['name'],
          through: { attributes: [] },
        },
      });

      if (!pokemon) {
        throw new Error('No se encontró ningún Pokémon con ese ID en la base de datos.');
      }

      const pokemonWithTypes = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        health: pokemon.health,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        types: pokemon.Types.map((type) => type.name),
        height: pokemon.height,
        weight: pokemon.weight,
      };

      return pokemonWithTypes;
    } catch (error) {
      throw new Error('No se pudo obtener el Pokémon de la base de datos.');
    }
  } else {
     throw new Error('Origen no válido. Debes especificar "api" o "db" como fuente de datos.');
   }
 }


 const createNewPokemon = async (name, image, health, attack, defense, speed, height, weight, types, createdInDB) => {
  try {
    const newPokemon = await Pokemon.create({
      name,
      image,
      health,
      attack,
      defense,
      speed,
      height,
      weight, 
      createdInDB
    });

    // Tipos existentes de Pokemon
    const existingTypes = await Type.findAll({ where: { name: types } });

    // Relacionándolos con los tipos
    newPokemon.addTypes(existingTypes);

    return newPokemon;
  } catch (error) {
    throw new Error(error.message);
  }
};



const searchPokemonByName = async (searchName) => {
  const dbPokemons = await Pokemon.findAll({
    where: {
      name: {
        [Op.iLike]: `%${searchName}%`,
      },
    },
    include: {
      model: Type,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });

  if (dbPokemons.length > 0) {
    const dbPokemonsWithTypes = dbPokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      health: pokemon.health,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      types: pokemon.Types.map((type) => type.name),
      height: pokemon.height,
      weight: pokemon.weight,
    }));

    return dbPokemonsWithTypes;
  }

  try {
    const apiResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`
    );

    const { id, name: pokemonName, sprites, stats, height, weight, types } =
      apiResponse.data;

    const pokemonDetails = {
      id,
      name: pokemonName,
      types: types.map((typeData) => typeData.type.name),
      image: sprites.other['official-artwork'].front_default,
      health: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      speed: stats[5].base_stat,
      height,
      weight,
    };

    return [pokemonDetails];
  } catch (error) {
    throw new Error(error.name)
  }
};




module.exports = { createNewPokemon, gettingAllPokemons, searchPokemonByName, getPokemonById}