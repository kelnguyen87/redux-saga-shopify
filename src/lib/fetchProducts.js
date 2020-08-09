import axios from 'axios';

export function fetchProducts() {
  return axios.get('/data/ProductData.json')
      .then(response => {
        return response.data.Products;
      })
      .catch(error => {
        console.log(error);
      });

}
/*
export function fetchProductDetails(productUrl) {

    return axios.get("/data/ProductData.json")
        .then(response => {
            const ProductDetail = response.data.Products.filter(product => {
                return product.Id == productUrl
            });
            return ProductDetail;
        })
        .catch(error => {
            console.log(error);
        });

}

*/
export function fetchProductDetails(id) {
    return fetch("/data/ProductData.json")
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            return json.Products.filter(product => {
                if (product.Id === id) {
                    return true;
                }
                else {
                    return false;
                }
            });
        });
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
