import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
});

afterEach(() => {
  localStorage.clear();
});

describe('Teste se a pagina de Receitas Favoritas funciona corretamente', () => {
  it('se os botões de comida e bebida filtram corretamente', () => {
    renderWithRouterAndContext('/favorite-recipes');
    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(2);

    const foodRecipesButton = screen.getByRole('button', { name: 'Food' });
    userEvent.click(foodRecipesButton);
    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(1);

    const foodRecipesTitle = screen.getByTestId(/horizontal-name/i);
    expect(foodRecipesTitle).toHaveTextContent('Arrabiata');

    const drinkRecipesButton = screen.getByRole('button', { name: 'Drinks' });
    userEvent.click(drinkRecipesButton);
    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(1);

    const drinkRecipesTitle = screen.getByTestId(/horizontal-name/i);
    expect(drinkRecipesTitle).toHaveTextContent('Aquamarine');

    const allRecipesButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allRecipesButton);
    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(2);
  });
});
