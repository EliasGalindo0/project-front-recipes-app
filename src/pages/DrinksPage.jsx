import React from 'react';
import Header from '../components/Header';
import ShowList from '../components/ShowList';
import Footer from '../components/Footer';

function DrinksPage() {
  return (
    <>
      <Header showIcon titleHeader="Drinks" />

      <ShowList />

      <Footer />
    </>
  );
}

export default DrinksPage;
