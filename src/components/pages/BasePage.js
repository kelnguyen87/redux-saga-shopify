import React, { Component } from 'react';
import Home from './Home';
import ShoppingCart from './ShoppingCart';
import ProductDetails from './ProductDetails';
import PageNotFound from '../views/PageNotFound';
import Header from '../views/Header';
import NavContainer from '../containers/NavContainer';
import Collection from "./Collections";

import {connect} from "react-redux";
import {closeMaxProductModal} from "../../actions";
import Modal from '../../components/UI/Modal/Modal';
import Footer from "../views/Footer";

 class BasePage extends Component {
  render() {
    let componentRendered = '';
    switch (this.props.pageName) {
      case "Home":
        componentRendered = <Home {...this.props}/>;
        break;
      case "collections":
        componentRendered = <Collection {...this.props}/>;
        break;

      case "ProductDetails":
        componentRendered = <ProductDetails {...this.props}/>;
        break;
      case "ShoppingCart":
        componentRendered = <ShoppingCart {...this.props}/>;
        break;
      default:
        componentRendered = <PageNotFound {...this.props}/>;
    };

    return(
      <div className="App">
        <Header />
        <NavContainer />
        {componentRendered}
        <Footer />
        {
          this.props.showModalProp &&
          <Modal closeModalClick={this.props.closeModalProp} showModal={this.props.showModalProp}>
            {this.props.modalMessageProp}
          </Modal>

        }
      </div>
    );
  }
}

const mapStateToProps = state => {
    return{
      storeCartItemsCount: state.cart.cartTotal,
      showModalProp: state.cart.productMaxShowModal,
      modalMessageProp: state.cart.modalMessage,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModalProp: () => dispatch(closeMaxProductModal())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BasePage);

