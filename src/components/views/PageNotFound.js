import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {

  return(
    <div className="bg-purple">
      <div className="text-center p-5">
        <div className="custom-navbar p-3">
          <h3 className="brand-logo">
           Page Not Found
          </h3>
        </div>
        <div className="central-body">
          <Link to="/" className="btn  btn-secondary">GO BACK HOME</Link>
        </div>

      </div>
    </div>
  );
}
