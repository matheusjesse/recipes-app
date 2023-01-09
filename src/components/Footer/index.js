import React from 'react';
import { Link } from 'react-router-dom';
// import drinkIcon from '../../assets/whitedrink.png';
import drinkIcon from '../../images/drinkIcon.svg';
// import exploreIcon from '../../assets/whitecompass.png';
import exploreIcon from '../../images/exploreIcon.svg';
// import mealIcon from '../../assets/whitefork.png';
import mealIcon from '../../images/mealIcon.svg';
import ContainerFooter from './style';

function Footer() {
  return (
    <ContainerFooter>
      <footer data-testid="footer" style={ { position: 'fixed', bottom: '0' } }>
        <Link to="/drinks">
          <button
            type="button"
          >
            <img src={ drinkIcon } alt="drink-icon" data-testid="drinks-bottom-btn" />
          </button>
        </Link>
        <Link to="/explore">
          <button
            type="button"
          >
            <img
              src={ exploreIcon }
              alt="explore-icon"
              data-testid="explore-bottom-btn"
            />
          </button>
        </Link>
        <Link to="/foods">
          <button
            type="button"
          >
            <img src={ mealIcon } alt="food-icon" data-testid="food-bottom-btn" />
          </button>
        </Link>
      </footer>
    </ContainerFooter>
  );
}

export default Footer;
