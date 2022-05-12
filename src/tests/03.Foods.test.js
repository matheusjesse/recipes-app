import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import Foods from '../pages/Foods';
import fetchMock from './mocks/fetch';
import beefMeals from './mocks/beefMeals';

beforeEach(() => {
  global.fetch = jest.fn(fetchMock);
});
// async () => {

// global.fetch = Promise.resolve((url) => {
//   Promise.resolve({
//     json: () => {
//       if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
//         return Promise.resolve(mealCategories);
//       }
//       if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
//         return Promise.resolve(drinkCategories);
//       }
//       if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
//         return Promise.resolve(meals);
//       }
//       if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
//         return Promise.resolve(drinks);
//       }
//     },
//   });
// });
// });

afterEach(() => jest.clearAllMocks());

const checkFirstTwelveRecipes = async (category, recipes) => {
  const categoryButton = await screen.findByTestId(`${category}-category-filter`);
  expect(categoryButton).toBeInTheDocument();
  userEvent.click(categoryButton);

  const maxRecipes = 12;
  recipes.slice(0, maxRecipes).forEach((recipe, index) => {
    const recipeCard = screen.getByTestId(`${index}-recipe-card`);
    expect(recipeCard).toBeInTheDocument();
  });

  const notRecipeCard = await screen.findByTestId(`${maxRecipes}-recipe-card`);
  expect(notRecipeCard).not.toBeInTheDocument();
};

describe('Teste se o componente Header funciona corretamente', () => {
  test('se existe um elemento header na página', () => {
    renderWithRouterAndContext(<Foods />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('se o header possui um título com o nome que foi passado via props', () => {
    renderWithRouterAndContext(<Foods />);
    const heading = screen.getByRole('heading', { name: 'Foods' });
    expect(heading).toBeInTheDocument();
  });

  test('se botão leva pra o usuário até a página /profile', () => {
    const { history } = renderWithRouterAndContext(<Foods />);

    const profileButton = screen.getByRole('button', { name: 'Profile Icon' });
    userEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });
  test('se o input só aparece quando é clicado no botão de pesquisa', () => {
    renderWithRouterAndContext(<Foods />);

    const searchIconButton = screen.getByRole('button', { name: 'Search Icon' });
    userEvent.click(searchIconButton);

    const inputSearch = screen.getByRole('textbox');
    expect(inputSearch).toBeInTheDocument();

    userEvent.click(searchIconButton);
    expect(inputSearch).not.toBeInTheDocument();
  });
  test('se o filtro faz requisição à API e atualiza o estado global', () => {
    renderWithRouterAndContext(<Foods />);
    const FIVE = 5;

    const searchIconButton = screen.getByRole('button', { name: 'Search Icon' });
    userEvent.click(searchIconButton);

    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'chicken');

    const searchRadio = screen.getAllByRole('radio');
    userEvent.click(searchRadio[0]);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(FIVE);
  });
  test.only('se os botões de categoria funcionam corretamente', async () => {
    // all, beef, breakfast, chicken, dessert, goat
    renderWithRouterAndContext(<Foods />);

    checkFirstTwelveRecipes('Beef', beefMeals.meals);
  });
});
