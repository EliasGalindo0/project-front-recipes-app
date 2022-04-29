import React from 'react';
import { Link } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link className="footer-icon" to="/drinks" data-testid="drinks-bottom-btn">
        <img
          src={ DrinkIcon }
          alt="DrinkIcon"
        />
      </Link>
      <Link className="footer-icon" to="/explore" data-testid="explore-bottom-btn">
        <img
          src={ ExploreIcon }
          alt="EXploreIcon"
        />
      </Link>
      <Link className="footer-icon" to="/foods" data-testid="food-bottom-btn">
        <img
          src={ MealIcon }
          alt="MealIcon"
        />
      </Link>

    </footer>
  );
}

export default Footer;
