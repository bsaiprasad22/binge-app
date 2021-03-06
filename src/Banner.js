import React, { useEffect, useState } from "react";
import requests from "./requests";
import "./Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

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

  let wdth = String(Math.min(window.innerWidth * 0.9, 960));

  const opts = {
    width: wdth,
    height: wdth / 1.641,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  function showTrailer(movie) {
    movieTrailer(movie?.name || movie?.original_name || movie?.title || "", {
      id: true,
    }).then((videoId) => {
      setTrailerUrl(videoId);
    });
  }

  function hideModal() {
    setTrailerUrl("");
  }

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
          <button
            className="banner_button"
            onClick={() => {
              showTrailer(movie);
            }}
          >
            Play
          </button>
          <a href="#explore">
            <button className="banner_button">Explore</button>
          </a>
          {trailerUrl && (
            <div className="trailerbg" onClick={() => hideModal()}>
              <YouTube videoId={trailerUrl} opts={opts} />
            </div>
          )}
        </div>

        <h2 className="banner_description">{truncate(movie?.overview, 200)}</h2>
      </div>

      <div className="fade_bottom" id="explore"></div>
    </header>
  );
}

export default Banner;
