import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Teste se o componente Footer funciona corretamente', () => {
  test('se existe um elemento footer na página', () => {
    renderWithRouter(<Footer />);

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  test('se botão leva pra o usuário até a página /drinks', () => {
    const { history } = renderWithRouter(<Footer />);

    const button = screen.getByRole('button', { name: 'drink-icon' });
    userEvent.click(button);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('se botão leva pra o usuário até a página /explore', () => {
    const { history } = renderWithRouter(<Footer />);

    const button = screen.getByRole('button', { name: 'explore-icon' });
    userEvent.click(button);

    expect(history.location.pathname).toBe('/explore');
  });

  test('se botão leva pra o usuário até a página /foods', () => {
    const { history } = renderWithRouter(<Footer />);

    const button = screen.getByRole('button', { name: 'food-icon' });
    userEvent.click(button);

    expect(history.location.pathname).toBe('/foods');
  });
});
