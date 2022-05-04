import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../Context/Context';

function ExploreFoodsIngredients() {
  const { atualFood } = useContext(Context);
  console.log(atualFood);

  return (
    <>
      <Header showIcon={ false } />
      { atualFood.map((food) => (
        <div
          key={ food.strMeal }
        >
          <Link to={ `/foods/${food.idMeal}` }>
            <img
              src={ food.strMealThumb }
              alt={ food.strMeal }
            />
            <p>
              { food.strMeal }
            </p>
          </Link>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
