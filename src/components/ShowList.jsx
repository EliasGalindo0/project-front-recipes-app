import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Context from '../Context/Context';

function ShowList({ titleHeader }) {
  const [category, setCategory] = useState('');
  const [atualFood, setAtualFood] = useState('');

  const {
    list,
    setListFood,
    ingredientsList,
  } = useContext(Context);
  console.log(list);

  const getAPIStandard = async (param) => {
    const URLFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const URLDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (ingredientsList) {
      setListFood(ingredientsList);
    } else {
      if (param === 'Foods') {
        const response = await fetch(URLFoods);
        const data = await response.json();
        setListFood(data);
      }
      if (param === 'Drinks') {
        const response = await fetch(URLDrinks);
        const data = await response.json();
        setListFood(data);
      }
    }
  };

  const getAPICategory = async (param) => {
    const URLFoods = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    const URLDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    const five = 5;

    if (param === 'Foods') {
      const response = await fetch(URLFoods);
      const { meals } = await response.json();
      const standard = meals.slice(0, five);
      setCategory(standard);
    }
    if (param === 'Drinks') {
      const response = await fetch(URLDrinks);
      const { drinks } = await response.json();
      const standard = drinks.slice(0, five);
      setCategory(standard);
    }
  };

  useEffect(() => {
    getAPICategory(titleHeader);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategoryBtn = async (param) => {
    const URlF = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`;

    const URLD = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}`;

    console.log(param);

    setAtualFood(param);

    if (titleHeader === 'Foods') {
      const response = await fetch(URlF);
      const data = await response.json();
      console.log(data);
      setListFood(data);
    }
    if (titleHeader === 'Drinks') {
      const response = await fetch(URLD);
      const data = await response.json();
      console.log(data);
      setListFood(data);
    }
  };

  const toggleFunc = (param) => {
    console.log(param);
    console.log(atualFood);
    if (param === atualFood) {
      getAPIStandard(titleHeader);
      setAtualFood('');
      return;
    }
    getCategoryBtn(param);
  };

  const renderCategory = () => {
    if (category) {
      return category.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          name={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ ({ target }) => {
            toggleFunc(target.name);
          } }
        >
          { strCategory }
        </button>
      ));
    }
  };

  const renderCards = () => {
    if (list === '') {
      console.log('a');
      getAPIStandard(titleHeader);
    } else if (list) {
      const type = Object.keys(list)[0];
      const allList = Object.values(list)[0];
      const maxCards = 12;
      const mensage = 'Sorry, we haven\'t found any recipes for these filters.';

      if (allList === null) {
        global.alert(mensage);
        return;
      }

      const list12 = allList.slice(0, maxCards);

      if (type === 'meals') {
        const { meals } = list;
        if (allList.length === 1 && meals[0].idMeal !== '52968') {
          return <Redirect to={ `/foods/${allList[0].idMeal}` } />;
        }
        return list12.map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ recipe.strMeal }
          >
            <Link to={ `/foods/${recipe.idMeal}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />

              <p
                data-testid={ `${index}-card-name` }
              >
                { recipe.strMeal }
              </p>
            </Link>
          </div>
        ));
      }
      if (type === 'drinks') {
        if (allList.length === 1) {
          return <Redirect to={ `/drinks/${allList[0].idDrink}` } />;
        }
        return (list12.map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ recipe.strDrink }
          >
            <Link to={ `/drinks/${recipe.idDrink}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
              />

              <p
                data-testid={ `${index}-card-name` }
              >
                { recipe.strDrink }
              </p>
            </Link>
          </div>
        )));
      }
    }
  };

  // ir pra main

  return (
    <main>
      { renderCategory() }

      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => { getAPIStandard(titleHeader); } }
      >
        All
      </button>

      { renderCards() }
    </main>
  );
}

ShowList.propTypes = {
  titleHeader: PropTypes.string.isRequired,
};

export default ShowList;
