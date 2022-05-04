import React from 'react';
import { Link } from 'react-router-dom';

export const renderIngredients = (foodItem) => {
  const ingredient = Object.entries(foodItem).filter(([key, values]) => key
    .includes('strIngredient')
    && typeof values === 'string' && values !== '' && values !== ' ');

  const measure = Object.entries(foodItem).filter(([key, values]) => key
    .includes('strMeasure')
    && typeof values === 'string' && values !== '' && values !== ' ');

  const ingre = ingredient.map((a) => a.splice(1));

  const meas = measure.map((a) => a.splice(1));

  ingre.forEach((b, index) => {
    b.push(meas[index][0]);
  });

  return (
    ingre.map((value, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ index }
      >
        { `${value[0]}: ${value[1]}` }
      </li>))
  );
};

export const renderFootBtn = (done, id, inProgress, param) => (
  done ? undefined : (
    <Link to={ `/${param}/${id}/in-progress` }>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
      >
        { inProgress ? 'Continue Recipe' : 'Start Recipe' }
      </button>
    </Link>
  )
);
