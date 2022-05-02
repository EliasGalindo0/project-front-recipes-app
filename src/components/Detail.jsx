import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';

function Detail() {
  const { foodDetail, setFoodDetail } = useContext(Context);
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const fetchFood = async () => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id[2]}`;
    const response = await fetch(URL);
    const data = await response.json();
    setFoodDetail(data);
  };

  useEffect(() => {
    fetchFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);
  const foodItem = foodDetail.meals[0];
  return (
    <main>
      <img data-testid="recipe-photo" src={ foodItem.strMealThumb } alt="food" />
      <h1 data-testid="recipe-title">{ foodItem.strMeal }</h1>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
    </main>
  );
}

export default Detail;
