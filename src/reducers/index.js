import { combineReducers } from 'redux';

// Reducers
import cartReducer from './cartReducer';
import productsReducer from './productsReducer';
import currencyReducer from "./currencyReducer";
import checkoutReducer from "./checkoutReducer";
// Combine Reducers
export default combineReducers({
  cart: cartReducer,
  products: productsReducer,
  currency: currencyReducer,
  checkout: checkoutReducer,
});
