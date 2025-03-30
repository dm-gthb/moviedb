import { endpoints } from '../endpoints.service';
import {
  transformImageServerData,
  transformMovieCreditServerData,
  transformMovieDetailsServerData,
  transformMovieItemServerData,
  transformPersonServerData,
} from './api.adapter.service';
import {
  GetMovieCreditsResponse,
  GetMovieDetailsResponse,
  GetMoviesResponse,
  GetMovieImagesResponse,
  GetPersonMovieCreditsResponse,
  GetPersonDetailsResponse,
} from './api.types.service';

export async function searchMovies({
  query,
}: {
  query: string;
}): Promise<GetMoviesResponse> {
  const rowData = await fetchData(`${endpoints.searchMovies()}?query=${query}`);
  return {
    page: rowData.page,
    results: rowData.results.map(transformMovieItemServerData),
    totalPages: rowData.total_pages,
    totalResults: rowData.total_results,
  };
}

export async function getMovies(
  searchParams: URLSearchParams,
): Promise<GetMoviesResponse> {
  const rowData = await fetchData(`${endpoints.getMovies()}?${searchParams}`);
  return {
    page: rowData.page,
    results: rowData.results.map(transformMovieItemServerData),
    totalPages: rowData.total_pages,
    totalResults: rowData.total_results,
  };
}

export async function getMovie({
  movieId,
}: {
  movieId: string;
}): Promise<GetMovieDetailsResponse> {
  const rowData = await fetchData(`${endpoints.getMovie(movieId)}`);
  return transformMovieDetailsServerData(rowData);
}

export async function getMovieCredits({
  movieId,
}: {
  movieId: string;
}): Promise<GetMovieCreditsResponse> {
  const rowData = await fetchData(`${endpoints.getMovieCredits(movieId)}`);
  return {
    id: rowData.id,
    ...transformMovieCreditServerData(rowData),
  };
}

export async function getMovieImages({
  movieId,
}: {
  movieId: string;
}): Promise<GetMovieImagesResponse> {
  const rowData = await fetchData(`${endpoints.getMovieImages(movieId)}`);
  return {
    backdrops: rowData.backdrops.map(transformImageServerData),
    logos: rowData.logos.map(transformImageServerData),
    posters: rowData.posters.map(transformImageServerData),
  };
}

export async function getPerson({
  personId,
}: {
  personId: string;
}): Promise<GetPersonDetailsResponse> {
  const rowData = await fetchData(`${endpoints.getPerson(personId)}`);
  return transformPersonServerData(rowData);
}

export async function getPersonMovieCredits({
  personId,
}: {
  personId: string;
}): Promise<GetPersonMovieCreditsResponse> {
  const rowData = await fetchData(`${endpoints.getPersonMovieCredits(personId)}`);
  return {
    cast: rowData.cast.map(transformMovieItemServerData),
    crew: rowData.crew.map(transformMovieItemServerData),
  };
}

async function fetchData(url: string) {
  const TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGVkOTFhY2ZkMWY0NGQwNTk0ZDgxNzQ0MTBjMjkyNiIsIm5iZiI6MTczMzc1NzM3Ny4yMywic3ViIjoiNjc1NzA5YzFhMThjYjg2OTVhZmQ5MTU2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9eDPF25L0SRXhujBE_5AYaevptn80f405k2v5Yeg_Wk';

  try {
    const res = await fetch(`${url}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!res.ok) {
      throw new Error(`fetch error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
