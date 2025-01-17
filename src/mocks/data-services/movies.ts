import { moviesData } from '../data/movies';
import { generateMockDetails } from '../generate';
import { BaseMovieData, MovieDetails, MovieItem } from '../types/movie';

let movies = moviesData.map((movieItem) => ({
  ...movieItem,
  ...generateMockDetails(movieItem),
}));

export async function read(movieId: number): Promise<MovieItem | undefined> {
  const movie = movies.find((movie) => movie.id === movieId);
  return movie ? { ...getBaseItem(movie), genre_ids: movie.genre_ids } : undefined;
}

export async function readWithDetails(
  movieId: number,
): Promise<MovieDetails | undefined> {
  const movie = movies.find((movie) => movie.id === movieId);
  if (!movie) {
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { genre_ids, ...movieDetails } = movie;
  return movieDetails;
}

export async function create(movie: MovieItem & MovieDetails) {
  movies.push(movie);
  return movie;
}

export async function readMany({
  sortBy,
  genre,
  year,
  releaseDateGte,
  releaseDateLte,
}: {
  sortBy: string;
  genre?: string;
  year?: string;
  releaseDateGte?: string;
  releaseDateLte?: string;
}) {
  let result = [...movies];

  if (genre) {
    result = result.filter((movie) => movie.genre_ids.includes(+genre));
  }

  if (year) {
    result = result.filter(
      (movie) => new Date(movie.release_date).getFullYear() === +year,
    );
  }

  if (releaseDateGte) {
    result = result.filter(
      (movie) => new Date(movie.release_date) > new Date(releaseDateGte),
    );
  }

  if (releaseDateLte) {
    result = result.filter(
      (movie) => new Date(movie.release_date) < new Date(releaseDateLte),
    );
  }

  const compareBy =
    (
      prop: 'popularity' | 'vote_count' | 'release_date' | 'title',
      order: 'desc' | 'asc',
    ) =>
    (a: MovieItem, b: MovieItem) => {
      const value1 = prop === 'release_date' ? new Date(a[prop]) : a[prop];
      const value2 = prop === 'release_date' ? new Date(b[prop]) : b[prop];
      return (
        (value1 < value2 ? -1 : value1 > value2 ? 1 : 0) * (order === 'asc' ? 1 : -1)
      );
    };

  switch (sortBy) {
    case 'popularity.desc':
      result.sort(compareBy('popularity', 'desc'));
      return result;
    case 'vote_count.desc':
      result.sort(compareBy('vote_count', 'desc'));
      return result;
    case 'primary_release_date.desc':
      result.sort(compareBy('release_date', 'desc'));
      return result;
    case 'title.asc':
      result.sort(compareBy('title', 'asc'));
      return result;
    default:
      return result;
  }
}

export async function query(search: string) {
  return movies.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
}

export async function reset() {
  movies = [];
}

function getBaseItem(movie: MovieItem & MovieDetails): BaseMovieData {
  return {
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    id: movie.id,
    original_language: movie.original_language,
    original_title: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    title: movie.title,
    video: movie.video,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
  };
}
