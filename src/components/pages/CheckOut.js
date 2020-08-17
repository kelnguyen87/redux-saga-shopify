import React, {useState} from 'react';
import * as actions from "../../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Price from "../helpers/Price";
import CheckoutCartTotals from "../Checkout/CheckoutCartTotals";

const CheckOut =  (props)=>{
    const initialValue = {
        promoCode: '',
        showAlert: false,
        alertType: '',
        alertMessage: '',
        paymentMethod: "creditCard",
        shippingPrice: 300,
        usedDeliveryOption: 1,
        makeOrder: false,
        correctCardInfo: false,
        customerInfo: {
            firstName: {
                value: '',
                valid: false,
                touched: false,
                errorsMsg: '',
            },
            secondName: {
                value: '',
                valid: false,
                touched: false,
                errorsMsg: '',
            },
            email: {
                value: '',
                valid: false,
                touched: false,
                errorsMsg: '',
            }
        },
    };

    const {cartItems, cartItemCount,currency} = props;
    const [stateOptions, setStateValues] = useState(initialValue);

    const currencyKeys = Object.keys(currency);
    const currencyValue = currency[currencyKeys[0]];
    const currencyName = currency[currencyKeys[1]];

    let shippingPrice = stateOptions.shippingPrice ? Math.round(stateOptions.shippingPrice * currencyValue) : 0;
    let productTotals =  Math.round(props.subtotal * currencyValue);
    let vatPercentage = props.vatProps > 0 ? props.vatProps / 100 : 0;
    let vat = productTotals > 0 ? Math.round(productTotals * vatPercentage) : 0;
    let percentageDiscount = props.usedPromoCodeProp ? props.usedPromoCodeProp.percentage / 100 : 0;
    let discountAmount = productTotals * percentageDiscount;
    let shoppingTotal = productTotals > 0 ? ((productTotals + vat + shippingPrice) - discountAmount) : 0;

    const cartItemsMarkUp = cartItems.map((product, index) => {
        return (
            <li className="list-group-item" key={product.Id}>
                <div className={'d-flex flex-row'}>
                    <div className="shop-checkout-image">
                        <Link to={"/product-detail/" + product.Handle}>
                            <img className="card-img" alt={product.Title} src={product.ImageUrl}/>
                        </Link>
                    </div>
                    <div className="pl-3 checkout-product-info">
                        <h6 className="previewCartItem-name">
                            <Link to={"/product-detail/" + product.Handle}>{product.Title} </Link>
                        </h6>
                        <p className="previewCartItem-price"><small>Quantity: {product.Count}</small></p>
                        <p className="previewCartItem-price">
                            <Price product={product} currency={currency}/>
                        </p>

                    </div>
                </div>



            </li>
        )
    });

    return(
        <div className="container main-container">
            <div className="row">
                <div className="col-md-8 mb-8">
                </div>
                <div className="col-md-4 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Order Review</span>
                        <span className="badge badge-secondary badge-pill">{props.cartTotalProp}</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {/* items in cart */}
                        {cartItemsMarkUp}

                        {/* checkout totals */}
                        <CheckoutCartTotals
                            productTotals={productTotals}
                            vat={vat}
                            shippingPrice={shippingPrice}
                            shoppingTotal={shoppingTotal}
                            currency={props.currency}/>
                    </ul>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    //const cartCount = countCart(state.cart.cartItem);
    return {
        productProps: state.products,
        usedPromoCodeProp: 300,
        vatProps: state.cart.vat,
        cartTotalProp: state.cart.cartTotal,
        cartItems: state.cart.cartItem,
        currency: state.currency.usedCurrency
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // confirmOrderProp: (order) => dispatch(confirmOrder(order, ownProps)),
        // setPromoCodeProp: (promoCode, percentage) => dispatch(setPromoCode(promoCode, percentage)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
