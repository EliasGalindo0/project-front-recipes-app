import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/DetailFood.css';

function DetailDrink() {
  const [foodDetail, setFoodDetail] = useState();
  const [recomFood, setRecomFood] = useState();
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const fetchFood = async () => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id[2]}`;
    const response = await fetch(URL);
    const data = await response.json();
    setFoodDetail(data);
  };

  const sixRecom = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const six = 6;

    const response = await fetch(url);
    const { meals } = await response.json();

    const all = meals.slice(0, six);

    setRecomFood(all);
  };

  useEffect(() => {
    fetchFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sixRecom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodDetail]);

  const foodItem = foodDetail ? foodDetail.drinks[0] : [];
  console.log(foodItem);

  const renderIngredients = () => {
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

  const renderCarousel = () => {
    if (recomFood) {
      return (
        <div className="container">
          <div className="divCarouselBigger">
            { recomFood.map((a, index) => (
              <div
                className="divCarousel"
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                <img className="imgCarousel" src={ a.strMealThumb } alt={ a.strMeal } />

                <p className="pCarousel">{ a.strCategory }</p>

                <h4
                  data-testid={ `${index}-recomendation-title` }
                  className="h4Carousel"
                >
                  { a.strMeal }
                </h4>
              </div>
            )) }
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {foodDetail
        ? (
          <>
            <main>
              <img
                data-testid="recipe-photo"
                src={ foodItem.strDrinkThumb }
                alt="food"
                className="imgFood"
              />

              <h1 data-testid="recipe-title">{foodItem.strDrink}</h1>

              <button data-testid="share-btn" type="button">Share</button>

              <button data-testid="favorite-btn" type="button">Favorite</button>

              <h3
                data-testid="recipe-category"
              >
                {`${foodItem.strCategory} - ${foodItem.strAlcoholic}`}
              </h3>

              <h5>Ingredients</h5>

              <ul>
                {renderIngredients()}
              </ul>

              <h3>instructions</h3>

              <p data-testid="instructions">
                {foodItem.strInstructions}
              </p>

              {renderCarousel()}

            </main>
            <footer className="btnDiv">
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-btn"
              >
                Start Recipe
              </button>
            </footer>

          </>
        ) : (
          <main>loading</main>
        )}
    </div>
  );
}

export default DetailDrink;
