import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoviePoster } from './movie-poster';

const meta: Meta<typeof MoviePoster> = {
  title: 'Movies/MoviePoster',
  component: MoviePoster,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="aspect-[2/3] w-[250px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPoster: Story = {
  args: {
    posterPath: 'oYSEPp5uyXZ0UXNhTGQtwvGUGKC.jpg',
    movieTitle: 'The White Diamond',
  },
};

export const WithoutPoster: Story = {
  args: {
    ...WithPoster.args,
    posterPath: null,
  },
};
