import React, { useContext } from 'react';
import Context from '../context/Context';

function Login() {
  const {
    setEmail,
    setPassword,
    setDisabled,
    email,
    password,
    disabled } = useContext(Context);
  const num = 6;

  const handleValidate = () => (
    email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && password.length > num
      ? setDisabled(false) : setDisabled(true)
  );

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
          disabled={ disabled }
          type="submit"
          data-testid="login-submit-btn"
          onClick={ handleValidate }
        >
          Enter
        </button>
      </form>
    </>
  );
}

export default Login;
