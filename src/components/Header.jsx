import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Context from '../Context/Context';

function Header() {
  const [search, setSearch] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const [filterRadio, serFilterRadio] = useState('');

  const {
    getIngredienteAPIFood,
    getNameAPIFood,
    getFirtLetterAPIFood,
    setListFood,
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

  const filterBtnRadio = () => {
    switch (filterRadio) {
    case 'ingredient':
      ingredientAPIFood();
      break;
    case 'name':
      nameAPIFood();
      break;
    case 'firstLetter':
      firstAPIFood();
      break;
    default:
      console.log('Nenhuma função foi chamada');
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

      <h2 data-testid="page-title">Food</h2>

      <button
        data-testid="search-top-btn"
        type="button"
        onClick={ () => { setSearch((a) => !a); } }
      >
        <img src={ searchIcon } alt="explore" />
      </button>

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
            onClick={ filterBtnRadio }
          >
            Search

          </button>
        </div>
      ) : undefined}
    </header>
  );
}

export default Header;
