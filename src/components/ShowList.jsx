import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Context from '../Context/Context';

function ShowList() {
  const {
    list,
  } = useContext(Context);

  console.log('a');

  const renderCards = () => {
    if (list) {
      console.log(list);
      const type = Object.keys(list)[0];
      const allList = Object.values(list)[0];
      const maxCards = 12;
      const mensage = 'Sorry, we haven\'t found any recipes for these filters.';

      if (allList === null) {
        global.alert(mensage);
        return;
      }

      const list12 = allList.slice(0, maxCards);

      console.log(list12);

      if (type === 'meals') {
        if (Object.values(list).length === 1) {
          console.log(allList);
          return <Redirect to={ `/foods/${allList[0].idMeal}` } />;
        }
        return list12.map((recipe) => (
          <div
            data-testid={ `${recipe.idMeal}-recipe-card` }
            key={ recipe.strMeal }
          >
            <Link to={ `/food/${recipe.idMeal}` }>
              <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />

              <p>{ recipe.strMeal }</p>
            </Link>
          </div>
        ));
      }
      if (type === 'drinks') {
        console.log(type);
        if (Object.values(list).length === 1) {
          console.log(allList);
          return <Redirect to={ `/drinks/${allList[0].idDrink}` } />;
        }
        return (list12.map((recipe) => (
          <div
            data-testid={ `${recipe.idDrink}-recipe-card` }
            key={ recipe.strDrink }
          >
            <Link to={ `/food/${recipe.idDrink}` }>
              <img src={ recipe.strDrinkThumb } alt={ recipe.strDrink } />

              <p>{ recipe.strDrink }</p>
            </Link>
          </div>
        )));
      }
    }
  };

  return (
    <main>
      { renderCards() }
    </main>
  );
}

export default ShowList;
