import React, { useState, useEffect } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";
function Row({ title, fetchUrl, isTrending }) {
  // const modal = document.getElementsByClassName("trailerBG")[0];

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(fetchUrl);
      // console.log(request);
      const data = await request.json();
      // console.log(request);
      // console.log(data);
      setMovies(data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  function showTrailer(movie) {
    movieTrailer(movie?.name || movie?.original_name || movie?.title || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        console.log(trailerUrl);
      })
      .catch((error) => console.log(error));
  }

  function hideModal() {
    setTrailerUrl("");
    console.log(trailerUrl);
  }

  const opts = {
    height: "585",
    width: "960",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            onClick={() => {
              showTrailer(movie);
            }}
            key={movie.id}
            className={`row_poster ${isTrending && "trending_poster"}`}
            src={`${base_url}${
              isTrending ? movie?.poster_path : movie?.backdrop_path
            }`}
            alt={movie.title}
          />
        ))}
        {trailerUrl && (
          <div onClick={() => hideModal()} className="trailerBG">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Row;
