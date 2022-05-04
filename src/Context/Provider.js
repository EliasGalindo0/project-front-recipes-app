import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [list, setListFood] = useState('');
  // const [surpriseMeals, setSurpriseMeal] = useState([]);
  // const [surpriseDrinks, setSurpriseDrink] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const getIngredienteAPIDrink = async (ingredient) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const getNameAPIDrink = async (name) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const getFirtLetterAPIDrink = async (firstL) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstL}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  // useEffect(() => {
  //   fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setSurpriseMeal(result.meals);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setSurpriseDrink(result.drinks);
  //     });
  // }, []);

  const contextValue = {
    getIngredienteAPIFood,
    getNameAPIFood,
    getFirtLetterAPIFood,
    list,
    setListFood,
    getIngredienteAPIDrink,
    getNameAPIDrink,
    getFirtLetterAPIDrink,
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
