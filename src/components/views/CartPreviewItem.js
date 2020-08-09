import React from 'react';

export default (props) => {
  //const {product} = props;
  return(
      <div className="previewCart">
          <ul className="previewCartList">
              <li className="previewCartItem">
                  <div className="previewCartItem-image">

                  </div>

                  <div className="previewCartItem-content">
                        <span className="previewCartItem-brand">
                            OFS
                        </span>
                      <h6 className="previewCartItem-name">
                          <a href="https://wikitheme1-sandbox.mybigcommerce.com/sample-chemex-coffeemaker-3-cup-consetetur-sadipscing-elitr/"
                             alt="[Sample] Chemex Coffeemaker 3 Cup  consetetur sadipscing elitr"
                             title="[Sample] Chemex Coffeemaker 3 Cup  consetetur sadipscing elitr">[Sample] Chemex
                              Coffeemaker 3 Cup consetetur sadipscing elitr</a>
                      </h6>

                      <span className="previewCartItem-price">
                                $49.50
                        </span>
                  </div>
              </li>
          </ul>
          <div className="previewCartAction">
              <div className="previewCartAction-checkout">
                  <a href="/checkout" className="button button--primary">
                      Check out
                  </a>
              </div>

              <div className="previewCartAction-viewCart">
                  <a href="/cart.php" className="button button--action">
                      View Cart
                  </a>
              </div>

          </div>
      </div>
  );
}
