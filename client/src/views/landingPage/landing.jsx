import { Link } from 'react-router-dom'
import style from './landing.module.css'

const Landing = () => {

    return (
        <div className={style.divOpen}>
            <div className={style.divButton}>
                <Link className={style.link} to={'/home'}>
                    <button>ENTRAR</button>
                </Link>
            </div>
        </div>
    )
};

export default Landing;