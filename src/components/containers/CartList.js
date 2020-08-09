import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {confirmAlert} from 'react-confirm-alert';
import {connect} from 'react-redux'
import 'react-confirm-alert/src/react-confirm-alert.css';

import * as actions from '../../actions';
import CartItem from '../views/CartItem';
import CartTotal from '../views/CartTotal';

class CartList extends Component {


    handleChangeCartQuantity = (field_value, productId) => {

        if(field_value > 0) this.props.updateCart(field_value, productId);

    }


    handleRemoveCartItem = (product) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="react-confirm-alert-body">
                        <h4>Remove {product.Title}</h4>
                        <p>Are you sure want to remove this product from your cart?</p>
                        <div className="react-confirm-alert-button-group">
                            <button className="btn  btn-secondary" onClick={onClose}>No</button>
                            <button className="btn  btn-secondary" id="btn-confirm-delete-cart"
                                    onClick={() => {
                                        this.props.removeFromCart(product.Id, product.Count);
                                        onClose();
                                    }}
                            >
                                Yes, Remove it!
                            </button>
                        </div>
                    </div>
                );
            }
        });
    }

    render() {

        const cartItemsMarkUp = this.props.cartProductsProp.map((productInCart, index) => {
            return <CartItem
                key={productInCart.Id}
                product={productInCart}
                handleRemoveCartItem={this.handleRemoveCartItem}
                handleChangeCartQuantity={(event) => this.handleChangeCartQuantity(event.target.value, productInCart.Id)}
                counter={index + 1}
                currency={this.props.usedCurrencyProp}
            />
        }


        );

        const cartTotal = this.props.cartProductsProp.map(item => item.Price * item.Count).reduce((total, num) => (total + num), 0);

        return (
            <div className="container">
                <h3 className="center my-cart">My Cart ({this.props.cartTotalProp})</h3>
                {this.props.cartTotalProp > 0
                    ?
                    <form id="cart-form" >
                        <div className="table-responsive">
                            <table className="table" >
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col" width="200px">Quantity</th>

                                </tr>
                                </thead>

                                <tbody>
                                {cartItemsMarkUp}
                                </tbody>

                                <CartTotal
                                    subtotal={cartTotal}
                                    cartItemCount={this.props.cartTotalProp}
                                    vat={this.props.vatProp}
                                    currency={this.props.usedCurrencyProp}
                                />
                            </table>
                        </div>

                        <div className="row justify-content-end container-proceed-cart">
                            <div className="col-lg-5 col-md-5 col-sm-6 col-xs-8">
                                <div className="btn-group" role="group" aria-label="Clear Cart">
                                    <button onClick={this.props.clearFormCart} type="submit" className="btn btn-outline-primary">Clear cart</button>
                                </div>

                                <div className="btn-group" role="group" aria-label="Update Cart">
                                    <Link to={'/'} className="btn btn-outline-primary">Continue shopping</Link>
                                </div>
                                <div className="btn-group" role="group" aria-label="Checkout">
                                    <button type="button" className="btn btn-primary">Checkout</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    :
                    <h4 className="row justify-content-center cart-empty">Your Cart is empty!</h4>
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    //const cartCount = countCart(state.cart.cartItem);
    return {
        productProps: state.products,
        vatProp: state.cart.vat,
        cartTotalProp: state.cart.cartTotal,
        cartProductsProp: state.cart.cartItem,
        usedCurrencyProp: state.cart.usedCurrency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (productId, count) => {dispatch(actions.removeFromCartAction(productId, count))},
        clearFormCart: () => dispatch(actions.clearCart()),
        updateCart: ( value,productId) => {dispatch(actions.updateCartAction( Number(value),productId))}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
