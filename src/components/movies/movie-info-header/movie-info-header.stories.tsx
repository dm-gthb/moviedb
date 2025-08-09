import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProviders } from '../../app-providers/app-providers';
import { MovieInfoHeader } from './movie-info-header';

const meta: Meta<typeof MovieInfoHeader> = {
  title: 'Movies/MovieInfoHeader',
  component: MovieInfoHeader,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <AppProviders>
        <div className="min-h-screen w-full bg-gray-600 p-6 dark:bg-black">
          <div className="mx-auto max-w-4xl">
            <Story />
          </div>
        </div>
      </AppProviders>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockMovie = {
  id: 4,
  title: 'Movie Title',
  releaseDate: '2022-12-10',
  genreIds: [12, 14, 18],
  backdropPath: '/mock-backdrop-4.jpg',
  posterPath: '/mock-poster-4.jpg',
  overview: 'A sample movie with a very long title to test text wrapping and layout.',
  originalLanguage: 'en',
  originalTitle: 'This Is a Very Long Movie Title',
  popularity: 85.0,
  voteAverage: 8.0,
  voteCount: 1200,
  budget: 15000000,
  genres: [
    { id: 12, name: 'Adventure' },
    { id: 14, name: 'Fantasy' },
    { id: 18, name: 'Drama' },
  ],
  homepage: 'https://example.com',
  runtime: 135,
  status: 'Released',
  originCountry: ['US'],
};

export const Default: Story = {
  args: {
    movie: mockMovie,
    isLink: false,
  },
};

export const WithLink: Story = {
  args: {
    movie: mockMovie,
    isLink: true,
  },
};

export const WithoutGenres: Story = {
  args: {
    movie: { ...mockMovie, genreIds: [] },
    isLink: false,
  },
};

export const WithoutReleaseDate: Story = {
  args: {
    movie: { ...mockMovie, releaseDate: '' },
    isLink: false,
  },
};

export const LongTitle: Story = {
  args: {
    movie: { ...mockMovie, title: 'This Is a Very Long Movie Title' },
    isLink: false,
  },
};

export const SingleGenre: Story = {
  args: {
    movie: {
      ...mockMovie,
      genreIds: [18],
      genres: [{ id: 18, name: 'Drama' }],
    },
    isLink: false,
  },
};
