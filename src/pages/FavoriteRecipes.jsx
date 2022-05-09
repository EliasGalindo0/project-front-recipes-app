import React from 'react';
import Header from '../components/Header';
import ShowFavoriteRecipes from '../components/ShowFavoriteRecipes';

function FavoriteRecipes() {
  return (
    <>
      <Header showIcon={ false } titleHeader="Favorite Recipes" />

      <ShowFavoriteRecipes />
    </>
  );
}

export default FavoriteRecipes;
