import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';

const pathname = '/explore/foods';
describe('testar se o ExploreFoods funciona corretamente', () => {
  it('verifica se existe um header com Explore Foods', () => {
    renderWithRouterAndContext(pathname);
    const header = screen.getByRole('heading', { name: /Explore Foods/i });
    expect(header).toBeInTheDocument();
  });
  it('se existe um botão com o nome profile na pagina Explore Foods', () => {
    renderWithRouterAndContext(pathname);
    const nameText = screen.getByAltText('Profile Icon');
    expect(nameText).toBeInTheDocument();
  });
  it('se existe um link com o nome By Ingredient', () => {
    renderWithRouterAndContext(pathname);
    const byIngredient = screen.getByRole('link', { name: /By Ingredient/i });
    expect(byIngredient).toBeInTheDocument();
  });
  it('se existe um link com o nome By Nationality', () => {
    renderWithRouterAndContext(pathname);
    const byNationality = screen.getByRole('link', { name: /By Nationality/i });
    expect(byNationality).toBeInTheDocument();
  });
  it('se existe um botão com o nome Surprise me', () => {
    renderWithRouterAndContext(pathname);
    const surpriseMe = screen.getByRole('button', { name: /Surprise me/i });
    expect(surpriseMe).toBeInTheDocument();
  });
  it('se existe e ele redireciona para uma receita surpresa', () => {
    renderWithRouterAndContext(pathname);
    const surpriseMe = screen.getByRole('button', { name: /Surprise me/i });
    expect(surpriseMe).toBeInTheDocument();

    userEvent.click(surpriseMe);
    renderWithRouterAndContext('/foods/52773');
    const header = screen.getByTestId('recipe-title');
    expect(header).toBeInTheDocument();
  });
  it('se existe e ele redireciona para ingrediente', () => {
    renderWithRouterAndContext(pathname);
    const buttonIngredient = screen.getByRole('link', { name: /By Ingredient/i });
    userEvent.click(buttonIngredient);
    renderWithRouterAndContext('/explore/foods/ingredients');
    const header = screen.queryAllByText('Explore Ingredients');
    expect(header).toHaveLength(2);
  });
});
