import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';

beforeEach(() => {
  localStorage.setItem('user', '{ "email": "email@mail.com" }');
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('doneRecipes', '[]');
  localStorage.setItem('favoriteRecipes', '[]');
  localStorage.setItem('inProgressRecipes', '{}');
});
afterEach(() => {
  localStorage.clear();
});

describe('Teste se a tela de perfil se comporta como esperado', () => {
  it(`se ao clicar no botão para deslogar
    o usuário é redirecionado para paǵina de login`, () => {
    renderWithRouterAndContext('/profile');
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    userEvent.click(logoutButton);

    const loginButton = screen.getByRole('button', { name: 'Enter' });
    expect(loginButton).toBeInTheDocument();
  });
  it(`se ao clicar no botão para deslogar
    o localStorage é completamente apagado`, () => {
    renderWithRouterAndContext('/profile');

    expect(localStorage.getItem('user')).toBe('{ "email": "email@mail.com" }');
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
    expect(localStorage.getItem('doneRecipes')).toBe('[]');
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
    expect(localStorage.getItem('inProgressRecipes')).toBe('{}');

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    userEvent.click(logoutButton);

    expect(localStorage.getItem('email')).toBeNull();
    expect(localStorage.getItem('mealsToken')).toBeNull();
    expect(localStorage.getItem('cocktailsToken')).toBeNull();
    expect(localStorage.getItem('doneRecipes')).toBeNull();
    expect(localStorage.getItem('favoriteRecipes')).toBeNull();
    expect(localStorage.getItem('inProgressRecipes')).toBeNull();
  });
});
