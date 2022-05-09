import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../Context/Context';

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState();

  console.log(ingredients);

  const {
    setIngreOn, ingreOn, ingreList, setIngreList } = useContext(Context);

  const getIngredientsIMG = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const cardLimit = 12;
    const response = await fetch(URL);
    const { drinks } = await response.json();
    const ingredient12 = drinks.slice(0, cardLimit);
    setIngredients(ingredient12);
  };

  useEffect(() => {
    getIngredientsIMG();
    setIngreOn(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { history } = useHistory();

  useEffect(() => {
    if (ingreOn && ingreList) {
      history.push('/foods');
      console.log('push');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingreOn]);

  const setNewFilter = async (ingredient) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    setIngreList(data);
    // setIngreOn(true);
  };

  return (
    <>
      <Header showIcon={ false } titleHeader="Explore Ingredients" />
      { ingredients ? (
        ingredients.map((ingredient, index) => (
          <Link
            to="/foods"
            key={ ingredient.strIngredient1 }
            onClick={ () => { setNewFilter(ingredient.strIngredient1); } }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredients[index].strIngredient1}-Small.png` }
                alt={ ingredient.strIngredient1 }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
            </div>
          </Link>
        ))
      ) : undefined }
      <Footer />
    </>
  );
}

export default ExploreDrinksIngredients;
