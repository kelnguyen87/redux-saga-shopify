import * as types from '../actions/action-types';

const initialState = {
    orderSuccess: false,
    promoCode: [
        {
            code: 'TENPERCENT',
            percentage: 10
        },
        {
            code: 'FIVEPERCENT',
            percentage: 5
        }
    ],
    usedPromoCode: null,
    deliveryOptions: [
        {
            id: 1,
            name: 'standard',
            duration: '24 - 72 hours',
            cost: 300
        },
        {
            id: 2,
            name: 'fastest',
            duration: '1 - 24 hours',
            cost: 1000
        }
    ],
}
const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_CURRENCY:
            let    currencyName= null;
            let    currencyValue= null;
            let    currencyObj = {};

            let currencyNameSearch = Object.keys(state.exchangeRates.rates).filter(rate => rate === action.currencyName );

            if(currencyNameSearch){
                currencyName = action.currencyName;
                currencyValue = state.exchangeRates.rates[currencyName];

                currencyObj[currencyName] = currencyValue;
                currencyObj['symbol'] = state.currencySymbols[currencyName];

            }

            return {
                ...state,
                // just in case the currency is not found
                usedCurrency: currencyNameSearch ? currencyObj : this.state.usedCurrency
            }
        default:

            return state;
    }
}

export default checkoutReducer;
