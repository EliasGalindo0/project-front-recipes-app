import React from 'react';

function Login() {
  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          data-testid="email-input"
          placeholder="E-mail"
        />
        <br />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
        />
        <br />
        <button
          type="submit"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </>
  );
}

export default Login;
