import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const VALID_EMAIL = 'igor@gmail.com';
const TESTID_EMAIL = 'email-input';
const VALID_PASSWORD = '01234567';

describe('Test page Login', () => {
  it('Requisito 02. Verifica se os elementos estão na tela', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(TESTID_EMAIL);
    expect(email).toBeInTheDocument();
    const senha = screen.getByTestId('password-input');
    expect(senha).toBeInTheDocument();
    const enter = screen.getByTestId('login-submit-btn');
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
});
