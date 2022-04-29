import React from 'react';
import Header from '../components/Header';
import ShowList from '../components/ShowList';
import Footer from '../components/Footer';

function Foods() {
  return (
    <>
      <Header showIcon titleHeader="Foods" />

      <Footer />

      <ShowList titleHeader="Foods" />
    </>
  );
}

export default Foods;
