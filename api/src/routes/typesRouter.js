const { Router } = require("express");

const typesRouter = Router()    

typesRouter.get("/", (req, res) =>{
    res.send("Estoy en Types")
})

module.exports = typesRouter;