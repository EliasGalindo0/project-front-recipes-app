import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { surpriseMeD } from '../requisitions/recipesData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/ExplorePages.css';

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
        className="explore-btn"
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => {
          history.push('/explore/drinks/ingredients');
        } }
      >
        By Ingredient
      </button>
      <button
        className="explore-btn"
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
