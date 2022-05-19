import React from 'react';
import { Link } from 'react-router-dom';
import Drinks from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import Food from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" style={ { position: 'fixed', bottom: '0' } }>
      <Link to="/drinks">
        <button
          type="button"
          name="go-to-drinks"
        >
          <img src={ Drinks } alt="drink-icon" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explore">
        <button
          type="button"
          name="go-to-explore"
        >
          <img src={ Explore } alt="explore-icon" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/foods">
        <button
          type="button"
          name="go-to-drinks"
        >
          <img src={ Food } alt="food-icon" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
