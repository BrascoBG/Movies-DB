import React, { useEffect, useState } from 'react';
import axios from '../axios';
import styles from './Row.module.css';

const Row = ({title, fetchUrl}) => {
    const [movies, setMovies] = useState([]);
    const baseUrl = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        axios.get(fetchUrl)
        .then(response => setMovies(response.data.results))
        .catch(err => console.log(err))
    }, [fetchUrl])
    console.log(movies)
    return(
        <div className="row">
            <h1>{title}</h1>
            <div className={styles.row_posters}>
            {movies.map(movie => (
                <img key={movie.id} className={styles.row_poster} src={`${baseUrl}${movie.poster_path}`} alt={movie.name} />
            ))}
            </div>
        </div>
    )
};

export default Row;