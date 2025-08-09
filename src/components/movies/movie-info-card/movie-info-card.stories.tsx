import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProviders } from '../../app-providers/app-providers';
import { MovieTeamCard } from '../movie-info-grid/movie-team-card';
import { MovieTechCard } from '../movie-info-grid/movie-tech-card';
import { Card, CardSection, CardAnchor, LoadingCard } from './movie-info-card';

const meta: Meta = {
  title: 'Movies/MovieInfoCard',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <AppProviders>
        <div className="max-w-md">
          <Story />
        </div>
      </AppProviders>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockTeamItems = [
  {
    jobTitle: 'Director',
    persons: [
      {
        id: 1,
        name: 'Christopher Nolan',
        profilePath: '/path/to/nolan.jpg',
        gender: 2,
        knownForDepartment: 'Directing',
        popularity: 8.5,
      },
      {
        id: 2,
        name: 'Emma Thomas',
        profilePath: '/path/to/thomas.jpg',
        gender: 1,
        knownForDepartment: 'Production',
        popularity: 7.2,
      },
    ],
  },
  {
    jobTitle: 'Writers',
    persons: [
      {
        id: 3,
        name: 'Christopher Nolan',
        profilePath: '/path/to/nolan.jpg',
        gender: 2,
        knownForDepartment: 'Writing',
        popularity: 8.5,
      },
      {
        id: 4,
        name: 'Jonathan Nolan',
        profilePath: '/path/to/jonathan.jpg',
        gender: 2,
        knownForDepartment: 'Writing',
        popularity: 7.8,
      },
    ],
  },
  {
    jobTitle: 'Starring',
    persons: [
      {
        id: 5,
        name: 'Cillian Murphy',
        profilePath: '/path/to/murphy.jpg',
        gender: 2,
        knownForDepartment: 'Acting',
        popularity: 9.1,
      },
      {
        id: 6,
        name: 'Emily Blunt',
        profilePath: '/path/to/blunt.jpg',
        gender: 1,
        knownForDepartment: 'Acting',
        popularity: 8.7,
      },
      {
        id: 7,
        name: 'Matt Damon',
        profilePath: '/path/to/damon.jpg',
        gender: 2,
        knownForDepartment: 'Acting',
        popularity: 8.9,
      },
      {
        id: 8,
        name: 'Robert Downey Jr.',
        profilePath: '/path/to/downey.jpg',
        gender: 2,
        knownForDepartment: 'Acting',
        popularity: 9.3,
      },
    ],
  },
];

const mockTechItems = [
  {
    title: 'Original Title',
    content: 'Oppenheimer',
  },
  {
    title: 'Original Language',
    content: 'English',
  },
  {
    title: 'Runtime',
    content: '180 min',
  },
  {
    title: 'Budget',
    content: '$100,000,000',
  },
  {
    title: 'Release Date',
    content: 'July 21, 2023',
  },
  {
    title: 'Homepage',
    content: 'https://www.oppenheimermovie.com',
    href: 'https://www.oppenheimermovie.com',
  },
];

const mockSpecsItems = [
  {
    title: 'Runtime',
    content: '180 min',
  },
  {
    title: 'Budget',
    content: '$100,000,000',
  },
  {
    title: 'Status',
    content: 'Released',
  },
  {
    title: 'Release Date',
    content: 'July 21, 2023',
  },
];

export const Team: Story = {
  render: () => <MovieTeamCard items={mockTeamItems} />,
};

export const Tech: Story = {
  render: () => <MovieTechCard items={mockTechItems} />,
};

export const Spec: Story = {
  render: () => <MovieTechCard items={mockSpecsItems} />,
};

export const Loading: Story = {
  render: () => <LoadingCard />,
};

export const CardWithLinks: Story = {
  render: () => (
    <Card>
      <CardSection title="External Link">
        <CardAnchor href="https://developer.themoviedb.org/docs/getting-started">
          https://www.example.com
        </CardAnchor>
      </CardSection>
      <CardSection title="Long Link That Will Be Truncated">
        <CardAnchor href="https://developer.themoviedb.org/docs/getting-started">
          https://www.will-be-truncated.com/very-long-example-of-a-link-that-will-be-truncated/very-long-example-of-a-link-that-will-be-truncated/very-long-example-of-a-link-that-will-be-truncated/very-long-example-of-a-link-that-will-be-truncated
        </CardAnchor>
      </CardSection>
    </Card>
  ),
};
