import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'UI/Forms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Example Label',
  },
};

export const WithCustomStyles: Story = {
  args: {
    ...Default.args,
    className: 'font-bold text-2xl',
  },
};
