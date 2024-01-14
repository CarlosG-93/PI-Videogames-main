const { Videogame, Genres } = require('../db');
const axios = require('axios');
const { URL, API_KEY } = process.env;
const { Op } = require('sequelize');

// Get all games

const cleanApi = (arr) => {
    return arr.map(element => {
        const platforms = [element.platforms, element.parent_platforms]
            .flatMap(platform => platform.map(p => p.platform.name))
            .filter((name, index, arr) => arr.indexOf(name) === index);
        const genres = element.genres.map(g => g.id);
        return {
            id: element.id,
            name: element.name,
            description: element.description,
            platform: platforms,
            image: element.background_image,
            released: element.released,
            rating: element.rating,
            genres: genres,
            created: false
        };
    });
};

const getAllVideogames = async () => {
    const dbVideogames = await Videogame.findAll();
    const apiVideogamesAll = (await axios.get(`${URL}/games?key=${API_KEY}`)).data.results;
    const apiVideogames = cleanApi(apiVideogamesAll);
    return [...dbVideogames, ...apiVideogames]
}

// Get by ID

const getVideogamesByID = async (id) => {
    if (isNaN(id)) {
        const response = await Videogame.findOne({ where: { id } });
        return response;
    };
   
    try {
        const {data} = await axios.get(`${URL}/games/${id}?key=${API_KEY}`)
        const game = {
            id: data.id,
            name: data.name,
            description: data.description,
            platform: data.platforms.map(data => data.platform.name),
            image: data.background_image,
            released: data.released,
            rating: data.rating,
            genres: data.genres.map(data => data.name),
        }
        return game;
    } catch (error) {
        return null;
    }
   


};

// Get by Name

const getVideogamesByName = async (name) => {
    const dbVideogames = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        limit: 15
    });

    const apiVideogamesAll = (await axios.get(`${URL}/games?key=${API_KEY}&pageSize=15`)).data.results;
    const apiVideogames = cleanApi(apiVideogamesAll);
    const apiFiltered = apiVideogames.filter((game) => game.name.toLowerCase().includes(name.toLowerCase()));
    const result = [...dbVideogames, ...apiFiltered];
    if (result.length === 0) {
        return { message: `No se encontro ningún videojuego que coincida con '${name}'.` };
    }
    return result.slice(0, 15);
};

//Post videogame

const createVideogames = async (name, description, plataforms, image, released, rating, genres) => {
    return await Videogame.create({
        name,
        description,
        plataforms,
        image,
        released,
        rating,
        genres
    });
};



module.exports = {
    getAllVideogames,
    getVideogamesByID,
    getVideogamesByName,
    createVideogames
};