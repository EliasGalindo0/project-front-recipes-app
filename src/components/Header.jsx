import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Context from '../Context/Context';

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

  const ingredientAPIFood = async () => {
    const data = await getIngredienteAPIFood(valueInput);
    setListFood(data);
  };

  const nameAPIFood = async () => {
    const data = await getNameAPIFood(valueInput);
    setListFood(data);
  };

  const firstAPIFood = async () => {
    if (valueInput.length === 1) {
      const data = await getFirtLetterAPIFood(valueInput);
      setListFood(data);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const ingredientAPIDrink = async () => {
    const data = await getIngredienteAPIDrink(valueInput);
    setListFood(data);
  };

  const nameAPIDrink = async () => {
    const data = await getNameAPIDrink(valueInput);
    setListFood(data);
  };

  const firstAPIDrink = async () => {
    if (valueInput.length === 1) {
      const data = await getFirtLetterAPIDrink(valueInput);
      setListFood(data);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const filterBtnRadioFood = () => {
    if (filterRadio === 'ingredient') {
      ingredientAPIFood();
    }
    if (filterRadio === 'name') {
      nameAPIFood();
    }
    if (filterRadio === 'firstLetter') {
      firstAPIFood();
    }
  };

  const filterBtnRadioDrink = () => {
    if (filterRadio === 'ingredient') {
      ingredientAPIDrink();
    }
    if (filterRadio === 'name') {
      nameAPIDrink();
    }
    if (filterRadio === 'firstLetter') {
      firstAPIDrink();
    }
  };

  return (
    <header>
      <Link
        to="/profile"
        data-testid="profile-top-btn"
      >
        <img src={ profileIcon } alt="ícone" />
      </Link>

      <h2 data-testid="page-title">{ titleHeader }</h2>

      { showIcon ? (
        <button
          data-testid="search-top-btn"
          type="button"
          onClick={ () => { setSearch((a) => !a); } }
        >
          <img src={ searchIcon } alt="explore" />
        </button>
      ) : undefined }

      { search ? (
        <div
          data-testid="search-input"
        >
          <input
            type="text"
            placeholder="Search Recipe"
            onChange={ ({ target }) => { setValueInput(target.value); } }
          />

          <div>
            <label htmlFor="ingredient">
              <input
                type="radio"
                name="Conditional"
                id="ingredient"
                data-testid="ingredient-search-radio"
                onClick={ ({ target }) => { serFilterRadio(target.id); } }
              />
              Ingredient
            </label>

            <label htmlFor="name">
              <input
                type="radio"
                name="Conditional"
                id="name"
                data-testid="name-search-radio"
                onClick={ ({ target }) => { serFilterRadio(target.id); } }
              />
              Name
            </label>

            <label htmlFor="firstLetter">
              <input
                type="radio"
                name="Conditional"
                id="firstLetter"
                ata-testid="first-letter-search-radio"
                onClick={ ({ target }) => { serFilterRadio(target.id); } }
              />
              First Letter
            </label>
          </div>

          <button
            data-testid="exec-search-btn"
            type="button"
            onClick={ titleHeader === 'Foods' ? filterBtnRadioFood : filterBtnRadioDrink }
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
