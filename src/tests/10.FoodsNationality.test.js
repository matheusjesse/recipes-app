import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';

const pathname = '/explore/foods/nationalities';
const notFound = '/explore/drinks/nationalities';

describe('se o FoodsNationality funciona corretamente', () => {
  it('verifica se existe um header com Explore Nationalities', () => {
    renderWithRouterAndContext(pathname);
    const header = screen.getByRole('heading', { name: /Explore Nationalities/i });
    expect(header).toBeInTheDocument();
  });
  it('se existe um botão com o nome profile na pagina Explore Nationalities', () => {
    renderWithRouterAndContext(pathname);
    const nameText = screen.getByAltText('Profile Icon');
    expect(nameText).toBeInTheDocument();
  });
  it('se o botão profile leva o usuário até a página /profile', () => {
    const { history } = renderWithRouterAndContext(pathname);
    const profileButton = screen.getByRole('button', { name: 'Profile Icon' });
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
  });
  it('se o botão foods leva o usuário até a página /foods', () => {
    const { history } = renderWithRouterAndContext(pathname);
    const foodsButton = screen.getByRole('button', { name: 'food-icon' });
    userEvent.click(foodsButton);
    expect(history.location.pathname).toBe('/foods');
  });
  it('se o botão drinks leva o usuário até a página /drinks', () => {
    const { history } = renderWithRouterAndContext(pathname);
    const drinksButton = screen.getByRole('button', { name: 'drink-icon' });
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');
  });
  it('se o botão explore leva o usuário até a página /explore', () => {
    const { history } = renderWithRouterAndContext(pathname);
    const exploreButton = screen.getByRole('button', { name: 'explore-icon' });
    userEvent.click(exploreButton);
    expect(history.location.pathname).toBe('/explore');
  });
  it('se quando é clicado aparece o botão de pesquisa e desaparece de novo', () => {
    renderWithRouterAndContext(pathname);
    const searchIconButton = screen.getByRole('button', { name: 'Search Icon' });
    userEvent.click(searchIconButton);
    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();
    userEvent.click(searchIconButton);
    expect(inputSearch).not.toBeInTheDocument();
  });
  it('a rota `/explore/drinks/nationalities` ela retorna um erro de "Not Found"', () => {
    const { history } = renderWithRouterAndContext(notFound);
    expect(history.location.pathname).toBe(notFound);
    const notFoundText = screen.getByText('Not Found');
    expect(notFoundText).toBeInTheDocument();
  });
});
