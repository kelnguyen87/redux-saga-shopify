import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './index.scss';

import RootStoreProvider from './RootStoreProvider';
import BasePage from './components/pages/BasePage';

/*
 * BasePage is used to include Header, Footer etc.
 * With this we can skip header footer for any page to render directly.
 */
ReactDOM.render(
  <RootStoreProvider>
    <Switch>
      <Route exact path="/"
        render={routeProps => (<BasePage {...routeProps} pageName="Home" />)} />

        <Route path="/collections/:collectionId"
               render={routeProps => (<BasePage {...routeProps} pageName="collections" />)} />
        <Route path="/shopping-cart"
               render={routeProps => (<BasePage {...routeProps} pageName="ShoppingCart" />)} />
        <Route path="/checkout"
               render={routeProps => (<BasePage {...routeProps} pageName="CheckOut" />)} />
        <Route exact path="/product-detail/:productId"
               render={routeProps => (<BasePage {...routeProps} pageName="ProductDetails" />)} />
        <Route path="*"
               render={routeProps => (<BasePage {...routeProps} pageName="PageNotFound" />)} />
    </Switch>
  </RootStoreProvider>,
  document.getElementById('root')
);
