import React, { useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import * as actions from '../../actions';
import ProductList from "../containers/ProductList";

const Collections = (props) => {
  const { match: { params: { collectionId } } } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCollection(collectionId))
  }, [dispatch,collectionId]);
  //console.log(props.collections.products);
  //return true;

  return(
        <ProductList
            collections={props.collections}
            products={props.collections.products}
            loading={props.loading}
            usedCurrencyProp={props.usedCurrencyProp}
            cart={props.cart}
            pageName={collectionId}
            addToCartAction={props.addToCartAction}
            errorMsg = {props.errorMsg}
        />
  );
}


const mapStateToProps = state => {

  return {
    collections: state.products.collections,
    loading :state.products.loading,
    usedCurrencyProp: state.currency.usedCurrency,
    cart: state.cart.cartItem,
    errorMsg:state.products.error
  }
}

export default connect(mapStateToProps, actions)(Collections);
