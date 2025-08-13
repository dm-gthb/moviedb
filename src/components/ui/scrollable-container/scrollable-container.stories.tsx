import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollableContainer } from './scrollable-container';

const meta: Meta<typeof ScrollableContainer> = {
  title: 'UI/ScrollableContainer',
  component: ScrollableContainer,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the scrollable region',
    },
    scrollStep: {
      control: { type: 'number' },
      description: 'Fraction of visible width to scroll per button click',
    },
    className: {
      control: 'text',
      description: 'Optional classNames applied to the scroll container',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <div className="w-full">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabel: 'Scrollable items',
    scrollStep: 0.8,
    className: 'border-b border-gray-200',
    children: (
      <div className="flex gap-4 py-3">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="w-[160px] shrink-0 rounded-md bg-gray-100 px-4 py-6 text-center text-sm text-gray-700"
          >
            Item {index + 1}
          </div>
        ))}
      </div>
    ),
  },
};
