import React, { useState, useEffect } from 'react';
import "./Row.css";
const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isTrending }) {

    const [movies, setMovies] = useState([]);

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
    }, [fetchUrl])


    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">

                {movies.map( movie => (
                    <img key={movie.id} className={`row_poster ${isTrending && "trending_poster"}`} src={`${base_url}${isTrending ? movie.poster_path : movie.backdrop_path}`} alt={movie.title} />
                ))}
            </div>
        </div>
    )
}

export default Row
