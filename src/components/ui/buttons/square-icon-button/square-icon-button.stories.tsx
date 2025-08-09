import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { SquareIconButton } from './square-icon-button';
import { fn } from 'storybook/test';

const meta: Meta<typeof SquareIconButton> = {
  title: 'UI/SquareIconButton',
  component: SquareIconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Icon: ArrowRightIcon,
    label: 'Submit',
    onClick: fn(),
    isDisabled: false,
  },
};
