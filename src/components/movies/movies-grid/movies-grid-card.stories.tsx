import type { Meta, StoryObj } from '@storybook/react-vite';
import { MovieCard, PlaceholderMovieCard } from './movies-grid-card';
import type { MovieItem } from '../../../services/movies/movies.types.service';
import { AppProviders } from '../../app-providers/app-providers';

const meta: Meta<typeof MovieCard> = {
  title: 'Movies/MoviesGridCard',
  component: MovieCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <AppProviders>
          <div className="w-64">
            <Story />
          </div>
        </AppProviders>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMovie: MovieItem = {
  id: 550,
  title: 'Fight Club',
  posterPath: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  backdropPath: '/52AfXWuXCHn3UjD17rBruA9f5qb.jpg',
  releaseDate: '1999-10-15',
  genreIds: [18, 53],
  overview:
    'A ticking-time-bomb insomniac and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
  voteAverage: 8.8,
  voteCount: 26280,
  popularity: 150.5,
  originalLanguage: 'en',
  originalTitle: 'Fight Club',
};

export const Default: Story = {
  args: {
    movie: sampleMovie,
  },
};

export const MovieWithoutPoster: Story = {
  args: {
    movie: { ...sampleMovie, posterPath: null },
  },
};

export const Placeholder: Story = {
  render: () => <PlaceholderMovieCard />,
};
