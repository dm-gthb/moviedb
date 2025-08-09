import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProviders } from '../../app-providers/app-providers';
import { MovieInfoGrid } from './movie-info-grid';

const meta: Meta<typeof MovieInfoGrid> = {
  title: 'Movies/MovieInfoGrid',
  component: MovieInfoGrid,
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

const mockCategorizedData = {
  general: [
    {
      title: 'Original Title',
      content: 'Oppenheimer',
    },
    {
      title: 'Original Language',
      content: 'English',
    },
    {
      title: 'Country',
      content: 'United States, United Kingdom',
    },
  ],
  team: [
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
      ],
    },
  ],
  specs: [
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
  ],
};

export const Default: Story = {
  args: {
    isLoading: false,
    dataItems: mockCategorizedData,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
