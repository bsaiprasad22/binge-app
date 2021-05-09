import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Search.css";
import requests from "./requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original";

function Search({ isTrending = true }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [show, setShow] = useState(true);
  const inputRef = useRef(null);

  function showTrailer(movie) {
    movieTrailer(null, { tmdbId: movie.id })
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

  let wdth = String(Math.min(window.innerWidth * 0.9, 960));

  const opts = {
    height: wdth / 1.641,
    width: wdth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      if (searchQuery !== "") {
        const response = await fetch(
          `${requests.fetchSearch}&query=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data.results);
        if (searchResults.length === 0) setShow(true);
        else setShow(false);
      } else {
        setSearchResults([]);
        setShow(true);
      }
    }

    fetchData();
  }, [searchQuery, searchResults.length]);

  useEffect(() => {
    inputRef.current.focus();
  });

  const editSearchTerm = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div>
        <nav>
          <Link to="/">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="arrow-left"
            ></FontAwesomeIcon>
          </Link>
          <input
            type="text"
            id="search"
            name="search"
            className="navbar_search"
            placeholder="Search.."
            autoComplete="off"
            ref={inputRef}
            onChange={editSearchTerm}
          ></input>
        </nav>
      </div>
      <div className="search_results">
        {show && <div className="empty-results">Nothing to show :(</div>}
        {searchResults.map((movie) => (
          <img
            onClick={() => {
              showTrailer(movie);
            }}
            key={movie.id}
            className={`search_poster ${
              isTrending && "trending_search_poster"
            }`}
            src={`${base_url}${
              isTrending ? movie?.poster_path : movie?.backdrop_path
            }`}
            alt={movie.title}
          />
        ))}
        {trailerUrl && (
          <div onClick={hideModal} className="trailerBG_search">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
