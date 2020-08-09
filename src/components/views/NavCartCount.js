import React, { useState } from 'react';
import { Link  } from 'react-router-dom';
import Price from "../helpers/Price";


export default (props) => {
    const {cartItems, cartItemCount,currency} = props;
    const [listStatus, setlistStatus] = useState(false);
    const toggleList = () => setlistStatus(!listStatus);

    const currencyKeys = Object.keys(currency);
    const currencyValue = currency[currencyKeys[0]];
    const currencyName = currency[currencyKeys[1]];

    const cartTotal = cartItems.map(item => item.Price * item.Count).reduce((total, num) => (total + num), 0);
    const subTotal =  Math.round(cartTotal * currencyValue);

    const cartItemsMarkUp = cartItems.map((product, index) =>{
        return (
            <li className="previewCartItem" key={product.Id} >
                <div className="previewCartItem-image">
                    <Link to={"/product-detail/" + product.Handle}>
                        <img className="card-img" alt={product.Title} src={product.ImageUrl} />
                    </Link>
                </div>
                <div className="previewCartItem-content">
                    <h5 className="previewCartItem-name">
                        <Link to={"/product-detail/" + product.Handle}>{product.Title} </Link>
                    </h5>
                    <p className="previewCartItem-price">Quantity: {product.Count}</p>
                    <p className="previewCartItem-price">
                        <Price product={product} currency={currency}/>
                    </p>

                </div>
                <div className="previewCartItem-remove">
                    <button
                       onClick={() => {
                           props.handleRemoveCartItem(product.Id, product.Count);
                       }}
                       className="btn btn-danger btn-sm cart__remove">×</button>

                </div>

            </li>
            )
    });

    const cartItemCounntText = cartItemCount <= 1? `item ${cartItemCount}`: `items ${cartItemCount}`;

    return(
    <div className="dropdown">

          <Link id="nav-view-cart-link" onClick={ toggleList} to={'#'} className="btn btn-secondary">
            Cart ({ cartItemCounntText })
          </Link>

        {listStatus && (
            <div className="dropdown-menu show dropdown-previewcart">
                {cartItems.length ? (
                    <ul className="previewCart">
                        {cartItemsMarkUp}
                        <li className="previewCartItem">
                            <div className={'col-sm-6'}>
                                Subtotal
                            </div>
                            <div className={'col-sm-6 text-right'}>
                                <strong>
                                {currencyName === 'đ' ? (`${subTotal.toLocaleString()}${currencyName}`) : `${currencyName}${subTotal.toLocaleString()}`}
                                </strong>
                            </div>
                        </li>
                        <li className="previewCartItem">
                            <Link  to={"/shopping-cart"} onClick={ () => setlistStatus(false)}  className="btn btn-secondary btn-block">
                                My cart
                            </Link>

                        </li>
                    </ul>
                ):(
                    <ul className="previewCart-emty">
                        <li className="previewCartItem">
                            <p className=" justify-content-center cart-empty">Your Cart is empty!</p>
                        </li>
                    </ul>
                )}


            </div>
        ) }

    </div>
  );
}
