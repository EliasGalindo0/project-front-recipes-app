import React, { useEffect, useState } from 'react';
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
      const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';
      const response = await fetch(URL);
      const { meals } = await response.json();

      setRecipes(meals);
    }
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`;
    const response = await fetch(URL);
    const { meals } = await response.json();

    setRecipes(meals);
  };

  /* if (target.value === 'All') {
    console.log(target.value);
    const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';
    const response = await fetch(URL);
    const { meals } = await response.json();

    setRecipes(meals);
  } */

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
          ))
        ) : undefined }
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsNationalities;
