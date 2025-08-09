import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'UI/Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'example',
    type: 'text',
    placeholder: 'Enter text...',
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    value: 'Already filled text',
  },
};

export const WithCustomStyles: Story = {
  args: {
    ...Default.args,
    className:
      'border-2 border-lime-500 rounded-2xl placeholder:text-lime-600 outline-green-700 text-lime-700',
  },
};
