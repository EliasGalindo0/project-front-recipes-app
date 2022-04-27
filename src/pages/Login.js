import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
/* import setLocalStorage from '../helpers/LocalStorage'; */

function Login() {
  const {
    setEmail,
    setPassword,
    email,
    password } = useContext(AppContext);
  const num = 6;

  function btnEnter() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  }

  const validateEmail = () => (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));

  const validatePassword = () => password.length > num;

  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          data-testid="email-input"
          placeholder="E-mail"
          onChange={ (e) => setEmail(e.target.value) }
        />
        <br />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ (e) => setPassword(e.target.value) }
        />
        <br />
        <button
          disabled={ !(validateEmail() && validatePassword()) }
          type="submit"
          data-testid="login-submit-btn"
          onClick={ btnEnter }
        >
          Enter
        </button>
      </form>
    </>
  );
}

export default Login;
