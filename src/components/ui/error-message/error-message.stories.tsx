import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorMessage } from './error-message';

const meta: Meta<typeof ErrorMessage> = {
  title: 'UI/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: new Error('Failed to load movies. Please try again later.'),
  },
};
