import { findByRole, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import fetchMock from './mocks/fetch';

beforeEach(() => {
  global.fetch = jest.fn(fetchMock);
});

afterEach(() => jest.clearAllMocks());

const DETAILS_FOOD = '/foods/52771';

describe('Teste se o componente Details funciona corretamente', () => {
  test('se existe uma comida chamada Spicy Arrabiata Penne', async () => {
    renderWithRouterAndContext(DETAILS_FOOD);
    const title = await screen.findByRole('heading', { name: 'Spicy Arrabiata Penne' });
    expect(title).toBeInTheDocument();
  });
  test('se existe uma img da receita Arrabiata', async () => {
    renderWithRouterAndContext(DETAILS_FOOD);
    const img = await screen.findByAltText('Recipe Spicy Arrabiata Penne');
    expect(img).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
  });
});
