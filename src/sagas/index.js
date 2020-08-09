
import { put, takeLatest, all,takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

const BASE_URL = `https://wb-emarket.myshopify.com/api/graphql.json`;
const ShopifyHeaderValue = '6189349bead0a951a2dc2c1b80475364';
const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-Shopify-Storefront-Access-Token': ShopifyHeaderValue,
        'Content-Type': 'application/json',
    }
});

function fetchProduct(data) {

    if(data.length){
        return data.map((result, index) => {

            const nodes = result.node;
            const nodesImages = nodes.images.edges;
            const variants = nodes.variants.edges;

            const allimages = nodesImages.map((result, index) => {
                const nodes = result.node;
                const imagePath = nodes.transformedSrc;
                return {
                    _imagePath: `${imagePath}`
                };

            });

            const allvariants = variants.map((result, index) => {
                const nodes = result.node;

                const price = nodes.price;
                const compareAtPrice = nodes.compareAtPrice;
                return {
                    _price: `${price}`,
                    _compareAtPrice: `${compareAtPrice}`
                };

            });

            const ImageUrl2 = allimages[1] !== undefined ? `${allimages[1]._imagePath}`: null

            return {
                Id: `${nodes.id}`,
                Handle: `${nodes.handle}`,
                Title: `${nodes.title}`,
                Vendor: `${nodes.vendor}`,
                Inventory: 5,
                Description: `${nodes.descriptionHtml}`,
                Price: `${allvariants[0]._price}`,
                Discount_price: `${allvariants[0]._compareAtPrice}`,
                ImageUrl: `${allimages[0]._imagePath}`,
                ImageUrl2: ImageUrl2,

            };

        });
    }else{

        const nodes = data;
        const nodesImages = nodes.images.edges;
        const variants = nodes.variants.edges;

        const allimages = nodesImages.map((result, index) => {
            const nodes = result.node;
            const imagePath = nodes.transformedSrc;
            return {
                _imagePath: `${imagePath}`
            };

        });

        const allvariants = variants.map((result, index) => {
            const nodes = result.node;

            const price = nodes.price;
            const compareAtPrice = nodes.compareAtPrice;
            return {
                _price: `${price}`,
                _compareAtPrice: `${compareAtPrice}`
            };

        });

        const ImageUrl2 = allimages[1] !== undefined ? `${allimages[1]._imagePath}`: null;

        return {
            Id: `${nodes.id}`,
            Handle: `${nodes.handle}`,
            Title: `${nodes.title}`,
            Vendor: `${nodes.vendor}`,
            Inventory: 5,
            productType: `${nodes.productType}`,
            Description: `${nodes.descriptionHtml}`,
            Price: `${allvariants[0]._price}`,
            Discount_price: `${allvariants[0]._compareAtPrice}`,
            ImageUrl: `${allimages[0]._imagePath}`,
            ImageUrl2: ImageUrl2,

        };
    }

}

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

        return fetchProduct(data);
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
        const data = response.data.data.collectionByHandle.products.edges;
        return fetchProduct(data);

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

        return fetchProduct(data);
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
