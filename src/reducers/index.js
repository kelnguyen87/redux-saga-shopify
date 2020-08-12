import { combineReducers } from 'redux';

// Reducers
import cartReducer from './cartReducer';
import productsReducer from './productsReducer';
import currencyReducer from "./currencyReducer";

// Combine Reducers
export default combineReducers({
  cart: cartReducer,
  products: productsReducer,
  currency: currencyReducer,
});
