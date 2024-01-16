import style from './searchBar.module.css';

const SearchBar = () => {

    return (
        <div className= {style.container} >
            <form >
                <input type="search" placeholder='Search...' />
                <button type='submit' className= {style.button} >GO</button>
            </form>
        </div>
    )
};

export default SearchBar;