import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './select';

const meta: Meta<typeof Select> = {
  title: 'UI/Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'genre',
    value: 'action',
    'aria-label': 'Movie genre',
    children: [
      <option key="action" value="action">
        Action
      </option>,
      <option key="comedy" value="comedy">
        Comedy
      </option>,
      <option key="drama" value="drama">
        Drama
      </option>,
      <option key="horror" value="horror">
        Horror
      </option>,
    ],
  },
};
