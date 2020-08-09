import * as types from './action-types';

export function addToCartAction(product) {

  return {
    type: types.ADD_TO_CART,
    productId: product.Id,
    Title: product.Title,
    Price: product.Price,
    Discount_price: product.Discount_price,
    ImageUrl: product.ImageUrl,
    Quantity: product.Inventory
  };
}

export function removeFromCartAction(productId, count) {
  return {
    type: types.REMOVE_FROM_CART,
    productId: productId,
    productCount: count
  };
}

export const clearCart = () => {
  return {
    type: types.CLEAR_CART
  }
};

export function updateCartAction(value, productId) {

  return {
    type: types.UPDATE_CART,
    newCountValue: value,
    productId: productId,
  };
}

export function getProducts() {
  return {
    type: types.GET_PRODUCTS,
  };
}

export function getCollection(collectionId) {

  return {
    type: types.GET_COLLECTION,
    collectionId: collectionId
  };
}


export function getProductDetails(productId) {
  return {
    type: types.GET_PRODUCTS_DETAIL,
    productId: productId
  };
}

export const closeMaxProductModal = () => {
  return {
    type: types.CLOSE_MAX_PRODUCT_MODAL
  }
};

export const changeCurrency = (currencyName) => {
  // currency value can be fetched here from an external api and then passes to the store
  return {
    type: types.CHANGE_CURRENCY,
    currencyName: currencyName
  }
};
