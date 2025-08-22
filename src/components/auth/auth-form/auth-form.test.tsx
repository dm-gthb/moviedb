import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import { buildUserAuthData } from '../../../mocks/generate';
import { AuthForm } from './auth-form';

describe('AuthForm', () => {
  it('calls onSubmit with form data when submitted', async () => {
    const { email, password } = buildUserAuthData();
    const handleSubmit = vi.fn();

    render(<AuthForm type="login" onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    await userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      email,
      password,
    });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
