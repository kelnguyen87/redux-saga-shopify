import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../views/NavBar';
import NavCartCount from '../views/NavCartCount';
import * as actions from "../../actions";

const NavContainer = (props) =>{
  return(
      <nav className="navbar navbar-expand-md bg-dark navbar-dark mb-5">
          <div className="container">
              <NavBar />
              <NavCartCount
                  cartItems={props.cart}
                  cartItemCount={props.cartItemCount}
                  currency={props.usedCurrencyProp}
                  handleRemoveCartItem={props.removeFromCart}
              />
          </div>

      </nav>
)

}

const mapStateToProps = state => {
    return {
        cart: state.cart.cartItem,
        cartItemCount: state.cart.cartTotal,
        usedCurrencyProp: state.currency.usedCurrency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (productId, count) => {dispatch(actions.removeFromCartAction(productId, count))}
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(NavContainer);
