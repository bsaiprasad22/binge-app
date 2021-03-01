import React, { useEffect, useState } from "react";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(requests.fetchTrending);
      const data = await request.json();
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)] ||
          data.results[5]
      );
    }
    fetchData();
  }, []);

  // console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_content">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h2 className="banner_description">{truncate(movie?.overview, 300)}</h2>
      </div>

      <div className="fade_bottom"></div>
    </header>
  );
}

export default Banner;
