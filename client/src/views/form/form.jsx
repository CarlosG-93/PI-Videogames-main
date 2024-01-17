import { useState } from "react";
import axios from 'axios';
import style from './form.module.css';

const Form = () => {

    const [form, setForm] = useState({
        name: "",
        description: "",
        platforms: "",
        image: "",
        released: "",
        rating: "",
        genre: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        platforms: "",
        image: "",
        released: "",
        rating: "",
        genre: ""
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value })
        validate({ ...form, [property]: value })
    }
    const validate = (form) => {
        let errors = {};
        if (!form.name) {
            errors = { ...errors, name: "Please input a videogame name." }
        } else {
            errors = { ...errors, name: "" }
        };

        if (!form.description) {
            errors = { ...errors, description: "Write a short description" }
        } else {
            errors = { ...errors, description: "" }
        };

        setErrors(errors);
    };
    const submitHandler = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/videogames", form)
            .then(res => alert(res))
            .catch(err => alert(err));
    };

    const handlerChangeGenre = (event) => {
        if (event.target.value === "0") return;

        if (state.genre.filter(genres => (genres.name === event.target.value)).length === 0) {
            let newType = { 'name': event.target.value };
            setState({
                ...state,
                genre: [...state.genre, newGenre]
            })

            setErrors(validate({
                ...state,
                genre: [...state.genre, newGenre]
            }, event.target.name));

            if (state.genre.length === 5 - 1) {
                event.target.disabled = true;
            }
        }
        event.target.value = '0';
    }


    return (
        <div className={style.container} >
            <div className={style.card} >
                <h1 className={style.text} >Create a new Videogame</h1>

                <form onSubmit={submitHandler} className= {style.form} >

                    <div>
                        <label className={style.text} > Game Title:</label>
                        <input type="text" value={form.name} onChange={changeHandler} name="name" />
                        {errors.name && <span className={style.text} > {errors.name} </span>}
                    </div>

                    <div>
                        <label className={style.text} > Short decription:</label>
                        <input type="textarea" value={form.description} onChange={changeHandler} name="description" />
                        {errors.description && <span className={style.text} > {errors.description} </span>}
                    </div>

                    <div>
                        <label className={style.text} > Platforms:</label>
                        <input type="text" value={form.platforms} onChange={changeHandler} name="platforms" />
                    </div>

                    <div>
                        <label className={style.text} > Image URL:</label>
                        <input type="text" value={form.image} onChange={changeHandler} name="image" />
                    </div>

                    <div>
                        <label className={style.text} > Released Date:</label>
                        <input type="date" value={form.released} onChange={changeHandler} name="released" />
                    </div>

                    <div>
                        <label className={style.text} >Rating: </label>
                        <select name="rating" value={form.rating} onChange={changeHandler}>
                            <option value="">-- Select rating --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div>
                        <label className={style.text} > Genres:</label>
                        <input type="text" value={form.genre} onChange={changeHandler} name="genre" />
                        <select defaultValue="0" name="genre" value={form.genre} onChange={handlerChangeGenre}>
                            <option value="0">-- Select Genres --</option>
                            {genre.map((genre, index) => (
                                <option key={index} value= {genre.name}> {genre.name[0].toUpperCase() + genre.name.slice(1)} </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button className={style.button} type="submit" > Submit</button>
                    </div>

                </form>

            </div>

        </div>
    )
};

export default Form;