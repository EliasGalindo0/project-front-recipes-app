import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../CSS/ExplorePages.css';

function ExploreButtons() {
  const history = useHistory();
  return (
    <div className="container-explore-buttons">
      <button
        className="explore-btn"
        type="button"
        data-testid="explore-foods"
        onClick={ () => {
          history.push('/explore/foods');
        } }
      >
        Explore Foods
      </button>
      <button
        className="explore-btn"
        type="button"
        data-testid="explore-drinks"
        onClick={ () => {
          history.push('/explore/drinks');
        } }
      >
        Explore Drinks
      </button>
    </div>
  );
}

export default ExploreButtons;
