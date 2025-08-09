import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextButton } from './text-button';
import { fn } from 'storybook/test';

const meta: Meta<typeof TextButton> = {
  title: 'UI/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
    onClick: fn(),
  },
};
