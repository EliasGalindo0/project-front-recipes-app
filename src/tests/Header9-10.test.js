import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import Provider from '../Context/Provider';

const profileString = 'profile-top-btn';
const headerPhrase = 'O header tem os ícones corretos na';

describe('Implemente os elementos do header na tela principal de receitas,'
+ 'respeitando os atributos descritos no protótipo', () => {
  it(' Tem os data-testids `profile-top-btn`, `page-title` e `search-top-btn`', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/foods');

    const profile = screen.getByTestId(profileString);
    const titleId = screen.getByTestId('page-title');
    const searchBtn = screen.getByTestId('search-top-btn');

    expect(profile).toBeDefined();
    expect(titleId).toBeDefined();
    expect(searchBtn).toBeDefined();
  });
});

describe('Implemente os elementos do header na tela principal de receitas,'
+ 'respeitando os atributos descritos no protótipo', () => {
  it('- Não tem header na tela de login', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/foods');

    const profile = screen.getByTestId(profileString);

    history.push('/');

    expect(profile).not.toBeInTheDocument();
  });
  it('O header tem os ícones'
  + 'corretos na tela de principal de receitas de comidas', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/foods');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
  it('O header tem os ícones'
  + 'corretos na tela de principal de receitas de bebidas', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/drinks');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/foods');

    const profile = screen.getByTestId(profileString);

    history.push('/foods/52940');

    expect(profile).not.toBeInTheDocument();
  });
  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/foods');

    const profile = screen.getByTestId(profileString);

    history.push('/drisnk/17222');

    expect(profile).not.toBeInTheDocument();
  });
  it(`${headerPhrase} tela de explorar`, () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/explore');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
  it(`${headerPhrase} tela de explorar comidas`, () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/explore/foods');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
  it(`${headerPhrase} tela de explorar bebidas`, () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/explore/drinks');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
  it(`${headerPhrase} tela de explorar comidas por ingrediente`, () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/explore/foods/ingredients');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
  it(`${headerPhrase} tela de explorar bebidas por ingrediente`, () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/explore/drinks/ingredients');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
  it(`${headerPhrase} tela de explorar comidas por nacionalidade`, () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/explore/foods/nationalities');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
  it(`${headerPhrase} na tela de perfil`, () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/profile');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
  it(`${headerPhrase} na tela de receitas feitas`, () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/done-recipes');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
  it(`${headerPhrase} na tela de receitas favoritas`, () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/favorite-recipes');

    const profile = screen.getByTestId(profileString);

    expect(profile).toBeInTheDocument();
  });
});
