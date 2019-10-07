import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Error404 from './pages/Errors/Error404';
import LoginPage from './pages/Auth/Login';
import HomePage from './pages/Home';
import AdminPage from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/admin" component={AdminPage} />
        <Route exact path="/404" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
