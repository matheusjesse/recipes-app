import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import Login from '../pages/Login';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
const VALID_EMAIL = 'email@email.com';
const VALID_PASSWORD = '1234567';
const PASSWORD_DATA_TESTID = 'password-input';

describe('Teste se a pagina de login funciona corretamente', () => {
  test('se a rota para esta página é /', () => {
    const { history } = renderWithRouterAndContext(<Login />);
    expect(history.location.pathname).toBe('/');
  });

  test('se existe os campos para email e senha e botão Enter na tela', () => {
    renderWithRouter(<Login />);
    const email = screen.getByRole('textbox', { name: 'Email' });
    const password = screen.getByTestId(PASSWORD_DATA_TESTID);
    const button = screen.getByRole('button', { name: 'Enter' });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('se os campos email e senha habilitam o botão com a validação certa', () => {
    renderWithRouterAndContext(<Login />);

    const email = screen.getByRole('textbox', { name: 'Email' });
    const password = screen.getByTestId(PASSWORD_DATA_TESTID);
    const button = screen.getByRole('button', { name: 'Enter' });

    userEvent.type(email, 'email@email');
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'email-email.com');
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'email.com');
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, '123');
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });

  test('se o botão Enter adiciona as chaves no localStorage', () => {
    renderWithRouterAndContext(<Login />);
    const email = screen.getByRole('textbox', { name: 'Email' });
    const password = screen.getByTestId(PASSWORD_DATA_TESTID);
    const button = screen.getByRole('button', { name: 'Enter' });

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    const emailValue = JSON.parse(localStorage.getItem('user')).email;
    const mealsTokenValue = JSON.parse(localStorage.getItem('mealsToken'));
    const cocktailsTokenValue = JSON.parse(localStorage.getItem('cocktailsToken'));

    expect(emailValue).toBe(VALID_EMAIL);
    expect(mealsTokenValue).toBe(1);
    expect(cocktailsTokenValue).toBe(1);
  });

  test('se o botão Enter redireciona para o caminho /foods', () => {
    const { history } = renderWithRouterAndContext(<Login />);
    const email = screen.getByRole('textbox', { name: 'Email' });
    const password = screen.getByTestId(PASSWORD_DATA_TESTID);
    const button = screen.getByRole('button', { name: 'Enter' });

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    userEvent.click(button);

    expect(history.location.pathname).toBe('/foods');
  });
});
