import React from "react";
import { Link } from "react-router-dom";

const NoResult = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src="/images/no_result.gif"
            alt="Not-found"
          />
          {/* <button className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">
            <Link to="/" className="text-white text-decoration-none">
              Home page
            </Link>
          </button> */}
        </div>
      </div>
    </>
  );
};

export default NoResult;
