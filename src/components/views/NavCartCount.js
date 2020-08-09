import React, { useState } from 'react';
import { Link  } from 'react-router-dom';
import Price from "../helpers/Price";


export default (props) => {
    const {cartItems,cartTotal} = props;
   // console.log(props);
    const [listStatus, setlistStatus] = useState(false);
    const toggleList = () => {
        setlistStatus(!listStatus);
    }

    const cartItemsMarkUp = cartItems.map((product, index) =>{
        return (
            <li className="previewCartItem" key={product.Id} >
                <div className="previewCartItem-image">
                    <Link to={"/product-detail/" + product.Id}>
                        <img className="card-img" alt={product.Title} src={product.ImageUrl} />
                    </Link>
                </div>
                <div className="previewCartItem-content">
                    <h5 className="previewCartItem-name">
                        <Link to={"/product-detail/" + product.Id}>{product.Title}</Link>
                    </h5>
                    <p className="previewCartItem-price">Quantity: {product.Count}</p>
                    <p className="previewCartItem-price">
                        <span style={{marginRight:"5px"}}>Price:</span>
                        <Price product={product} currency={props.currency}/>
                    </p>
                </div>

            </li>
            )

    });


    return(
    <div className="dropdown">

      <Link id="nav-view-cart-link" onClick={ toggleList} to={'#'} className="btn btn-secondary">
        Cart (items { cartTotal })
      </Link>
        {listStatus && (
            <div className="dropdown-menu show dropdown-previewcart">
                {cartItems.length ? (
                    <ul className="previewCart">
                        {cartItemsMarkUp}
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
