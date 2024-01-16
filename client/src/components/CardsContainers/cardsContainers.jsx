import Card from '../Card/card';
import { useSelector } from 'react-redux';
import style from './cardsContainers.module.css';

const CardsContainers = () => {
    const videoGames = useSelector(state => state.videoGames);

    return (
        <div className={style.container} >
            {videoGames.map(videoGames => {
                return <Card
                    id={videoGames.id}
                    name={videoGames.name}
                    image={videoGames.image}
                    released={videoGames.released}
                    rating={videoGames.rating}
                />
            })}
        </div>
    )
};

export default CardsContainers;