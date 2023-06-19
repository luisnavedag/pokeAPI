const { Router } = require("express");
const {getAllPokemons, createPokemon, getPokemon} = require("../handlers/pokemonHandlers")

const pokemonRouter = Router();



pokemonRouter.get("/", getAllPokemons)

pokemonRouter.get("/:idPokemon", getPokemon)

pokemonRouter.post("/", createPokemon)

module.exports = pokemonRouter;