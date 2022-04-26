import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [listFood, setListFood] = useState('');

  const getIngredienteAPIFood = async (ingredient) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const getNameAPIFood = async (name) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const getFirtLetterAPIFood = async (firstL) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstL}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const contextValue = {
    getIngredienteAPIFood,
    getNameAPIFood,
    getFirtLetterAPIFood,
    listFood,
    setListFood,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
