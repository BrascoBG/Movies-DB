import React, { useEffect, useState } from "react";
import netflix from "../assets/netflix.png";
import tmdb from "../assets/tmdb.svg";
import styles from "./Nav.module.css";

const Nav = () => {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`${styles.nav} ${show && styles.nav_black}`}>
      <img className={styles.nav_logo} src={netflix} alt="Netflix Logo" />
      <img className={styles.nav_avatar} src={tmdb} alt="Tmdb" />
    </div>
  );
};

export default Nav;
