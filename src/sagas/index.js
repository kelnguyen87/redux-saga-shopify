
import { put, takeLatest, all,takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import fetchSmart, {fetchCollection} from "../lib/fetchProducts";

const BASE_URL = `https://wb-emarket.myshopify.com/api/graphql.json`;
const ShopifyHeaderValue = '6189349bead0a951a2dc2c1b80475364';
const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-Shopify-Storefront-Access-Token': ShopifyHeaderValue,
        'Content-Type': 'application/json',
    }
});

function getProduct() {
    const data = {
        query: `{
            products(first: 30) {
              edges {
                node {
                    id 
                    title
                    handle 
                    description 
                    vendor
                    images(first: 2) {
                        edges {
                            node {
                                id
                                altText
                                originalSrc 
                                transformedSrc(maxWidth: 350, scale: 1)
                            }
                        }
                    }
                    variants(first:5){
                        edges{
                          node{
                            id
                            title
                            compareAtPrice
                            price 
                            selectedOptions{
                              name
                              value
                            }
                          }
                        }
                    }
                   
                }
              }
             
            }
        }`
    };
    return  instance.post(null, data).then(response => {
        const data = response.data.data.products.edges;
        return fetchSmart(data);
    }).catch(error => {
        console.log(error);
    });

}

function getCollection(collectionId) {
    const data = {
        query: `
        {collectionByHandle(handle:"${collectionId}") {
             
              id
              description
              title
                image{
                id
                originalSrc
                transformedSrc
              }
              products(first: 30 ) {
                edges {
                  node {
                    id 
                title
                handle 
                vendor
                description
                images(first: 2) {
                  edges {
                    node {
                      id
                      altText
                      originalSrc 
                      transformedSrc(maxWidth: 350, scale: 1)
                    }
                  }
                }
                variants(first:5){
                    edges{
                        node{
                            id
                            title
                            sku 
                            compareAtPrice
                            price 

                            selectedOptions{
                                name
                                value
                            }
                        }
                    }
                }
                  }
                  cursor
                }
                pageInfo {
                  hasNextPage
                }
              }
            }
        
        }`
    };
    return  instance.post(null, data).then(response => {
        const dataCollection = response.data.data.collectionByHandle;
        console.log(dataCollection);
        return fetchCollection(dataCollection);

    }).catch(error => {
        console.log(error);
    });

}

function GetProductDetail(productId) {
    const data = {
        query: `{
            productByHandle(handle: "${productId}"){
                id
                title
                handle
                productType
                vendor
                tags
                createdAt
                description
                descriptionHtml
                
                collections(first: 5) {
                    edges {
                        node {
                        handle
                        }
                    }
                }
                images(first: 5) {
                    edges {
                        node {
                            id
                            altText
                            originalSrc 
                            transformedSrc 
                        }
                    }
                }
                options {
                    name
                }
                variants(first:5){
                    edges{
                        node{
                            id
                            title
                            sku 
                            compareAtPrice
                            price 
                            
                            selectedOptions{
                                name
                                value
                            }
                        }
                    }
                }
               
            }
          }`
    };
    return  instance.post(null, data).then(response => {
        const data = response.data.data.productByHandle;

        return fetchSmart(data);
    }).catch(error => {
        console.log(error);
    });

}

function* callGetProduct() {
    try {
        const data = yield call(getProduct);

        // dispatch a success action to the store with the new dog
        yield put({ type: "FETCH_PRODUCTS_SUCCESS", products: data  });
    } catch (error) {
        yield put({ type: "FETCH_PRODUCTS_FAILURE", error });
    }

}

function* callGetCollection(action) {
    try {
        const data = yield call(getCollection,action.collectionId);

        // dispatch a success action to the store with the new dog
        yield put({ type: "FETCH_COLLECTION_SUCCESS", collections: data  });
    } catch (error) {
        yield put({ type: "FETCH_COLLECTION_FAILURE", error });
    }

}


function* callProductDetail(action) {

    try {
        const data = yield call(GetProductDetail,action.productId);
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
