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

export const btnFavLocal = (param, param2) => {
  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (local) {
    const a = local.some(({ id: idFav }) => idFav === param);
    param2(a);
  }
};

export const getLocalFav = (list) => {
  console.log(list);
  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (local) {
    const lista = [...local, list];
    const localString = JSON.stringify(lista);
    localStorage.setItem('favoriteRecipes', localString);
  } else {
    const lista = [list];
    const localString = JSON.stringify(lista);
    localStorage.setItem('favoriteRecipes', localString);
  }
};

export const deleteLocalFav = (param) => {
  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const a = local.filter(({ id: idFav }) => idFav !== param);
  localStorage.setItem('favoriteRecipes', JSON.stringify(a));
};

export const localDoneRecipes = (param, param2) => {
  // localStorage.setItem('doneRecipes', JSON.stringify(foodDetail));
  const local = localStorage.getItem('doneRecipes');
  if (local && local.includes(param)) {
    param2(true);
  }
};

export const localInProgress = (param, param2) => {
  const local = localStorage.getItem('inProgressRecipes');
  if (local && local.includes(param)) {
    param2(true);
  }
};

export const SetLocalDoneRecipes = (param) => {
  const local = JSON.parse(localStorage.getItem('doneRecipes'));
  if (local) {
    const lista = [...local, param];
    const localString = JSON.stringify(lista);
    localStorage.setItem('doneRecipes', localString);
  } else {
    const lista = [param];
    const localString = JSON.stringify(lista);
    localStorage.setItem('doneRecipes', localString);
  }
};
