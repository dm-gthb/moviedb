const movies = (path: string) => `https://api.themoviedb.org/3/${path}`;
const auth = (path: string) =>
  `https://identitytoolkit.googleapis.com/v1/${path}?key=AIzaSyDoQkPmwJQEaunh4VT68poEGWSkjtqil2Y`;
const listItems = (path: string) =>
  `https://firestore.googleapis.com/v1/projects/moviedb-eb748/databases/(default)/documents${path}`;

export const endpoints = {
  getMe: () => `${auth('accounts:lookup')}`,
  login: () => `${auth('accounts:signInWithPassword')}`,
  register: () => `${auth('accounts:signUp')}`,
  searchMovies: () => `${movies(`search/movie`)}`,
  getMovies: () => `${movies(`discover/movie`)}`,
  getMovie: (id: string) => `${movies(`movie/${id}`)}`,
  getMovieRecommendations: (id: string) => `${movies(`movie/${id}/recommendations`)}`,
  getMovieCredits: (id: string) => `${movies(`movie/${id}/credits`)}`,
  getMovieImages: (id: string) => `${movies(`movie/${id}/images`)}`,
  getPerson: (id: string) => `${movies(`person/${id}`)}`,
  getPersonMovieCredits: (id: string) => `${movies(`person/${id}/movie_credits`)}`,
  getMovieListItems: (userId: string) => `${listItems(`/users/${userId}/movieLists`)}`,
  addMovieToList: (userId: string) => `${listItems(`/users/${userId}/movieLists`)}`,
  deleteMovieFromList: ({ userId, listItemId }: { userId: string; listItemId: string }) =>
    `${listItems(`/users/${userId}/movieLists/${listItemId}`)}`,
};
