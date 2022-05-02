import React from 'react';
import Header from '../components/Header';
import ShowList from '../components/ShowList';
import Footer from '../components/Footer';

function SurpriseMe() {
  return (
    <>
      <Header showIcon titleHeader="Surprise Me!" />

      <Footer />

      <ShowList titleHeader="surpriseme" />
    </>
  );
}

export default SurpriseMe;
