import { Link } from 'react-router-dom';
import SearchBar from '../utils/searchBar/searchBar';
import style from './navBar.module.css';

const NavBar = () => {

    return (
        <div className= {style.envelope} >
            <div className= {style.container} >
                <SearchBar className = {style.SearchBar} />
                <Link to={"/home"}>
                    <button className= {style.button} >Home</button>
                </Link>
                <div></div>
                <Link to={"/form"}>
                    <button className= {style.button} >Create Videogame</button>
                </Link>

                <button>A-Z</button>
            </div>

        </div>
    )
};

export default NavBar;