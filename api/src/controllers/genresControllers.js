const axios = require('axios');
const { URL, API_KEY } = process.env;
const { Genres } = require('../db.js');

const getGenre = async () => {
    try {
        const response = await axios.get(`${URL}/genres?key=${API_KEY}`);
        const data = response.data.results;
        const genres = data.map((genre) => ({ name: genre.name }));
        
        await Genres.bulkCreate(genres, {
            ignoreDuplicates: true,
            fields: ['name'], // Especifica el campo único
        });
        return genres;

        // Puedes agregar lógica adicional si es necesario
    } catch (error) {
        console.error("Error fetching genres from API:", error.message);
        throw new Error("Failed to fetch genres");
    }
   
};

module.exports = getGenre;