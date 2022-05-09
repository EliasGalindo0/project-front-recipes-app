import React from 'react';
// import { Link } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import '../CSS/Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <a
        className="footer-icon"
        href="/drinks"
        data-testid="drinks-bottom-btn"
        src={ DrinkIcon }
        alt="DrinkIcon"
      >
        Drinks
      </a>
      <a
        className="footer-icon"
        href="/explore"
        data-testid="explore-bottom-btn"
        src={ ExploreIcon }
        alt="EXploreIcon"
      >
        Explore
      </a>
      <a
        className="footer-icon"
        href="/foods"
        data-testid="food-bottom-btn"
        src={ MealIcon }
        alt="MealIcon"
      >
        Meals
      </a>

    </footer>
  );
}

export default Footer;
