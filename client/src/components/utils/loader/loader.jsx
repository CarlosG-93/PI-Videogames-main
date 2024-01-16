import style from './loader.module.css';

const Loader = () => {

    return (
        <div className={style.overlay} >
            <div className={style.container} >
                <div className={style.loader} >
                </div>
            </div>
        </div>
    )
};

export default Loader;