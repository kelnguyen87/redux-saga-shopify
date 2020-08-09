import React from 'react';
import {Link} from 'react-router-dom';
import AddToCart from './AddToCart';
import Price from "../helpers/Price";
import Discount from "../helpers/Discount";

export default ({product, currency}) => {
    const imageFade = product.ImageUrl2 !== null ? 'placeholder-img-fade': '';
    return (
        <div className="col-6 col-sm-3">
            <div className="product-box card mb-4 shadow-sm">
                <div className={`bd-placeholder-img ${imageFade} `}>
                    <Link to={"/product-detail/" + product.Handle}>
                        <img className="card-img-top" alt={product.Title} src={product.ImageUrl}/>
                        {product.ImageUrl2 !== null && <img className="card-img-top fade-image" alt={product.Title} src={product.ImageUrl2}/>}
                    </Link>
                    <Discount product={product}/>
                </div>
                <div className="card-body">
                    <h6 className="card-title">
                        <Link to={"/product-detail/" + product.Handle}>{product.Title}</Link>
                    </h6>
                    <p className="card-text ">Brand: {product.Vendor}</p>
                    <p className="card-price">
                        <Price product={product} currency={currency}/>
                    </p>

                    <p className="card-text d-none">Stock: {product.Inventory > 0 ? product.Inventory : 'Sold Out'}</p>

                    <AddToCart product={product}/>
                </div>
            </div>

        </div>
    );
}
