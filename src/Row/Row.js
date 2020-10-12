import React, { useEffect, useState } from 'react';
import axios from '../axios';
import styles from './Row.module.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([]);
    const [trailerURL, setTrailerUrl] = useState("")
    const baseUrl = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        axios.get(fetchUrl)
        .then(response => setMovies(response.data.results))
        .catch(err => console.log(err))
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        },
    };

    const handleClick = (movie) => {
        if(trailerURL){
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch(err => console.log(err))
        }
    }
    
    return(
        <div className={styles.row}>
            <h1>{title}</h1>
            <div className={styles.row_posters}>
            {movies.map(movie => (
                <img 
                onClick={() => handleClick(movie)}
                key={movie.id} 
                className={`${styles.row_poster} ${isLargeRow && styles.row_poster_large}`} 
                src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name} 
                />
            ))}
            </div>
            {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
        </div>
    )
};

export default Row;