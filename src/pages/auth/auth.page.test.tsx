import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import App from '../../app';
import { renderWithProviders, waitForLoadingToFinish } from '../../mocks/app-test-utils';
import { appRoute } from '../../services/router.service';
import { buildUserAuthData } from '../../mocks/generate';
import * as userDataService from '../../mocks/data-services/user';
import { server } from '../../mocks/server/test-server';
import { AuthRequestBody } from '../../mocks/handlers/types';

test('navigates to root route on success login', async () => {
  await renderWithProviders(<App />, { route: appRoute.auth });

  const userAuthData = buildUserAuthData();
  await userDataService.create(userAuthData);

  const emailInputEl = screen.getByLabelText(/email/i);
  const passwordInputEl = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /log in/i });

  await userEvent.type(emailInputEl, userAuthData.email);
  await userEvent.type(passwordInputEl, userAuthData.password);
  await userEvent.click(submitButton);
  await waitForLoadingToFinish();

  expect(
    await screen.findByRole('heading', { name: /discover movies/i }),
  ).toBeInTheDocument();
});

test('navigates to root route on success signup', async () => {
  await renderWithProviders(<App />, { route: appRoute.auth });
  await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

  const { email, password } = buildUserAuthData();

  const emailInputEl = screen.getByLabelText(/email/i);
  const passwordInputEl = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign up/i });

  await userEvent.type(emailInputEl, email);
  await userEvent.type(passwordInputEl, password);
  await userEvent.click(submitButton);
  await waitForLoadingToFinish();

  expect(
    await screen.findByRole('heading', { name: /discover movies/i }),
  ).toBeInTheDocument();
});

test('shows error when provided invalid login credentials', async () => {
  await renderWithProviders(<App />, { route: appRoute.auth });

  const userAuthData = buildUserAuthData();
  await userDataService.create(userAuthData);

  const emailInputEl = screen.getByLabelText(/email/i);
  const passwordInputEl = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /log in/i });

  await userEvent.type(emailInputEl, userAuthData.email);
  await userEvent.type(passwordInputEl, 'incorrect password');
  await userEvent.click(submitButton);
  await waitForLoadingToFinish();

  expect(screen.getByRole('alert')).toHaveTextContent(/authentication failed/i);
});

test('shows error when provided invalid signup credentials', async () => {
  await renderWithProviders(<App />, { route: appRoute.auth });
  const userAuthData = buildUserAuthData();
  await userDataService.create(userAuthData);

  await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

  const emailInputEl = screen.getByLabelText(/email/i);
  const passwordInputEl = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign up/i });

  await userEvent.type(emailInputEl, userAuthData.email);
  await userEvent.type(passwordInputEl, 'no matter what password');
  await userEvent.click(submitButton);

  await waitForLoadingToFinish();
  expect(screen.getByRole('alert')).toHaveTextContent(/sign up failed/i);
});

test('shows error when server responds with unknown error', async () => {
  server.use(
    http.post<never, AuthRequestBody>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      () =>
        new HttpResponse(null, {
          status: 500,
          statusText: 'Internal Server Error',
        }),
    ),
  );

  await renderWithProviders(<App />, { route: appRoute.auth });

  const userAuthData = buildUserAuthData();
  await userDataService.create(userAuthData);

  const emailInputEl = screen.getByLabelText(/email/i);
  const passwordInputEl = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /log in/i });

  await userEvent.type(emailInputEl, userAuthData.email);
  await userEvent.type(passwordInputEl, userAuthData.password);
  await userEvent.click(submitButton);
  await waitForLoadingToFinish();

  expect(screen.getByRole('alert')).toHaveTextContent(/authentication failed/i);
});
