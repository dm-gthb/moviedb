import { endpoints } from '../endpoints.service';
import {
  GetMovieCreditsResponse,
  GetMovieDetailsResponse,
  GetMoviesResponse,
  GetMovieRecommendationsResponse,
  GetMovieImagesResponse,
  GetPersonMovieCreditsResponse,
  GetPersonDetailsResponse,
} from './api.types.service';
import Adapter from './adapter.service';

const MOVIEDB_API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGVkOTFhY2ZkMWY0NGQwNTk0ZDgxNzQ0MTBjMjkyNiIsIm5iZiI6MTczMzc1NzM3Ny4yMywic3ViIjoiNjc1NzA5YzFhMThjYjg2OTVhZmQ5MTU2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9eDPF25L0SRXhujBE_5AYaevptn80f405k2v5Yeg_Wk';

type RequestConfig = {
  token?: string;
  headers?: { [key: string]: string };
  method?: string;
  body?: string;
};

class API {
  protected async fetchData(url: string, requestConfig: RequestConfig = {}) {
    const { token, headers: customHeaders, ...customConfig } = requestConfig;

    const config: RequestConfig = {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      },
      ...customConfig,
    };

    try {
      const res = await fetch(`${url}`, config);

      if (!res.ok) {
        throw new Error(`fetch error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async searchMovies({ query }: { query: string }): Promise<GetMoviesResponse> {
    const rowData = await this.fetchData(`${endpoints.searchMovies()}?query=${query}`, {
      token: MOVIEDB_API_TOKEN,
    });
    return {
      page: rowData.page,
      results: rowData.results.map(Adapter.transformMovieItemServerData),
      totalPages: rowData.total_pages,
      totalResults: rowData.total_results,
    };
  }

  async getMovies(searchParams: URLSearchParams): Promise<GetMoviesResponse> {
    const rowData = await this.fetchData(`${endpoints.getMovies()}?${searchParams}`, {
      token: MOVIEDB_API_TOKEN,
    });
    return {
      page: rowData.page,
      results: rowData.results.map(Adapter.transformMovieItemServerData),
      totalPages: rowData.total_pages,
      totalResults: rowData.total_results,
    };
  }

  async getMovie({ movieId }: { movieId: string }): Promise<GetMovieDetailsResponse> {
    const rowData = await this.fetchData(`${endpoints.getMovie(movieId)}`, {
      token: MOVIEDB_API_TOKEN,
    });
    return Adapter.transformMovieDetailsServerData(rowData);
  }

  async getMovieCredits({
    movieId,
  }: {
    movieId: string;
  }): Promise<GetMovieCreditsResponse> {
    const rowData = await this.fetchData(`${endpoints.getMovieCredits(movieId)}`, {
      token: MOVIEDB_API_TOKEN,
    });
    return {
      id: rowData.id,
      ...Adapter.transformMovieCreditServerData(rowData),
    };
  }

  async getMovieRecommendations({
    movieId,
  }: {
    movieId: string;
  }): Promise<GetMovieRecommendationsResponse> {
    const rowData = await this.fetchData(
      `${endpoints.getMovieRecommendations(movieId)}`,
      { token: MOVIEDB_API_TOKEN },
    );
    return {
      results: rowData.results.map(Adapter.transformMovieItemServerData),
    };
  }

  async getPerson({ personId }: { personId: string }): Promise<GetPersonDetailsResponse> {
    const rowData = await this.fetchData(`${endpoints.getPerson(personId)}`, {
      token: MOVIEDB_API_TOKEN,
    });
    return Adapter.transformPersonServerData(rowData);
  }

  async getPersonMovieCredits({
    personId,
  }: {
    personId: string;
  }): Promise<GetPersonMovieCreditsResponse> {
    const rowData = await this.fetchData(`${endpoints.getPersonMovieCredits(personId)}`, {
      token: MOVIEDB_API_TOKEN,
    });
    return {
      cast: rowData.cast.map(Adapter.transformMovieItemServerData),
      crew: rowData.crew.map(Adapter.transformMovieItemServerData),
    };
  }

  async getMovieImages({
    movieId,
  }: {
    movieId: string;
  }): Promise<GetMovieImagesResponse> {
    const rowData = await this.fetchData(`${endpoints.getMovieImages(movieId)}`, {
      token: MOVIEDB_API_TOKEN,
    });

    return {
      backdrops: rowData.backdrops.map(Adapter.transformImageServerData),
      logos: rowData.logos.map(Adapter.transformImageServerData),
      posters: rowData.posters.map(Adapter.transformImageServerData),
    };
  }
}

export default new API();
