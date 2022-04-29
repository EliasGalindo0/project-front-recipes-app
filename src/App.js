import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodPage from './pages/FoodsPage';
import Provider from './Context/Provider';
import DrinksPage from './pages/DrinksPage';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredient from './pages/ExploreDrinksIngredients';
import ExploreFoodNationalities from './pages/ExploreFoodsNationalities';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <Switch>
        <Route
          path="/"
          component={ Login }
          exact
        />

        <Route
          path="/foods"
          component={ FoodPage }
          exact
        />

        <Route
          path="/drinks"
          component={ DrinksPage }
          exact
        />

        <Route
          path="/explore"
          component={ Explore }
          exact
        />

        <Route
          path="/explore/foods"
          component={ ExploreFoods }
          exact
        />

        <Route
          path="/explore/drinks"
          component={ ExploreDrinks }
          exact
        />

        <Route
          path="/explore/foods/ingredients"
          component={ ExploreFoodsIngredients }
          exact
        />

        <Route
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredient }
          exact
        />

        <Route
          path="/explore/foods/nationalities"
          component={ ExploreFoodNationalities }
          exact
        />

        <Route
          path="/profile"
          component={ Profile }
          exact
        />

        <Route
          path="/done-recipes"
          component={ DoneRecipes }
          exact
        />

        <Route
          path="/favorites-recipes"
          component={ FavoriteRecipes }
          exact
        />
      </Switch>
    </Provider>
  );
}

export default App;
