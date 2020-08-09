import React from 'react';
import CartUpdateForm from './CartUpdateForm';
import Price from "../helpers/Price";

export default (props) => {
    const {product} = props;

    return (
        <tr className={"row-" + product.Id}>

            <th scope="row">
                <img className={'shop-cart-image'} width={'60px'}
                     src={product.ImageUrl}
                     alt={product.Title}/>
            </th>
            <td>{product.Title}</td>
            <td>
                <Price product={product} currency={props.currency}/>
            </td>
            <td>
                <CartUpdateForm product={props.product}
                                cartFormElement={props.cartFormElement}
                                handleRemoveCartItem={props.handleRemoveCartItem}
                                handleChangeCartQuantity={props.handleChangeCartQuantity}/>
            </td>

        </tr>
    );
}
