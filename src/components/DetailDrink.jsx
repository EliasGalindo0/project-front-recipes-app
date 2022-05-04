import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/DetailFood.css';
import { renderIngredients, renderFootBtn } from '../Helpers';

function DetailDrink() {
  const [foodDetail, setFoodDetail] = useState();
  const [recomFood, setRecomFood] = useState();
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const localDoneRecipes = () => {
    // localStorage.setItem('doneRecipes', JSON.stringify(foodDetail));
    const local = localStorage.getItem('doneRecipes');
    if (local && local.includes(id[2])) {
      console.log('true');
      setDone(true);
    }
  };

  const localInProgress = () => {
    const local = localStorage.getItem('inProgressRecipes');
    if (local && local.includes(id[2])) {
      setInProgress(true);
    }
  };

  useEffect(() => {
    fetchFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sixRecom();
    localDoneRecipes();
    localInProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodDetail]);

  const foodItem = foodDetail ? foodDetail.drinks[0] : [];
  console.log(foodItem);

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

  const copyFunc = (param) => {
    navigator.clipboard.writeText(param);
    setCopied(true);
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

              <button
                data-testid="share-btn"
                type="button"
                onClick={ () => { copyFunc(`http://localhost:3000/drinks/${id[2]}`); } }
              >
                Share
              </button>

              <button data-testid="favorite-btn" type="button">Favorite</button>

              { copied ? <p>Link copied!</p> : undefined}

              <h3
                data-testid="recipe-category"
              >
                {`${foodItem.strCategory} - ${foodItem.strAlcoholic}`}
              </h3>

              <h5>Ingredients</h5>

              <ul>
                {renderIngredients(foodItem)}
              </ul>

              <h3>instructions</h3>

              <p data-testid="instructions">
                {foodItem.strInstructions}
              </p>

              {renderCarousel()}

            </main>
            <footer className="btnDiv">
              { renderFootBtn(done, id[2], inProgress, 'drinks') }
            </footer>

          </>
        ) : (
          <main>loading</main>
        )}
    </div>
  );
}

export default DetailDrink;
