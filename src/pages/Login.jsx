import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import '../CSS/Login.css';
import logo from '../images/logo.png';

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
    <main className="main-login">
      <section className="clip" />
      <section className="section-form">
        <img src={ logo } alt="logo" className="img-logo" />
        <h1>Login</h1>
        <form className="form">
          <input
            className="input-login"
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ (e) => setEmail(e.target.value) }
          />
          <input
            className="input-login"
            type="password"
            data-testid="password-input"
            placeholder="Password"
            onChange={ (e) => setPassword(e.target.value) }
          />
          <button
            disabled={ !(validateEmail() && validatePassword()) }
            type="submit"
            data-testid="login-submit-btn"
            onClick={ btnEnter }
            className="btn-login"
          >
            Enter
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
