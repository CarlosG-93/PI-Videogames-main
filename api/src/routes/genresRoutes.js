const { Router } = require('express');
const getGenresHandler = require('../handlers/genresHandlers');
const genresRoutes = Router();

genresRoutes.get("/", getGenresHandler);

module.exports = genresRoutes;