import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../views/NavBar';
import NavCartCount from '../views/NavCartCount';
import * as actions from "../../actions";

class NavContainer extends Component {

  render() {
      return(
          <nav className="navbar navbar-expand-md bg-dark navbar-dark mb-5">
              <div className="container">
                  <NavBar />
                  <NavCartCount
                      cartItems={this.props.cart}
                      cartItemCount={this.props.cartItemCount}
                      currency={this.props.usedCurrencyProp}
                      handleRemoveCartItem={this.props.removeFromCart}
                  />
              </div>

          </nav>
    )
  }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cartItem,
        cartItemCount: state.cart.cartTotal,
        usedCurrencyProp: state.cart.usedCurrency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (productId, count) => {dispatch(actions.removeFromCartAction(productId, count))}
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(NavContainer);
