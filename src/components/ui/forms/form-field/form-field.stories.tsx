import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './form-field';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const meta: Meta<typeof FormField> = {
  title: 'UI/Forms/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelProps: {
      children: 'Example Label',
    },
    inputProps: {
      type: 'text',
      placeholder: 'Enter text...',
    },
    errors: [],
    className: '',
  },
};

export const WithoutLabel: Story = {
  args: {
    ...Default.args,
    labelProps: {},
  },
};

export const WithCustomStyles: Story = {
  args: {
    className: 'flex flex-col gap-1',
    labelProps: {
      children: 'Search for movies by their original, translated and alternative titles.',
      className: 'order-2 text-center text-lime-700',
    },
    inputProps: {
      type: 'search',
      placeholder: 'Search...',
      className:
        'border-lime-300 rounded-2xl placeholder:text-lime-700 outline-green-700 text-lime-700',
    },
    isReserveErrorSpace: false,
  },
};

export const WithErrors: Story = {
  args: {
    ...Default.args,
    errors: ['Error message', 'Error message 2'],
  },
};

export const WithPasswordVisibilityToggler: Story = {
  decorators: [
    (Story) => {
      const [isPasswordVisible, setIsPasswordVisible] = useState(false);
      const [inputType, setInputType] = useState<'password' | 'text'>('password');

      const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
        setInputType(isPasswordVisible ? 'password' : 'text');
      };

      return (
        <Story
          args={{
            inputProps: {
              type: inputType,
              placeholder: 'Enter your password',
            },
            endAdornment: (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 transition hover:text-gray-950 disabled:hover:text-gray-400 dark:text-gray-300 dark:hover:text-white disabled:dark:text-gray-300 disabled:dark:hover:text-gray-300"
                aria-label="Toggle password visibility"
              >
                {isPasswordVisible ? (
                  <EyeSlashIcon width={24} height={24} strokeWidth={2} />
                ) : (
                  <EyeIcon width={24} height={24} strokeWidth={2} />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </button>
            ),
          }}
        />
      );
    },
  ],
  args: {
    labelProps: {
      children: 'Password',
    },
    inputProps: {
      type: 'password',
      placeholder: 'Enter your password',
    },
  },
};
