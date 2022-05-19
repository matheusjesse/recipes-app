import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../context/Provider';
import App from '../App';

const renderWithRouterAndContext = (path) => {
  const history = createMemoryHistory();

  if (path) { history.push(path); }

  return ({
    ...render(
      <Provider>
        <Router history={ history }>
          <App />
        </Router>
      </Provider>,
    ),
    history,
  });
};

export default renderWithRouterAndContext;
