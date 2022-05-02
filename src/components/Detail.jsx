import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Detail() {
  const [foodDetail, setFoodDetail] = useState();
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const fetchFood = useCallback(
    async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id[2]}`;
      const response = await fetch(URL);
      const data = await response.json();
      setFoodDetail(data);
    }, [id, setFoodDetail],
  );

  useEffect(() => {
    fetchFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const foodItem = foodDetail ? foodDetail.meals[0] : [];
  console.log(foodItem);
  return (
    <div>
      {foodDetail
        ? ( // true
          <main>
            <img data-testid="recipe-photo" src={ foodItem.strMealThumb } alt="food" />
            <h1 data-testid="recipe-title">{ foodItem.strMeal }</h1>
            <button data-testid="share-btn" type="button">Share</button>
            <button data-testid="favorite-btn" type="button">Favorite</button>
            <p data-testid="recipe-category">{ foodItem.strCategory }</p>
            <ul>
              <li
                data-testid={ `${foodItem.strIngredient1}-ingredient-name-and-measure` }
              >
                sa
              </li>
            </ul>
            <h3>Instruções</h3>
            <p data-testid="instructions">
              { foodItem.strInstructions }
            </p>
            <video width="750" height="500" controls>
              <track kind="captions" />
              <source src={ foodItem.strYoutube } type="video/mp4" />
            </video>
          </main>
        ) : ( // false
          <main>loading</main>
        )}
    </div>
  );
}

export default Detail;
