import React, { useContext } from 'react';
import Header from '../components/Header';
import ShowList from '../components/ShowList';
import Footer from '../components/Footer';

import Context from '../Context/Context';
import ShowIngreList from '../components/ShowIngreList';

function Foods() {
  const {
    ingreOn,
  } = useContext(Context);

  return (
    <>
      <Header showIcon titleHeader="Foods" />

      <Footer />

      { ingreOn ? <ShowIngreList /> : <ShowList titleHeader="Foods" /> }
    </>
  );
}

export default Foods;
