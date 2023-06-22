const { Router } = require("express");
const { getTypes } = require("../handlers/typesHandlers")

const typesRouter = Router()    

typesRouter.get("/", getTypes)

module.exports = typesRouter;