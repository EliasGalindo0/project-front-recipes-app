import React from 'react';
import Header from '../components/Header';
import ShowList from '../components/ShowList';

function DrinksPage() {
  return (
    <>
      <Header showIcon titleHeader="Drinks" />

      <ShowList />
    </>
  );
}

export default DrinksPage;
