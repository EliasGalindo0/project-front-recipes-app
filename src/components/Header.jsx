import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Context from '../Context/Context';
import '../CSS/Header.css';

function Header({ showIcon, titleHeader }) {
  const [search, setSearch] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const [filterRadio, serFilterRadio] = useState('');

  const {
    getIngredienteAPIFood,
    getNameAPIFood,
    getFirtLetterAPIFood,
    setListFood,
    getIngredienteAPIDrink,
    getNameAPIDrink,
    getFirtLetterAPIDrink,
  } = useContext(Context);

  const APIRequestFirst = async (value, func) => {
    if (value.length === 1) {
      const data = await func(value);
      setListFood(data);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const APIRequest = async (value, func) => {
    const data = await func(value);
    setListFood(data);
  };

  const filterBtnRadioFood = () => {
    switch (filterRadio) {
    case 'ingredient':
      APIRequest(valueInput, getIngredienteAPIFood);
      break;
    case 'name':
      APIRequest(valueInput, getNameAPIFood);
      break;
    case 'firstLetter':
      APIRequestFirst(valueInput, getFirtLetterAPIFood);
      break;
    default:
      break;
    }
  };

  const filterBtnRadioDrink = () => {
    switch (filterRadio) {
    case 'ingredient':
      APIRequest(valueInput, getIngredienteAPIDrink);
      break;
    case 'name':
      APIRequest(valueInput, getNameAPIDrink);
      break;
    case 'firstLetter':
      APIRequestFirst(valueInput, getFirtLetterAPIDrink);
      break;
    default:
      break;
    }
  };

  const searchBtn = () => {
    switch (titleHeader) {
    case 'Foods':
      filterBtnRadioFood();
      break;
    case 'Drinks':
      filterBtnRadioDrink();
      break;
    default:
      break;
    }
  };

  return (
    <header className="container">
      <Link
        to="/profile"
      >
        <img
          className="icons"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="ícone"
        />
      </Link>

      <h2 data-testid="page-title">{ titleHeader }</h2>

      { showIcon ? (
        <button
          className="searchOption"
          type="button"
          onClick={ () => { setSearch((a) => !a); } }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="explore"
          />
        </button>
      ) : undefined }

      { search ? (
        <div className="searchContainer">
          <input
            className="searchInput"
            data-testid="search-input"
            type="text"
            placeholder="Search Recipe"
            onChange={ ({ target }) => { setValueInput(target.value); } }
          />

          <div>
            <label htmlFor="ingredient" className="radioControl">
              <input
                type="radio"
                name="Conditional"
                id="ingredient"
                data-testid="ingredient-search-radio"
                onClick={ ({ target }) => { serFilterRadio(target.id); } }
              />
              Ingredient
            </label>

            <label htmlFor="name" className="radioControl">
              <input
                type="radio"
                name="Conditional"
                id="name"
                data-testid="name-search-radio"
                onClick={ ({ target }) => { serFilterRadio(target.id); } }
              />
              Name
            </label>

            <label htmlFor="firstLetter" className="radioControl">
              <input
                type="radio"
                name="Conditional"
                id="firstLetter"
                data-testid="first-letter-search-radio"
                onClick={ ({ target }) => { serFilterRadio(target.id); } }
              />
              First Letter
            </label>
          </div>

          <button
            className="searchBtn"
            data-testid="exec-search-btn"
            type="button"
            onClick={ searchBtn }
          >
            Search
          </button>
        </div>
      ) : undefined}
    </header>
  );
}

Header.propTypes = {
  showIcon: PropTypes.bool.isRequired,
  titleHeader: PropTypes.string.isRequired,
};

export default Header;
