import { screen } from '@testing-library/react';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';

describe('Testa se a página de explorar funciona corretamente', () => {
  it('se existe um Header com o nome explore', () => {
    renderWithRouterAndContext('/Explore');
    const Header = screen.getByRole('heading', { name: /Explore/i });
    expect(Header).toBeInTheDocument();
  });
  it('se existe um button Explore Foods', () => {
    renderWithRouterAndContext('/Explore');
    const foodsButton = screen.getByRole('link', { name: /Explore Foods/i });
    expect(foodsButton).toBeInTheDocument();
  });
  it('se existe um button Explore Drinks', () => {
    renderWithRouterAndContext('/Explore');
    const drinksButton = screen.getByRole('link', { name: /Explore Drinks/i });
    expect(drinksButton).toBeInTheDocument();
  });
});
