import * as types from '../actions/action-types';

const initialState = {
    // used currency should load with the default currency name and rate
    usedCurrency: {"USD": 1,"symbol":"$"},
    // exchange rates can be got from any api source
    exchangeRates: {
        "base": "USD",
        "date": "2020-08-04",
        "rates": {
            "USD": 1,
            "EUR": 0.8499787505,
            "VND": 23000.00
        }
    },
    // overkill but doing it for fun
    currencySymbols: {
        "USD": '$',
        "EUR": '€',
        "VND": 'đ'
    }
}
const currencyReducer = (state = initialState, action) => {
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

export default currencyReducer;
