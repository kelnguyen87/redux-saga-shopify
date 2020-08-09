import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeCurrency} from '../../actions';
class CurrenyConverter extends Component {

    currencyChangeHandler = (event) => {
        this.props.changeCurrencyProp(event.target.value)
    };

    render() {

        return (
            <div className="form-group row">
                {this.props.showLabel ? <label  className="col-sm-4 col-form-label"> Currency</label> : null}
                <div className="col-sm-8">
                <select className={'form-control'}
                    value={Object.keys(this.props.usedCurrencyProp)[0]}
                    onChange={this.currencyChangeHandler}
                >
                    { Object.keys(this.props.exchangeRatesProps.rates).map((rateName, index) => (
                             <option
                                key={index}
                                value={rateName}
                            >
                                {rateName}
                            </option>
                        ))
                    }
                </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        exchangeRatesProps: state.cart.exchangeRates,
        usedCurrencyProp:state.cart.usedCurrency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeCurrencyProp: (currencyName) => dispatch(changeCurrency(currencyName))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrenyConverter);
