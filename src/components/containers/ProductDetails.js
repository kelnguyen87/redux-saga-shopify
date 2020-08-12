import React, { useEffect} from 'react';
import {connect,useDispatch} from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import * as actions from '../../actions';
import AddToCart from '../views/AddToCart';
import {AddToCartContext} from '../../contexts/AddToCartContext';
import Loading from "../helpers/Loading";
import Price from "../helpers/Price";

const ProductDetails = (props) =>{
    const dispatch = useDispatch();
    const {loading, productDetails,errorMsg} = props;

    useEffect(()=>{
        dispatch(actions.getProductDetails(props.productId))
        },[dispatch,props.productId])


    if (loading) return <Loading />;

    if(errorMsg.length) return <div className="container text-center"><p style={{ color: "red" }}>{errorMsg}</p></div>

    return (
       // Passing AddToCartContext as it might be used at any deep level child.
       <AddToCartContext.Provider value={{action: props.addToCartAction}}>
           <React.Fragment>
               <div className={'row'}>
                   <div className='col-lg-4'>
                       <div className="text-center mb-3">
                           <img alt={productDetails.Title}
                                src={productDetails.ImageUrl}/>
                       </div>
                   </div>
                   <div className='col-lg-6'>
                       <h3 className="center mb-3"> {productDetails.Title}</h3>
                       <p className="card-text ">
                           <b>inventory:</b> {productDetails.Inventory}
                       </p>
                       <p className="card-text"><b>Made by:</b> {productDetails.Vendor}</p>
                       <p className="card-text">
                           <b>productType:</b> {productDetails.productType}</p>
                       <p className="card-text mb-5">

                           <Price product={productDetails} currency={props.usedCurrencyProp}/>
                       </p>
                       <div className={'mb-5'}>
                           <AddToCart product={props.productDetails}/>
                       </div>
                   </div>
               </div>

               <div className="product-box  mb-3">
                       {ReactHtmlParser(productDetails.Description)}

               </div>
           </React.Fragment>
       </AddToCartContext.Provider>
   );

}

const mapStateToProps = state => {
    return {
        productDetails: state.products.productDetails,
        loading :state.products.loading,
        usedCurrencyProp: state.currency.usedCurrency,
        errorMsg:state.products.error

    };
}

export default connect(mapStateToProps, actions)(ProductDetails);
