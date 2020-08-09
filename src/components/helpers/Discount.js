import React from 'react';

export default (props) => {
    const {product} = props;

    if (product.Discount_price !== 'null') {
        return (
            <span className="shop-card-discount">
               {Math.round(((product.Discount_price - product.Price) * 100) / product.Discount_price)}% Off
           </span>
        );
    }
    return false;

}
