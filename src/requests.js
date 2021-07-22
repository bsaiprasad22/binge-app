const API_KEY = TMDB_API_KEY;

const requests = {
  fetchTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`,
  fetchAction: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
  fetchComedy: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
  fetchSciFi: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
  fetchSearch: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`,
};

export default requests;
