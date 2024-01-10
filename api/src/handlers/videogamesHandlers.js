const { getAllVideogames, getVideogamesByID, getVideogamesByName, createVideogames } = require('../controllers/videogamesControllers');

// Handler All & Name

const getVideogamesHandlers = async (req, res) => {
    const { name } = req.query;
    const result = name ? await getVideogamesByName(name) : await getAllVideogames(); 

    res.send(result);
};

// Handler By Id

const getDetailHandlers = async (req, res) =>{
    const { id } = req.params;
    const source = isNaN(id)?"db":"api";
    try {
        const videogames = await getVideogamesByID(id, source);
        res.status(200).json(videogames);
    } catch (error) {
        res.status(400).json({error: error.message});        
    }
};

// Handler Post

const postVideogamesHandlers = async (req, res) => {
    const { name, description, plataforms, image, released, rating, genres } = req.body;
    try {
        if(!name || ! description || !plataforms || ! image || !released || !rating || !genres) throw Error("Missing data");
        const newVideogames = await createVideogames(name, description, plataforms, image, released, rating, genres);
        res.status(201).json(newVideogames)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


module.exports = {
    getVideogamesHandlers,
    getDetailHandlers,
    postVideogamesHandlers
}
