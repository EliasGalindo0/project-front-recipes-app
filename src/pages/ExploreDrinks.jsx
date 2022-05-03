import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { surpriseMeD } from '../requisitions/recipesData';

function ExploreDrinks() {
  const history = useHistory();
  const requisition = async () => {
    const data = await surpriseMeD();
    const { idDrink } = data[0];
    history.push(`/drinks/${idDrink}`);
  };
  return (
    <>
      <Header showIcon={ false } titleHeader="Explore Drinks" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => {
          history.push('/explore/drinks/ingredients');
        } }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ requisition }
      >
        Surprise me!
      </button>

      <Footer />
    </>
  );
}

export default ExploreDrinks;
