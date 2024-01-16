import { Link } from 'react-router-dom';
import style from './card.module.css';

const Card = (props) => {
    const id = props.id;

    return (
        <div className={style.container} >
            <Link to={`/detail/${id}`}>
                <button className={style.button} > {props.name} </button>
            </Link>
            <img className={style.image} src={props.image} alt="videogame" />
            <p className={style.text} >Release date: {props.released} </p>
            <p className={style.text}>Rating: {props.rating} </p>
        </div>
    )
};

export default Card;