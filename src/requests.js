const API_KEY = `81d66b8e0cc89950c3aaf91b18832d52`;


const requests = {
    fetchTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`,
    fetchAction: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    fetchComedy: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    fetchSciFi: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
}

export default requests;