import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodPage from './pages/FoodsPage';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route path="/foods" component={ FoodPage } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
