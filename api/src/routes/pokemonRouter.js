const { Router } = require("express");
const {getAllPokemons, createPokemon, getPokemon, getByName} = require("../handlers/pokemonHandlers")

const pokemonRouter = Router();



pokemonRouter.get("/", getAllPokemons)

pokemonRouter.get("/name", getByName)

pokemonRouter.get("/:idPokemon", getPokemon)

pokemonRouter.post("/", createPokemon)

module.exports = pokemonRouter;