const { Pokemon } = require("../db");


const gettingAllPokemons = async() => {
   return await Pokemon.findAll()
}

const createNewPokemon = async(name, image, health, attack, defense, speed, height, weight) =>{
   return await Pokemon.create({name, image, health, attack, defense, speed, height, weight});
    
}


module.exports = { createNewPokemon, gettingAllPokemons}