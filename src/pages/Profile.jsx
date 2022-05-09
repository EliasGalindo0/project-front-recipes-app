import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [getEmail, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user === null) {
      localStorage.setItem('user', JSON.stringify({}));
    } else {
      setEmail(JSON.parse(user));
    }
  }, []);

  function handleClick() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <>
      <Header showIcon={ false } titleHeader="Profile" />
      <p
        data-testid="profile-email"
      >
        { getEmail.email }
      </p>
      <div>
        <Link
          to="/done-recipes"
        >
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link
          to="/favorite-recipes"
        >
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
