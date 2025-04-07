import {
  ServerMovieCredits,
  ServerMovieDetails,
  ServerMovieItem,
  ServerPerson,
} from './movies.api.types.service';
import {
  MovieItem,
  MovieDetails,
  MovieCredits,
  PersonDetails,
} from '../movies/movies.types.service';

export function transformMovieItemServerData(movie: ServerMovieItem): MovieItem {
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
    originalTitle: movie.original_title,
  };
}

export function transformMovieDetailsServerData(movie: ServerMovieDetails): MovieDetails {
  return {
    backdropPath: movie.backdrop_path,
    id: movie.id,
    originalLanguage: movie.original_language,
    originalTitle: movie.original_title,
    originCountry: movie.origin_country,
    overview: movie.overview,
    popularity: movie.popularity,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    title: movie.title,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    budget: movie.budget,
    genres: movie.genres,
    genreIds: movie.genres.map(({ id }) => id),
    homepage: movie.homepage,
    runtime: movie.runtime,
    status: movie.status,
  };
}

export function transformMovieCreditServerData(
  credits: ServerMovieCredits,
): MovieCredits {
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

export function transformPersonServerData(person: ServerPerson): PersonDetails {
  return {
    alsoKnownsAs: person.also_known_as,
    biography: person.biography,
    birthday: person.birthday,
    deathday: person.deathday,
    gender: person.gender,
    homepage: person.homepage,
    id: person.id,
    imdbId: person.imdb_id,
    knownForDepartment: person.known_for_department,
    name: person.name,
    placeOfBirth: person.place_of_birth,
    popularity: person.popularity,
    profilePath: person.profile_path,
  };
}

export function transformImageServerData(image: { file_path: string }): {
  filePath: string;
} {
  return {
    filePath: image.file_path,
  };
}
