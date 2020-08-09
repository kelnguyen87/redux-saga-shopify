import * as types from '../actions/action-types';

const initialState = {
    allProducts: [],
    loading: false,
    productDetails: [],
    error: [],
    collections:[],
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCTS:
            return {...state, loading: true};

        case types.FETCH_PRODUCTS_SUCCESS:
            const allProducts = action.products;
            return {...state, ...{allProducts}, loading: false};

        case types.FETCH_PRODUCTS_FAILURE:
            return {...state,  allProducts: null, error: action.error.message,  loading: false};

        case types.GET_COLLECTION:
            return {...state, loading: true};

        case types.FETCH_COLLECTION_SUCCESS:
            const collections = action.collections;

            return {...state, ...{collections}, loading: false};

        case types.FETCH_COLLECTION_FAILURE:
            return {...state,  collections: null, error: action.error.message,  loading: false};

        case types.GET_PRODUCTS_DETAIL:
            return {...state, loading: true};

        case types.FETCH_DETAIL_SUCCESS:
            const productDetails = action.products;
            return {...state, ...{productDetails}, loading: false};

        case types.FETCH_DETAIL_FAILURE:
            return {...state,  productDetails: null, error: action.error.message,  loading: false};

        default:
            return state;
    }
}

export default productsReducer;
