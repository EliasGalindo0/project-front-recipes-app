import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Footer data-testid="footer">
      <Link to="/explore/drinks" data-testid="drinks-bottom-btn">
        Drinks
      </Link>
      <Link to="/explore" data-testid="explore-bottom-btn">
        Explore
      </Link>
      <Link to="/foods" data-testid="food-bottom-btn">
        Foods
      </Link>

    </Footer>
  );
}

export default Footer;
