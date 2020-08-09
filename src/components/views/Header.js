import React from 'react';
import CurrenyConverter from "./CurrenyConverter";

export default () => {
  return(
    <div className="header">
      <div className="container">
          <div className="row justify-content-between">
              <div className="col-6">
                  <div className="logo">
                      <a href="/"><h1 className="blog-header-logo text-dark">Shopping Cart</h1></a>
                  </div>
              </div>
              <div className="col-3 text-right">
                  <CurrenyConverter showLabel/>

              </div>
          </div>



      </div>
    </div>
  );
}
