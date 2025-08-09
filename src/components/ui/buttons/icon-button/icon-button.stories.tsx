import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  HeartIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import { IconButton } from './icon-button';
import { fn } from 'storybook/test';

const iconMap = {
  'Magnifying Glass': MagnifyingGlassIcon,
  'X Mark': XMarkIcon,
  Moon: MoonIcon,
  Sun: SunIcon,
  Heart: HeartIcon,
  Bookmark: BookmarkIcon,
};

const IconButtonWrapper = ({
  Icon: iconName,
  label,
  onClick,
  isDisabled,
  isFilled,
  isAlwaysOnDarkBg,
  buttonRef,
}: {
  Icon: string;
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
  isFilled?: boolean;
  isAlwaysOnDarkBg?: boolean;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}) => {
  const Icon = iconMap[iconName as keyof typeof iconMap];
  return (
    <IconButton
      Icon={Icon}
      label={label}
      onClick={onClick}
      isDisabled={isDisabled}
      isFilled={isFilled}
      isAlwaysOnDarkBg={isAlwaysOnDarkBg}
      buttonRef={buttonRef}
    />
  );
};

const meta = {
  title: 'UI/IconButton',
  component: IconButtonWrapper,
  argTypes: {
    Icon: {
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
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    isFilled: {
      control: 'boolean',
      description: 'Whether the icon is filled (shows filled icon instead of outline)',
    },
    isAlwaysOnDarkBg: {
      control: 'boolean',
      description: 'Whether the button is always displayed on a dark background',
    },
  },
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story, context) => {
      const { isAlwaysOnDarkBg } = context.args;

      if (isAlwaysOnDarkBg) {
        return (
          <div className="flex items-center bg-gray-950 p-4">
            <Story />
          </div>
        );
      }

      return (
        <div className="flex items-center p-4">
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof IconButtonWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Icon: 'Heart',
    label: 'Toggle favorite',
    isDisabled: false,
    isFilled: false,
    isAlwaysOnDarkBg: false,
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    isFilled: true,
  },
};

export const AlwaysOnDarkBackground: Story = {
  args: {
    ...Default.args,
    isAlwaysOnDarkBg: true,
  },
};
