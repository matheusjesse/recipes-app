import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../context/Provider';
import contextGlobal from '../context';

const renderWithRouterAndContext = (component) => {
  const history = createMemoryHistory();

  return ({
    ...render(
      <Provider value={ contextGlobal }>
        <Router history={ history }>{component}</Router>
      </Provider>,
    ),
    history,
  });
};

export default renderWithRouterAndContext;
