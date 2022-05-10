import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import Foods from '../pages/Foods';
// import chickenMeals from './mocks/chickenMeals';

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

    const searchIconButton = screen.getByRole('button', { name: 'Search Icon' });
    userEvent.click(searchIconButton);

    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'chicken');

    const searchRadio = screen.getAllByRole('radio');
    userEvent.click(searchRadio[0]);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.click(searchButton);

    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(chickenMeals.meals),
    // });

    // expect(global.fetch).toBeCalledTimes(1);
    // expect(global.fetch).toBeCalledWith(
    //   'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
    // );
  });
});
