import {
  MovieItem as ServerMovieItem,
  MovieDetails as ServerMovieDetails,
  MovieCredits as ServerMovieCredits,
} from '../../mocks/types/movie';
import { MovieItem, MovieDetails, MovieCredits } from '../movies/movies.types.service';

export default class Adapter {
  static transformMovieItemServerData(movie: ServerMovieItem): MovieItem {
    return {
      backdropPath: movie.backdrop_path,
      id: movie.id,
      originalLanguage: movie.original_language,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      genreIds: movie.genre_ids,
    };
  }

  static transformMovieDetailsServerData(movie: ServerMovieDetails): MovieDetails {
    return {
      backdropPath: movie.backdrop_path,
      id: movie.id,
      originalLanguage: movie.original_language,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      budget: movie.budget,
      genres: movie.genres,
      homepage: movie.homepage,
      runtime: movie.runtime,
      status: movie.status,
    };
  }

  static transformMovieCreditServerData(credits: ServerMovieCredits): MovieCredits {
    return {
      cast: credits.cast.map((cast) => ({
        gender: cast.gender,
        id: cast.id,
        knownForDepartment: cast.known_for_department,
        name: cast.name,
        originalName: cast.original_name,
        popularity: cast.popularity,
        profilePath: cast.profile_path,
        castId: cast.cast_id,
        character: cast.character,
        creditId: cast.credit_id,
        order: cast.order,
      })),
      crew: credits.crew.map((crew) => ({
        adult: crew.adult,
        gender: crew.gender,
        id: crew.id,
        knownForDepartment: crew.known_for_department,
        name: crew.name,
        originalName: crew.original_name,
        popularity: crew.popularity,
        profilePath: crew.profile_path,
        creditId: crew.credit_id,
        department: crew.department,
        job: crew.job,
      })),
    };
  }
}
