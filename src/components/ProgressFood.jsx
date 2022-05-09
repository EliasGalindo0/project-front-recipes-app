import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../CSS/ProgressFood.css';
import ListFood from './ListFood';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

import Context from '../Context/Context';

import { btnFavLocal, getLocalFav,
  deleteLocalFav, SetLocalDoneRecipes } from '../Helpers';

function ProgressFood() {
  const [foodDetail, setFoodDetail] = useState();
  const [foodProgress, setFoodProgress] = useState();
  const [copied, setCopied] = useState(false);
  const [favStatus, setFavStatus] = useState(false);

  const {
    setTotalIngre,
    finishBtnDisabled,
  } = useContext(Context);

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const fetchFood = useCallback(async () => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id[2]}`;
    const response = await fetch(URL);
    const data = await response.json();
    const { meals } = data;
    setFoodProgress(meals[0]);
    setFoodDetail(data);
  }, [id]);

  const foodItem = foodDetail ? foodDetail.meals[0] : [];
  console.log(foodItem);

  const list = {
    id: foodItem.idMeal,
    type: 'food',
    nationality: foodItem.strArea,
    category: foodItem.strCategory,
    alcoholicOrNot: '',
    name: foodItem.strMeal,
    image: foodItem.strMealThumb,
  };

  useEffect(() => {
    fetchFood();
    btnFavLocal(id[2], setFavStatus);
  }, [fetchFood, id]);

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

    setTotalIngre(ingre.length);

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

  const doneLocal = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${mm}/${dd}/${yyyy}`;

    return {
      id: foodItem.idMeal,
      type: 'food',
      nationality: foodItem.strArea,
      category: foodItem.strCategory,
      alcoholicOrNot: '',
      name: foodItem.strMeal,
      image: foodItem.strMealThumb,
      doneDate: today,
      tags: foodItem.strTags,
    };
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

        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => { copyFunc(`http://localhost:3000/foods/${id[2]}`); } }
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

        <Link to="/done-recipes">
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ !finishBtnDisabled }
            onClick={ () => { SetLocalDoneRecipes(doneLocal()); } }
          >
            Finish Recipe
          </button>
        </Link>
      </main>
    ) : (<p>Loading</p>)
  );
}

export default ProgressFood;
