import React from 'react';
import Header from '../components/Header';
import ShowDoneRecipes from '../components/ShowDoneRecipes';

function DoneRecipes() {
  return (
    <>
      <Header showIcon={ false } titleHeader="Done Recipes" />

      <ShowDoneRecipes />
    </>
  );
}

export default DoneRecipes;
