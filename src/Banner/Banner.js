import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../request";
import styles from "./Banner.module.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <header
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles.banner_content}>
        <h1 className={styles.banner_title}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div>
          <button>Play</button>
          <button>My List</button>
        </div>
        <h1 className={styles.banner_desc}>{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className={styles.fade_grad}></div>
    </header>
  );
};

export default Banner;
