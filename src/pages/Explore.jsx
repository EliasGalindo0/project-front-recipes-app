import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreButtons from './ExploreButtons';

function Explore() {
  return (
    <>
      <Header showIcon={ false } titleHeader="Explore" />
      <div className="explore-main">
        <ExploreButtons />
        <Footer />
      </div>

    </>
  );
}

export default Explore;
