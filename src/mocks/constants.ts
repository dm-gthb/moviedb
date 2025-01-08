const moviedbUrl = 'https://api.themoviedb.org/3';
const listsMockUrl = 'https://mock-lists-url';
const authMockUrl = 'https://mock-auth-url';

export const endpoints = {
  searchMovies: () => `${moviedbUrl}/search/movie`,
  getMovies: () => `${moviedbUrl}/discover/movie`,
  getMovie: (id: string) => `${moviedbUrl}/movie/${id}`,
  getMovieRecommendations: (id: string) => `${moviedbUrl}/movie/${id}/recommendations`,
  getMovieCredits: (id: string) => `${moviedbUrl}/movie/${id}/credits`,
  getMe: () => `${authMockUrl}/me`,
  login: () => `${authMockUrl}/login`,
  register: () => `${authMockUrl}/register`,
  addFavorite: () => `${listsMockUrl}/favorite`,
  deleteFavorite: (id: string) => `${listsMockUrl}/favorite/${id}`,
  addToWatchlist: () => `${listsMockUrl}/watchlist`,
  deleteFromWatchlist: (id: string) => `${listsMockUrl}/watchlist/${id}`,
  addRating: () => `${listsMockUrl}/rating`,
  updateRating: (id: string) => `${listsMockUrl}/rating/${id}`,
  deleteRating: (id: string) => `${listsMockUrl}/rating/${id}`,
  getListItems: () => `${listsMockUrl}/list-items`,
};

export const genresMap: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
