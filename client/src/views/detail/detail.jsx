import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVideogame } from '../../components/redux/actions';
import Loader from '../../components/utils/loader/loader';
import style from './detail.module.css';

const Detail = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogame(id));
    }, [dispatch, id]);

    const videoGame = useSelector(state => state.videoGame)
    console.log(videoGame)


    return (

        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className={style.container} >
                        <div className={style.card} >
                            <h1 className={style.text} > {`${videoGame.name} Details`} </h1>
                            <h2 className={style.text} > {videoGame.id} </h2>
                            <img className={style.image} src={videoGame.background_image || videoGame.image} alt="image game" />

                            <div className={style.text} >
                                <h2>Description</h2>
                                <article dangerouslySetInnerHTML={{ __html: videoGame.description }} />
                            </div>

                            <div className={style.card1} >
                                <div>
                                    <h2 className={style.text} >Platforms</h2>
                                    {videoGame.platform && (
                                        <ul className={style.text} >
                                            {videoGame.platform.map((platform, index) => (
                                                <li  key={index}>
                                                {platform} 
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div>
                                    <h2 className={style.text} >Genres</h2>
                                    {videoGame.genres && (
                                        <ul className={style.text} >
                                            {videoGame.genres.map((genres, index) => (
                                                <li key={index}>
                                                {genres}
                                                </li> 
                                            ))}
                                        </ul>
                                    )}
                                </div>

                               
                            </div>
                            <div>
                                    <p className={style.text} >Released date: {videoGame.released} </p>
                                    <p className={style.text} >Rating: {videoGame.rating} </p>
                                </div>

                            <div className={style.containerBtn} >
                                <Link to={"/home"}>
                                    <button className={style.button} >Home</button>
                                </Link>

                            </div>

                        </div>

                    </div>
                </>
            )}
        </>
    )
};

export default Detail;