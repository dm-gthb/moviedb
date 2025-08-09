import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { HeartIcon, BookmarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { CircularIconButton } from './circular-icon-button';

const iconMap = {
  Heart: HeartIcon,
  Bookmark: BookmarkIcon,
  Photo: PhotoIcon,
};

const CircularIconButtonWrapper = ({
  icon: iconName,
  label,
  onClick,
  isFilled,
  isDisabled,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  isFilled?: boolean;
  isDisabled?: boolean;
}) => {
  const Icon = iconMap[iconName as keyof typeof iconMap];
  return (
    <CircularIconButton
      icon={Icon}
      label={label}
      onClick={onClick}
      isFilled={isFilled}
      isDisabled={isDisabled}
    />
  );
};

const meta = {
  title: 'UI/CircularIconButton',
  component: CircularIconButtonWrapper,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(iconMap),
      description: 'The icon to display in the button',
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function when button is clicked',
    },
    isFilled: {
      control: 'boolean',
      description: 'Whether the icon is filled (shows filled icon instead of outline)',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof CircularIconButtonWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'Heart',
    label: 'Add to favorites',
    isDisabled: false,
    isFilled: false,
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    label: 'Remove from favorites',
    isFilled: true,
  },
};
