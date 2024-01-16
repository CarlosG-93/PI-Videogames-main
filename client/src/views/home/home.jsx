import CardsContainer from '../../components/CardsContainers/cardsContainers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../../components/redux/actions';
import Loader from '../../components/utils/loader/loader';
import style from './home.module.css';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() =>{
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    },[]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogames())
    },[dispatch]);



    return (
        <>
        {loading ?(
            <Loader />
        ) : (
            <div className= {style.envelope} >
                <div className= {style.conatiner} >
                    <h1 className= {style.title} >Videogames</h1>
                    <CardsContainer />

                </div>

            </div>
        )}
       </>
    )
};

export default Home;