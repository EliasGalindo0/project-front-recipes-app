import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
// import Context from '../Context/Context';
import '../CSS/DetailFood.css';

function DetailFood() {
  const [foodDetail, setFoodDetail] = useState();
  const [recomFood, setRecomFood] = useState();

  // const {
  //   startRecipe,
  //   setStartRecipe,
  // } = useContext(Context);

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

  const sixRecom = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const six = 6;

    const response = await fetch(url);
    const { drinks } = await response.json();

    const all = drinks.slice(0, six);

    setRecomFood(all);
  };

  const arrayLocal = JSON.stringify([{
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: '',
  }]);

  function localDoneRecipes() {
    localStorage.setItem('doneRecipes', arrayLocal);
  }

  useEffect(() => {
    fetchFood();
    localDoneRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sixRecom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodDetail]);

  const foodItem = foodDetail ? foodDetail.meals[0] : [];
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
                <img className="imgCarousel" src={ a.strDrinkThumb } alt={ a.strDrink } />

                <p className="pCarousel">{ a.strCategory }</p>

                <h4
                  data-testid={ `${index}-recomendation-title` }
                  className="h4Carousel"
                >
                  { a.strDrink }
                </h4>
              </div>
            )) }
          </div>
        </div>
      );
    }
  };

  const renderVideo = (param) => {
    const url = param.replace('watch', 'embed').replace('?v=', '/');
    return (
      <iframe
        width="350"
        height="350"
        src={ url }
        title="video"
        data-testid="video"
      />
    );
  };

  const jsonDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(jsonDoneRecipes);

  const filterLocal = jsonDoneRecipes.filter((item) => item.id.includes(id[2]));
  console.log(filterLocal);

  return (
    <div>
      {foodDetail
        ? ( // true
          <>
            <main>
              <img
                data-testid="recipe-photo"
                className="imgFood"
                src={ foodItem.strMealThumb }
                alt="food"
              />

              <h1 data-testid="recipe-title">{foodItem.strMeal}</h1>

              <button data-testid="share-btn" type="button">Share</button>

              <button data-testid="favorite-btn" type="button">Favorite</button>

              <h3 data-testid="recipe-category">{foodItem.strCategory}</h3>

              <h5>Ingredients</h5>

              <ul>
                {renderIngredients()}
              </ul>

              <h3>instructions</h3>

              <p data-testid="instructions">
                {foodItem.strInstructions}
              </p>

              {renderVideo(foodItem.strYoutube)}

              {renderCarousel()}

            </main>
            <footer className="btnDiv">
              <Link to={ `/foods/${id[2]}/in-progress` }>
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  className="start-recipe-btn"
                >
                  Start Recipe
                </button>
              </Link>
            </footer>
          </>
        ) : (
          <main>loading</main>
        )}
    </div>
  );
}

export default DetailFood;
