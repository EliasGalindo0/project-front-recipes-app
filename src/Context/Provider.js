import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [list, setListFood] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [ingredients, setIngredient] = useState([]);
  // const [ingredientThumb, setIngredientThumb] = useState([]);

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
  //   fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setIngredient(result.png);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(`https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setIngredientThumb(result.drinks);
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
