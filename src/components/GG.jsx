import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/DetailFood.css';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

import {
  renderFootBtn, btnFavLocal, getLocalFav,
  deleteLocalFav, localDoneRecipes, localInProgress } from '../Helpers';

function GG() {
  const [foodDetail, setFoodDetail] = useState();
  const [recomFood, setRecomFood] = useState();
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favStatus, setFavStatus] = useState(false);

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const sixRecom = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const six = 6;

    const response = await fetch(url);
    const { meals } = await response.json();

    const all = meals.slice(0, six);

    setRecomFood(all);
  };

  useEffect(() => {
    sixRecom();
    localDoneRecipes();
    localInProgress();
  }, [foodDetail]);

  const foodItem = foodDetail ? foodDetail.drinks[0] : [];

  const list = {
    id: foodItem.idDrink,
    type: 'drink',
    nationality: '',
    category: foodItem.strCategory,
    alcoholicOrNot: foodItem.strAlcoholic,
    name: foodItem.strDrink,
    image: foodItem.strDrinkThumb,
  };

  useEffect(() => {
    const ids = window.location.pathname.split('/');

    (async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ids[2]}`;
      const response = await fetch(URL);
      const data = await response.json();
      setFoodDetail(data);
    })();
    btnFavLocal(ids[2], setFavStatus);
  }, []);

  useEffect(() => {
    const ids = window.location.pathname.split('/');

    sixRecom();
    localDoneRecipes(ids[2], setDone);
    localInProgress(ids[2], setInProgress);
  }, [foodDetail]);

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

  const favButton = () => {
    setFavStatus(!favStatus);
    if (!favStatus) {
      getLocalFav(list);
    } else {
      deleteLocalFav(id[2]);
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

              <button
                data-testid="share-btn"
                type="button"
                onClick={ () => { copyFunc(`http://localhost:3000/drinks/${id[2]}`); } }
              >
                <img src={ ShareIcon } alt="share-btn" />
              </button>

              <button
                type="button"
                onClick={ favButton }
              >
                <img
                  data-testid="favorite-btn"
                  src={ favStatus ? BlackHeartIcon : WhiteHeartIcon }
                  alt="fav-icon"
                />
              </button>

              { copied ? <p>Link copied!</p> : undefined}

              <h3
                data-testid="recipe-category"
              >
                {`${foodItem.strCategory} - ${foodItem.strAlcoholic}`}
              </h3>

              <h5>Ingredients</h5>

              <ul>
                <li>Galliano: 2 1/2 shots</li>
                <li>Ginger ale</li>
                <li>Ice</li>
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

export default GG;
