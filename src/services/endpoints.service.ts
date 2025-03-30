const moviedbUrl = 'https://api.themoviedb.org/3';
const listsMockUrl = 'https://mock-lists-url';
const authMockUrl = 'https://mock-auth-url';

export const endpoints = {
  searchMovies: () => `${moviedbUrl}/search/movie`,
  getMovies: () => `${moviedbUrl}/discover/movie`,
  getMovie: (id: string) => `${moviedbUrl}/movie/${id}`,
  getMovieRecommendations: (id: string) => `${moviedbUrl}/movie/${id}/recommendations`,
  getMovieCredits: (id: string) => `${moviedbUrl}/movie/${id}/credits`,
  getMovieImages: (id: string) => `${moviedbUrl}/movie/${id}/images`,
  getPerson: (id: string) => `${moviedbUrl}/person/${id}`,
  getPersonMovieCredits: (id: string) => `${moviedbUrl}/person/${id}/movie_credits`,
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
