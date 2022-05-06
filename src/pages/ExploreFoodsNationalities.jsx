import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodsNationalities() {
  const [ingredients, setIngredients] = useState();

  const getIngredientsIMG = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const cardLimit = 12;
    const response = await fetch(URL);
    const { meals } = await response.json();
    const ingredient12 = meals.slice(0, cardLimit);
    // console.log(ingredient12);
    setIngredients(ingredient12);
  };

  useEffect(() => {
    getIngredientsIMG();
  }, []);

  return (
    <Link to="/foods">
      <Header showIcon={ false } titleHeader="Explore Ingredients" />
      { ingredients ? (
        ingredients.map((ingredient, index) => (
          <div
            key={ ingredient.idIngredient }
            data-testid={ `${index}-ingredient-card` }

          >
            <img
              src="https://www.themealdb.com/images/ingredients/Lime.png"
              alt={ ingredient.strIngredient }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</p>

          </div>
        ))
      ) : undefined }
      <Footer />
    </Link>
  );
}

export default ExploreFoodsNationalities;
