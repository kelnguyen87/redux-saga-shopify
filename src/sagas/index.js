
import { put, takeLatest, all,takeEvery, call } from 'redux-saga/effects';
import {fetchAllProduct, fetchCollections, fetchProductDetail} from "../lib/Api"


// Fetch All Product
function* callGetProduct() {
    try {
        const data = yield call(fetchAllProduct);

        // dispatch a success action to the store with the new dog
        yield put({ type: "FETCH_PRODUCTS_SUCCESS", products: data  });
    } catch (error) {
        yield put({ type: "FETCH_PRODUCTS_FAILURE", error });
    }

}

// Fetch  Collection
function* callGetCollection(action) {
    console.log('callGetCollection');
    try {
        const data = yield call(fetchCollections,action.collectionId);

        // dispatch a success action to the store with the new dog
        yield put({ type: "FETCH_COLLECTION_SUCCESS", collections: data  });
    } catch (error) {
        yield put({ type: "FETCH_COLLECTION_FAILURE", error });
    }

}

// Fetch  Product Detail
function* callProductDetail(action) {

    try {
        const data = yield call(fetchProductDetail,action.productId);
        // dispatch a success action to the store with the new dog
        yield put({ type: "FETCH_DETAIL_SUCCESS", products: data  });
    } catch (error) {
        yield put({ type: "FETCH_DETAIL_FAILURE", error });
    }

}

function* actionWatcher() {
    yield takeLatest('GET_PRODUCTS', callGetProduct)
    yield takeEvery('GET_COLLECTION', callGetCollection)
    yield takeEvery('GET_PRODUCTS_DETAIL', callProductDetail)

}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
