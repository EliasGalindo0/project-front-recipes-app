import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/ProgressFood.css';

function ProgressFood() {
  const [foodProgress, setFoodProgress] = useState();

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const fetchFood = async () => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id[2]}`;
    const response = await fetch(URL);
    const { drinks } = await response.json();
    console.log(drinks[0]);
    setFoodProgress(drinks[0]);
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

    return (
      ingre.map((value, index) => (
        <label
          data-testid={ `${index}-ingredient-name-and-measure` }
          id="labelCheckBox"
          key={ index }
          htmlFor={ value[0] }
        >
          <div className="ingredientProgress" data-testid={ `${index}-ingredient-step` }>
            <input
              id={ value[0] }
              type="checkbox"
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
          src={ foodProgress.strDrinkThumb }
          alt="food"
        />

        <h1 data-testid="recipe-title">{foodProgress.strDrink}</h1>

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
