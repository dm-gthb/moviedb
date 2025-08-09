import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProviders } from '../../app-providers/app-providers';
import { MoviesGrid } from './movies-grid';
import { moviesData } from '../../../mocks/data/movies';

const meta: Meta<typeof MoviesGrid> = {
  title: 'Movies/MoviesGrid',
  component: MoviesGrid,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockMovies = moviesData.slice(0, 10).map((movie) => ({
  id: movie.id,
  title: movie.title,
  posterPath: movie.poster_path,
  backdropPath: movie.backdrop_path,
  releaseDate: movie.release_date,
  genreIds: movie.genre_ids,
  overview: movie.overview,
  originalLanguage: movie.original_language,
  originalTitle: movie.original_title,
  popularity: movie.popularity,
  voteAverage: movie.vote_average,
  voteCount: movie.vote_count,
}));

export const Default: Story = {
  args: {
    movies: mockMovies,
  },
};

export const Loading: Story = {
  args: {
    isPending: true,
  },
};
