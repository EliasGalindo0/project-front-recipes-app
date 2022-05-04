import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { surpriseMeF } from '../requisitions/recipesData';

function ExploreFoods() {
  const history = useHistory();
  // requisiçao
  const requisition = async () => {
    const data = await surpriseMeF();
    const { idMeal } = data[0];
    history.push(`/foods/${idMeal}`);
  };
  return (
    <>
      <Header showIcon={ false } titleHeader="Explore Foods" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => {
          history.push('/explore/foods/ingredients');
        } }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => {
          history.push('/explore/foods/nationalities');
        } }
      >
        By Nationality
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

export default ExploreFoods;
