import React from 'react';
// import { Link } from 'react-router-dom';
// import Context from '../Context/Context';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodsIngredients() {
  // const { getIngredientsFood } = useContext(Context);

  // const APIRequest = async () => {
  //   const data = await getIngredientsFood();
  //   setListFood(data);
  // };
  // APIRequest();
  return (
    <>
      <Header showIcon={ false } />
      {/* { data.map((ingredient) => (
        <div
          key={ ingredient.idIngredient }
          data-testid="${index}-ingredient-card"
        >
          <img
            src=""
            alt=""
            data-testid="${index}-card-img"
          />
          <p data-testid="${index}-card-name" />
        </div>
      ))} */}
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
