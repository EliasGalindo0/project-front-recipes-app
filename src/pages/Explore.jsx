import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreButtons from './ExploreButtons';

function Explore() {
  return (
    <>
      <Header showIcon={ false } titleHeader="Explore" />
      <ExploreButtons />
      <Footer />
    </>
  );
}

export default Explore;
