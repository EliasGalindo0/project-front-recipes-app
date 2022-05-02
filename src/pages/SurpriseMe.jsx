import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const fetchSurprise = async () => {
  const URLSurprise = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(URLSurprise);
  const data = await response.json();
  setListFood(data);
};

function SurpriseMe() {
  return (
    <>
      <Header showIcon titleHeader="Surprise Me!" />
      { data.map((recipe) => (
        <div
          key={ recipe.strMeal }
        >
          <Link to={ `/foods/${recipe.idMeal}` }>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />

            <p>
              { recipe.strMeal }
            </p>
          </Link>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default SurpriseMe;
