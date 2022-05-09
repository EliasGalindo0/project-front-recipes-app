import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState();

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
  }, []);

  return (
    <Link
      to="/foods"
    >
      <Header showIcon={ false } titleHeader="Explore Ingredients" />
      { ingredients ? (
        ingredients.map((ingredient, index) => (
          <div
            key={ ingredient.idIngredient }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredients[index].strIngredient1}-Small.png` }
              alt={ ingredient.strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
          </div>
        ))
      ) : undefined }
      <Footer />
    </Link>
  );
}

export default ExploreDrinksIngredients;
