import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';

const pathname = '/explore/drinks';
describe('testar se o ExploreDrinks funciona corretamente', () => {
  it('verifica se existe um header com Explore Drinks', () => {
    renderWithRouterAndContext(pathname);
    const header = screen.getByRole('heading', { name: /Explore Drinks/i });
    expect(header).toBeInTheDocument();
  });
  it('se existe um botão com o nome profile na pagina Explore Drinks', () => {
    renderWithRouterAndContext(pathname);
    const nameText = screen.getByAltText('Profile Icon');
    expect(nameText).toBeInTheDocument();
  });
  it('se existe um link com o nome By Ingredient', () => {
    renderWithRouterAndContext(pathname);
    const byIngredient = screen.getByRole('link', { name: /By Ingredient/i });
    expect(byIngredient).toBeInTheDocument();
  });
  it('se existe um botão com o nome Surprise me', () => {
    renderWithRouterAndContext(pathname);
    const surpriseMe = screen.getByRole('button', { name: /Surprise me/i });
    expect(surpriseMe).toBeInTheDocument();
  });
  it('se existe e ele redireciona para uma receita surpresa', async () => {
    renderWithRouterAndContext(pathname);
    const surpriseMe = screen.getByRole('button', { name: /Surprise me/i });
    expect(surpriseMe).toBeInTheDocument();

    userEvent.click(surpriseMe);
    const header = await screen.findByTestId('recipe-title');
    expect(header).toBeInTheDocument();
  });
  it('se existe e ele redireciona para ingrediente', async () => {
    renderWithRouterAndContext(pathname);
    const buttonIngredient = screen.getByRole('link', { name: /By Ingredient/i });
    userEvent.click(buttonIngredient);
    const header = await screen.findByText('Explore Ingredients');
    expect(header).toBeInTheDocument();
  });
});
