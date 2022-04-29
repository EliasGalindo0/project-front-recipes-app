import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import Provider from '../Context/Provider';

const searchBtn = 'search-top-btn';

describe('testas os requisitos do Header', () => {
  it('Redirecione a pessoa usuária para'
  + 'a tela de perfil ao clicar no botão de perfil', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('./foods');

    const profile = screen.getByTestId('profile-top-btn');

    userEvent.click(profile);

    const { pathname } = history.location;

    expect(pathname).toBe('/profile');
  });
  it('Desenvolva o botão de busca que, ao ser clicado, a barra de busca'
  + 'deve aparecer. O mesmo serve para escondê-la', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('./foods');

    const search = screen.getByTestId(searchBtn);

    userEvent.click(search);

    const searchBar = screen.getByTestId('search-input');

    expect(searchBar).toBeInTheDocument();

    userEvent.click(search);

    expect(searchBar).not.toBeInTheDocument();
  });
  it('Implemente os elementos da barra de'
  + 'busca respeitando os atributos descritos no protótipo', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('./foods');

    const search = screen.getByTestId(searchBtn);

    userEvent.click(search);

    const ingredient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const first = screen.getByTestId('first-letter-search-radio');
    const bar = screen.getByTestId('exec-search-btn');

    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(first).toBeInTheDocument();
    expect(bar).toBeInTheDocument();
  });

  // requisito 14 e 15 pulados

  it('Redirecione para a tela de detalhes da receita caso apenas uma'
  + 'receita seja encontrada, com o ID da mesma na URL', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('./foods');

    const search = screen.getByTestId(searchBtn);

    userEvent.click(search);

    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: {
      value: 'Brown Stew Chicken',
    } });

    console.log(input.value);

    const radio = screen.getByTestId('name-search-radio');

    userEvent.click(radio);

    const exec = screen.getByTestId('exec-search-btn');

    userEvent.click(exec);

    const { pathname } = history.location;

    expect(pathname).toBe('/foods/52940');
  });
});
