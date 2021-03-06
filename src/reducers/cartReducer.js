import * as types from '../actions/action-types';

const initialState = {
    cartItem: [],
    cartTotal: 0,
    vat: 10, //vat in percentage
    productMaxShowModal: false,
    modalMessage: null,

}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            let newCartItem = state.cartItem;
            let newCartTotal = state.cartTotal;
            let productMaxShowModal = state.productMaxShowModal;
            let modalMessage = state.modalMessage;

            if(action.Quantity <=0){
                productMaxShowModal = !state.productMaxShowModal;
                modalMessage = 'Sorry! This product is out of stock';
            }else{

                let chkProductInCart = state.cartItem.find( product => product.Id === action.productId);
                if(chkProductInCart){
                    if(chkProductInCart.Count < action.Quantity){
                        newCartItem = state.cartItem.map(product=>(
                            product.Id === action.productId ? {...product, Count: product.Count + 1}: product
                        ));
                        newCartTotal = state.cartTotal + 1;
                    }else {
                        productMaxShowModal = !state.productMaxShowModal;
                        modalMessage = 'Sorry! Your product order cannot exceed our stock';
                    }
                }else{
                   // newCartItem = state.cartItem.concat({Id: action.productId,Title:action.Title,Price:action.Price, ImageUrl:action.ImageUrl, Count: 1});
                    newCartItem = [
                        ...state.cartItem,
                        {
                            Id:action.productId,
                            Title:action.Title,
                            Price:action.Price,
                            Discount_price:action.Discount_price,
                            ImageUrl:action.ImageUrl,
                            Handle:action.Handle,
                            Quantity:action.Quantity,
                            Count: 1
                        }
                    ]
                    newCartTotal = state.cartTotal + 1;
                }
            }

            return {
                ...state,
                cartTotal: newCartTotal,
                cartItem: newCartItem,
                productMaxShowModal: productMaxShowModal,
                modalMessage: modalMessage
            }


        case types.REMOVE_FROM_CART:
              let CartItem = state.cartItem.filter( product => product.Id !== action.productId);
            return {
                ...state,
                cartTotal: state.cartTotal - action.productCount,
                cartItem: CartItem
            }
        case  types.CLEAR_CART:
            return{
                ...state,
                cartTotal: 0,
                cartItem: []
            }
        case types.UPDATE_CART:
            let updateMaxShowModal = state.productMaxShowModal;
            let updateModalMessage = state.modalMessage;
            let product = state.cartItem.find(product => product.Id === action.productId)
            let cartTotal = state.cartTotal;

            let newCartItemUpdate = state.cartItem;
            if(product){

                if(action.newCountValue <= product.Quantity){
                    cartTotal = state.cartTotal + ( action.newCountValue - product.Count);
                    newCartItemUpdate = state.cartItem.map(
                        product => product.Id === action.productId ? {...product,Count: action.newCountValue}: product
                    )
                }else{
                    updateMaxShowModal = !state.productMaxShowModal;
                    updateModalMessage = 'Sorry! Your product order cannot exceed our stock';
                }

            }
            return {
                ...state,
                cartItem: newCartItemUpdate,
                cartTotal: cartTotal,
                productMaxShowModal: updateMaxShowModal,
                modalMessage: updateModalMessage
            }
        case types.CLOSE_MAX_PRODUCT_MODAL:
            return {
                ...state, productMaxShowModal: !state.productMaxShowModal
            }

        default:

            return state;
    }
}

export default cartReducer;
