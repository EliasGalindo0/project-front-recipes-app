import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Context from '../Context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodsIngredients() {
  const { ingredientsList, setIngredientsList } = useContext(Context);

  const getIngredientsIMG = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const cardLimit = 12;
    const response = await fetch(URL);
    const { meals } = await response.json();
    const ingredient12 = meals.slice(0, cardLimit);
    console.log(ingredient12);
    setIngredientsList(ingredient12);
  };

  useEffect(() => {
    getIngredientsIMG();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { history } = useHistory();
  const setNewFilter = async (ingredient) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    setIngredientsList(data);
    history.push('/foods');
  };

  return (
    <div>
      <Header showIcon={ false } titleHeader="Explore Ingredients" />
      { ingredientsList ? (
        ingredientsList.map((ingredient, index) => (
          <Link
            to="/foods"
            key={ ingredient.idIngredient }
            onClick={ () => setNewFilter(ingredient.strIngredient) }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${ingredientsList[index].strIngredient}-Small.png` }
                alt={ ingredient.strIngredient }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</p>

            </div>
          </Link>
        ))
      ) : undefined }
      <Footer />
    </div>

  );
}

export default ExploreFoodsIngredients;
