import React, { useEffect, useState } from 'react';
import axios from '../axios';
import styles from './Row.module.css';

const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([]);
    const baseUrl = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        axios.get(fetchUrl)
        .then(response => setMovies(response.data.results))
        .catch(err => console.log(err))
    }, [fetchUrl])
    
    return(
        <div className={styles.row}>
            <h1>{title}</h1>
            <div className={styles.row_posters}>
            {movies.map(movie => (
                <img 
                key={movie.id} 
                className={`${styles.row_poster} ${isLargeRow && styles.row_poster_large}`} 
                src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name} 
                />
            ))}
            </div>
        </div>
    )
};

export default Row;