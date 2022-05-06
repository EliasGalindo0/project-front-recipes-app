import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/ProgressFood.css';
import ListFood from './ListFood';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

import { btnFavLocal, getLocalFav, deleteLocalFav } from '../Helpers';

function ProgressDrink() {
  const [foodDetail, setFoodDetail] = useState();
  const [foodProgress, setFoodProgress] = useState();
  const [copied, setCopied] = useState(false);
  const [favStatus, setFavStatus] = useState(false);

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const fetchFood = async () => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id[2]}`;
    const response = await fetch(URL);
    const data = await response.json();
    const { drinks } = data;
    setFoodProgress(drinks[0]);
    setFoodDetail(data);
  };

  const foodItem = foodDetail ? foodDetail.drinks[0] : [];
  console.log(foodItem);

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
    fetchFood();
    btnFavLocal(id[2], setFavStatus);
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

    const verificCheck = (param) => {
      const local = localStorage.getItem('inProgressRecipes');
      if (local) {
        return local.includes(param);
      }
    };

    return (
      ingre.map((value, index) => (
        <ListFood
          key={ value[0] }
          value={ value }
          index={ index }
          isChecked={ verificCheck(value[0]) }
        />))
    );
  };

  const copyFunc = (param) => {
    navigator.clipboard.writeText(param);
    setCopied(true);
  };

  const favButton = () => {
    setFavStatus(!favStatus);
    if (!favStatus) {
      getLocalFav(list);
      console.log('mandou pro local');
    } else {
      deleteLocalFav(id[2]);
      console.log('apagar do local');
    }
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

        <h3 data-testid="recipe-category">{foodProgress.strCategory}</h3>

        <h5>Ingredients</h5>

        <ul>
          {renderIngredients()}
        </ul>

        <h3>instructions</h3>

        <p data-testid="instructions">
          {foodProgress.strInstructions}
        </p>

        <button data-testid="finish-recipe-btn" type="button">Finish Recipe</button>
      </main>
    ) : (<p>Loading</p>)
  );
}

export default ProgressDrink;
