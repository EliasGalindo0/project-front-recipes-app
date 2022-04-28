import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';

function Login() {
  const {
    setEmail,
    setPassword,
    email,
    password } = useContext(Context);

  const num = 6;

  const jsonObj = JSON.stringify({ email });

  const history = useHistory();

  function btnEnter() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', jsonObj);
    history.push('/foods');
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
