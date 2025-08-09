import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormErrors } from './form-errors';

const meta: Meta<typeof FormErrors> = {
  title: 'UI/Forms/FormErrors',
  component: FormErrors,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errors: ['This field is required'],
  },
};

export const WithMultipleErrors: Story = {
  args: {
    errors: ['This field is required', 'Please enter a valid email address'],
  },
};
