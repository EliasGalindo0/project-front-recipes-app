import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import '../CSS/DoneRecipes.css';
import { deleteLocalFav } from '../Helpers';

function ShowFavoriteRecipes() {
  const [copied, setCopied] = useState(false);
  const [favStatus] = useState(true);
  const [all, setAll] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setAll(local);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favButton = useCallback((id) => {
    setAll(all.filter((item) => item.id !== id));
    deleteLocalFav(id);
    console.log('apagar do local');
  }, [all]);

  const renderLocalDone = () => {
    const copyFunc = (param) => {
      navigator.clipboard.writeText(param);
      setCopied(true);
    };

    return all.map((item, index) => {
      const renderTags = () => {
        if (item.tags) {
          let { tags } = item;
          tags += '';
          const eachTag = tags.split(',');

          return (
            eachTag.map((a) => (
              <h4
                data-testid={ `${index}-${a}-horizontal-tag` }
                key={ a }
              >
                { a }
              </h4>
            ))
          );
        }
      };

      return (
        <div key={ item.name } className="done">
          <Link to={ `/${item.type}s/${item.id}` }>
            <img
              className="imgFood"
              src={ item.image }
              alt={ item.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>

          <div>
            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${item.nationality} - ${item.category}` }
            </h4>

            { item.alcoholicOrNot ? (
              <h5
                data-testid={ `${index}-horizontal-top-text` }
              >
                { item.alcoholicOrNot }
              </h5>
            ) : undefined }

            <Link to={ `/${item.type}s/${item.id}` }>
              <h4
                data-testid={ `${index}-horizontal-name` }
              >
                { item.name }
              </h4>
            </Link>

            <h4
              data-testid={ `${index}-horizontal-done-date` }
            >
              { `Done in: ${item.doneDate}` }
            </h4>

            <button
              type="button"
              onClick={ () => { copyFunc(`http://localhost:3000/foods/${item.id}`); } }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ ShareIcon }
                alt="share-btn"
              />
            </button>

            <button
              type="button"
              onClick={ () => favButton(item.id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ favStatus ? BlackHeartIcon : WhiteHeartIcon }
                alt="fav-icon"
              />
            </button>

            { copied ? <p>Link copied!</p> : undefined}

            { renderTags() }
          </div>

        </div>
      );
    });
  };

  const foodBtn = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const food = local.filter((a) => a.type === 'food');
    setAll(food);
  };

  const drinkBtn = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const drink = local.filter((a) => a.type === 'drink');
    setAll(drink);
  };

  return (
    <>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => {
            setAll(JSON.parse(localStorage.getItem('favoriteRecipes')));
          } }
        >
          All
        </button>

        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ foodBtn }
        >
          Food
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ drinkBtn }
        >
          Drinks
        </button>
      </div>

      <main>
        { all ? (
          renderLocalDone()
        ) : <p>Loading</p> }
      </main>
    </>
  );
}

export default ShowFavoriteRecipes;
