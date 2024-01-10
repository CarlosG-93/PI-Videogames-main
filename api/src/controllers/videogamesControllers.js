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

const getVideogamesByID = async (id, source) => {
    const response = source === "api" ? await axios.get(`${URL}/games?key=${API_KEY}/${id}`)
        : await Videogame.findByPk(id);
    if (source === "api") {
        const { id, name, description, released, platforms, background_image, rating, genres } = response.data.results;
        const platformsName = platforms.map(data => data.plataform.name);
        const genresName = genres.map(data => data.name);
        return {
            id,
            name,
            description,
            released,
            platformsName,
            background_image,
            rating,
            genresName
        };
    } else {
        return response;
    }

    // const res = (await axios.get(`${URL}/games?key=${API_KEY}/${id}`)).data.results;
    // return {
    //     id: res.id,
    //     name: res.name,
    //     description: res.description,
    //     plataform: res.plataforms.map((data) => {
    //         return {
    //             name: data.plataform.name,
    //         };
    //     }),
    //     image: res.background_image,
    //     released: res.released,
    //     rating: res.rating,
    //     genres: res.genres.map((g) => {
    //         return {
    //             name: g.genres.name,
    //         };
    //     }),
    // };

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