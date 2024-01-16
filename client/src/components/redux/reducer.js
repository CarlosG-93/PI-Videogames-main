import { GET_VIDEOGAME, GET_VIDEOGAMES, GET_SORTED_AZ } from "./actions";

const initialState = {
    videoGame: [],
    videoGames: [],
    sortedVideogames: []
};

const reducer = (state = initialState,action) => {
    switch (action.type){

        case GET_VIDEOGAME:
            return{...state,
            videoGame: action.payload};

        case GET_VIDEOGAMES:
            return{...state,
            videoGames: action.payload};

        case GET_SORTED_AZ:
            return{...state,
            sortedVideogames: action.payload};

        default:
            return{...state};
    }
};

export default reducer;