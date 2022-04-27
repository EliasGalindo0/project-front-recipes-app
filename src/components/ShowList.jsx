import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';

function ShowList() {
  const {
    list,
  } = useContext(Context);

  console.log('a');

  const renderCards = () => {
    if (list) {
      const maxCards = 12;
      const { meals } = list;
      const list12 = meals.slice(0, maxCards);

      console.log(list12);

      return (
        list12.map((recipe) => (
          <div
            data-testid={ `${recipe.idMeal}-recipe-card` }
            key={ recipe.strMeal }
          >
            <Link to={ `/food/${recipe.idMeal}` }>
              <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />

              <p>{ recipe.strMeal }</p>
            </Link>
          </div>
        ))
      );
    }
    // return <p>Prencha o filtro</p>;
  };

  return (
    <main>
      { renderCards() }
    </main>
  );
}

export default ShowList;
