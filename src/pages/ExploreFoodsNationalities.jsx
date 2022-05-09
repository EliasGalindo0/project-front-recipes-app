import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodsNationalities() {
  // bloco do dropdown
  const [nationalities, setNationalities] = useState();

  const getNationalities = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(URL);
    const { meals } = await response.json();

    setNationalities(meals);
  };

  useEffect(() => {
    getNationalities();
  }, []);
  // bloco do dropdown

  const [recipes, setRecipes] = useState();

  const getRecipes = async ({ target }) => {
    if (target.value === 'All') {
      console.log(target.value);
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const cardLimit = 12;
      const response = await fetch(URL);
      const { meals } = await response.json();
      const meals12 = meals.slice(0, cardLimit);

      setRecipes(meals12);
      return;
    }
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`;

    const cardLimit = 12;
    const response = await fetch(URL);
    const { meals } = await response.json();
    const meals12 = meals.slice(0, cardLimit);
    console.log(meals12);
    setRecipes(meals12);
    console.log(recipes);
  };

  const getRecipesAll = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const cardLimit = 12;
    const response = await fetch(URL);
    const { meals } = await response.json();
    const meals12 = meals.slice(0, cardLimit);

    setRecipes(meals12);
  };

  useEffect(() => {
    getRecipesAll();
  }, []);

  return (
    <>
      <Header showIcon={ false } titleHeader="Explore by nationality" />
      <select
        data-testid="explore-by-nationality-dropdown"
        defaultValue="All"
        onChange={ getRecipes }
      >
        <option value="All" data-testid="All-option">All</option>
        { nationalities ? (
          nationalities.map((nationality, index) => (
            <option
              value={ nationality.strArea }
              key={ index }
              data-testid={ `${nationality.strArea}-option` }

            >

              { nationality.strArea }

            </option>
          ))
        ) : undefined }
      </select>
      <div>
        { recipes ? (
          recipes.map((recipe, index) => (
            <Link
              to={ `/foods/${recipe.idMeal}` }
              key={ recipe.idMeal }
            >
              <div
                key={ recipe.idMeal }
                data-testid={ `${index}-recipe-card` }

              >
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>

              </div>
            </Link>
          ))
        ) : undefined }
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsNationalities;
