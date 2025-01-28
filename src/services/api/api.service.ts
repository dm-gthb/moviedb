import { endpoints } from '../endpoints.service';
import {
  CreateListItemResponseBody as CreateListItemServerResponse,
  DeleteListItemResponseBody as DeleteListItemServerResponse,
  GetListItemsResponseBody as GetListItemsServerResponse,
  GetMovieCreditsResponseBody as GetMovieCreditsServerResponse,
  GetMovieDetailsResponseBody as GetMovieDetailsServerResponse,
  GetMovieItemsResponseBody as GetMovieItemsServerResponse,
  GetRecommendationsResponseBody as GetRecommendationsServerResponse,
  CreateRatingResponseBody as CreateRatingServerResponse,
  DeleteRatingResponseBody as DeleteRatingServerResponse,
  UpdateRatingResponseBody as UpdateRatingServerResponse,
  AuthResponseBody as AuthServerResponse,
  CreateListItemRequestBody,
  CreateRatingRequestBody,
  UpdateRatingRequestBody,
} from '../../mocks/handlers/types';
import {
  AddListItemParams,
  AddRatingParams,
  AuthResponse,
  CreateListItemResponse,
  CreateRatingResponse,
  DeleteListItemParams,
  DeleteListItemResponse,
  DeleteRatingParams,
  DeleteRatingResponse,
  GetListItemsResponse,
  GetMeParams,
  GetMovieCreditsResponse,
  GetMovieDetailsResponse,
  GetMovieListResponse,
  GetMovieRecommendationsResponse,
  UpdateRatingParams,
  UpdateRatingResponse,
} from './api.types.service';
import Adapter from './adapter.service';

type RequestConfig = {
  token?: string;
  headers?: { [key: string]: string };
  method?: string;
  body?: string;
};

const MOVIEDB_API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGVkOTFhY2ZkMWY0NGQwNTk0ZDgxNzQ0MTBjMjkyNiIsIm5iZiI6MTczMzc1NzM3Ny4yMywic3ViIjoiNjc1NzA5YzFhMThjYjg2OTVhZmQ5MTU2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9eDPF25L0SRXhujBE_5AYaevptn80f405k2v5Yeg_Wk';

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

  async getMe({ token }: GetMeParams): Promise<AuthResponse> {
    const authData: AuthServerResponse = await this.fetchData(endpoints.getMe(), {
      token,
    });
    return authData;
  }

  async searchMovies({ query }: { query: string }): Promise<GetMovieListResponse> {
    const rowData: GetMovieItemsServerResponse = await this.fetchData(
      `${endpoints.searchMovies()}?query=${query}`,
      { token: MOVIEDB_API_TOKEN },
    );
    return {
      page: rowData.page,
      results: rowData.results.map(Adapter.transformMovieItemServerData),
      totalPages: rowData.total_pages,
      totalResults: rowData.total_results,
    };
  }

  async getMovies(searchParams: URLSearchParams): Promise<GetMovieListResponse> {
    const rowData: GetMovieItemsServerResponse = await this.fetchData(
      `${endpoints.getMovies()}?${searchParams}`,
      { token: MOVIEDB_API_TOKEN },
    );
    return {
      page: rowData.page,
      results: rowData.results.map(Adapter.transformMovieItemServerData),
      totalPages: rowData.total_pages,
      totalResults: rowData.total_results,
    };
  }

  async getMovie({ movieId }: { movieId: string }): Promise<GetMovieDetailsResponse> {
    const rowData: GetMovieDetailsServerResponse = await this.fetchData(
      `${endpoints.getMovie(movieId)}`,
      { token: MOVIEDB_API_TOKEN },
    );
    return Adapter.transformMovieDetailsServerData(rowData);
  }

  async getMovieCredits({
    movieId,
  }: {
    movieId: string;
  }): Promise<GetMovieCreditsResponse> {
    const rowData: GetMovieCreditsServerResponse = await this.fetchData(
      `${endpoints.getMovieCredits(movieId)}`,
      { token: MOVIEDB_API_TOKEN },
    );
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
    const rowData: GetRecommendationsServerResponse = await this.fetchData(
      `${endpoints.getMovieRecommendations(movieId)}`,
      { token: MOVIEDB_API_TOKEN },
    );
    return {
      results: rowData.results.map(Adapter.transformMovieItemServerData),
    };
  }

  async getListItems({ token }: { token?: string }): Promise<GetListItemsResponse> {
    const listItems: GetListItemsServerResponse = await this.fetchData(
      `${endpoints.getListItems()}`,
      { token },
    );
    return listItems;
  }

  async addFavorite({
    token,
    movie,
  }: AddListItemParams): Promise<CreateListItemResponse> {
    const requestBody: CreateListItemRequestBody = { movie };
    const rowData: CreateListItemServerResponse = await this.fetchData(
      `${endpoints.addFavorite()}`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
        token,
      },
    );
    return { listItem: rowData.listItem };
  }

  async deleteFavorite({
    listItemId,
    token,
  }: DeleteListItemParams): Promise<DeleteListItemResponse> {
    const response: DeleteListItemServerResponse = await this.fetchData(
      `${endpoints.deleteFavorite(listItemId)}`,
      {
        method: 'DELETE',
        token,
      },
    );
    return response;
  }

  async addToWatchList({
    token,
    movie,
  }: AddListItemParams): Promise<CreateListItemResponse> {
    const requestBody: CreateListItemRequestBody = { movie };
    const rowData: CreateListItemServerResponse = await this.fetchData(
      `${endpoints.addToWatchlist()}`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
        token,
      },
    );
    return { listItem: rowData.listItem };
  }

  async deleteFromWatchlist({
    listItemId,
    token,
  }: DeleteListItemParams): Promise<DeleteListItemResponse> {
    const response: DeleteListItemServerResponse = await this.fetchData(
      `${endpoints.deleteFromWatchlist(listItemId)}`,
      {
        method: 'DELETE',
        token,
      },
    );
    return response;
  }

  async addRating({
    token,
    movie,
    rating,
  }: AddRatingParams): Promise<CreateRatingResponse> {
    const requestBody: CreateRatingRequestBody = { movie, rating };
    const rowData: CreateRatingServerResponse = await this.fetchData(
      `${endpoints.addRating()}`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
        token,
      },
    );

    return { rating: rowData.rating };
  }

  async updateRating({
    token,
    listItemId,
    rating,
  }: UpdateRatingParams): Promise<UpdateRatingResponse> {
    const requestBody: UpdateRatingRequestBody = { updates: { rating } };

    const rowData: UpdateRatingServerResponse = await this.fetchData(
      `${endpoints.updateRating(listItemId)}`,
      {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        token,
      },
    );

    return { rating: rowData.rating };
  }

  async deleteRating({
    listItemId,
    token,
  }: DeleteRatingParams): Promise<DeleteRatingResponse> {
    const response: DeleteRatingServerResponse = await this.fetchData(
      `${endpoints.deleteRating(listItemId)}`,
      {
        method: 'DELETE',
        token,
      },
    );
    return response;
  }
}

export default new API();
