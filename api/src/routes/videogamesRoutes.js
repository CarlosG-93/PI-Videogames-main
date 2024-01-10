const { Router } = require('express');
const videogamesRouter = Router();
const { getVideogamesHandlers, getDetailHandlers, postVideogamesHandlers } = require('../handlers/videogamesHandlers.js');

videogamesRouter.get("/", getVideogamesHandlers);
videogamesRouter.get("/:id", getDetailHandlers);
videogamesRouter.post("/", postVideogamesHandlers);

module.exports = videogamesRouter;