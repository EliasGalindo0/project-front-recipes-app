import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';

function ShowIngreList() {
  const {
    ingreList,
  } = useContext(Context);

  const renderFood = () => {
    if (ingreList) {
      try {
        console.log(ingreList);
        const doze = 12;
        const { meals } = ingreList;
        console.log(meals);
        const all12 = meals.slice(0, doze);
        console.log(all12);
        return (
          all12.map((recipe, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ recipe.strMeal }
            >
              <Link
                to={ `/foods/${recipe.idMeal}` }
              >
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
          ))
        );
      } catch (error) {
        console.log(ingreList);
        const doze = 12;
        const { drinks } = ingreList;
        console.log(drinks);
        const all12 = drinks.slice(0, doze);
        console.log(all12);
        return (
          all12.map((recipe, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ recipe.strDrink }
            >
              <Link
                to={ `/foods/${recipe.idDrink}` }
              >
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
          ))
        );
      }
    }
    return <p>a</p>;
  };

  return (
    <p>{ renderFood() }</p>
  );
}

export default ShowIngreList;
