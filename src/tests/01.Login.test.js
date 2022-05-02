import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

const VALID_EMAIL = 'igor@gmail.com';
const TESTID_EMAIL = 'email-input';
const VALID_PASSWORD = '1234567';
const INVALID_EMAIL = 'igorgmail.com';
const INVALID_PASSWORD = '123456';
const INVALID_EMAIL_2 = '@gmail@com';
const TESTID_BTN = 'login-submit-btn';
const TESTID_PASSWORD = 'password-input';

describe('Test page Login', () => {
  it('Requisito 02. Verifica se os elementos estão na tela', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(TESTID_EMAIL);
    expect(email).toBeInTheDocument();
    const senha = screen.getByTestId(TESTID_PASSWORD);
    expect(senha).toBeInTheDocument();
    const enter = screen.getByTestId(TESTID_BTN);
    expect(enter).toBeInTheDocument();
  });

  it('Requisito 03. Verifica se é possível digitar o email', () => {
    renderWithRouter(<App />);
    userEvent.type(screen.getByRole('textbox'), VALID_EMAIL);
    expect(screen.getByRole('textbox')).toHaveValue(VALID_EMAIL);
  });

  it('Requisito 04. Verifica se é possível digitar uma senha', () => {
    renderWithRouter(<App />);
    userEvent.type(screen.getByRole('textbox'), VALID_PASSWORD);
    expect(screen.getByRole('textbox')).toHaveValue(VALID_PASSWORD);
  });

  it('Requisito 05. Verifica validação do formulario', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(TESTID_EMAIL);
    const senha = screen.getByTestId(TESTID_PASSWORD);

    expect(screen.getByTestId(TESTID_BTN)).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(screen.getByTestId(TESTID_BTN)).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, INVALID_PASSWORD);
    expect(screen.getByTestId(TESTID_BTN)).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_2);
    userEvent.type(senha, INVALID_PASSWORD);
    expect(screen.getByTestId(TESTID_BTN)).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(screen.getByTestId(TESTID_BTN)).toBeEnabled();
  });

  it('Requisito 06. Verifica se os tokens estão salvos no localstorage', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(TESTID_EMAIL);
    const senha = screen.getByTestId(TESTID_PASSWORD);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(screen.getByTestId(TESTID_BTN)).toBeEnabled();

    userEvent.click(screen.getByTestId(TESTID_BTN));
    const token = localStorage.getItem('mealsToken');
    const token2 = localStorage.getItem('cocktailsToken');

    expect(token).toBe('1');
    expect(token2).toBe('1');
  });

  it('Requisito 07. Verifica se o e-mail está salvo no localStorage', () => {
    renderWithRouter(<App />);
    const emailToken = JSON.parse(localStorage.getItem('user'));
    const { email } = emailToken;
    expect(email).toBe(VALID_EMAIL);
  });
  it('Requisito 08. Verifica se redireciona para a página de receitas', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(TESTID_EMAIL);
    const senha = screen.getByTestId(TESTID_PASSWORD);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(screen.getByTestId(TESTID_BTN)).toBeEnabled();
    userEvent.click(screen.getByTestId(TESTID_BTN));

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
