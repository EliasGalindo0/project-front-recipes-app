import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function ProgressFood() {
  const [foodProgress, setFoodProgress] = useState();

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const fetchFood = async () => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id[2]}`;
    const response = await fetch(URL);
    const { meals } = await response.json();
    console.log(meals[0]);
    setFoodProgress(meals[0]);
  };

  useEffect(() => {
    fetchFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderIngredients = () => {
    const ingredient = Object.entries(foodProgress).filter(([key, values]) => key
      .includes('strIngredient')
      && typeof values === 'string' && values !== '' && values !== ' ');

    const measure = Object.entries(foodProgress).filter(([key, values]) => key
      .includes('strMeasure')
      && typeof values === 'string' && values !== '' && values !== ' ');

    const ingre = ingredient.map((a) => a.splice(1));

    const meas = measure.map((a) => a.splice(1));

    ingre.forEach((b, index) => {
      b.push(meas[index][0]);
    });

    const checkBoxFunc = (param) => {
      console.log(param);
    };

    return (
      ingre.map((value, index) => (
        <label
          data-testid={ `${index}-ingredient-name-and-measure` }
          id="labelCheckBox"
          key={ index }
          htmlFor={ value[0] }
        >
          <div className="ingredientProgress">
            <input
              id={ value[0] }
              type="checkbox"
              onClick={ ({ target }) => { checkBoxFunc(target); } }
            />
            <p>{ `${value[0]}: ${value[1]}` }</p>
          </div>
        </label>))
    );
  };

  return (
    foodProgress ? (
      <main>
        <img
          data-testid="recipe-photo"
          className="imgFood"
          src={ foodProgress.strMealThumb }
          alt="food"
        />

        <h1 data-testid="recipe-title">{foodProgress.strMeal}</h1>

        <button data-testid="share-btn" type="button">Share</button>

        <button data-testid="favorite-btn" type="button">Favorite</button>

        <h3 data-testid="recipe-category">{foodProgress.strCategory}</h3>

        <h5>Ingredients</h5>

        <ul>
          {renderIngredients()}
        </ul>

        <h3>instructions</h3>

        <p data-testid="instructions">
          {foodProgress.strInstructions}
        </p>
      </main>
    ) : (<p>Loading</p>)
  );
}

export default ProgressFood;
