const { Router } = require('express');
const pokemonRouter = require("./pokemonRouter");
const typesRouter = require('./typesRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const mainRouter = Router();

mainRouter.use("/pokemons", pokemonRouter)

mainRouter.use("/types", typesRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = mainRouter;
