import React from "react";
import Navigation from "../components/Navigation";

function NotFound() {
  return (
    <>
      <div className="errorMsg">
        <h1>Page Not Found</h1>

        <p>Our site could not find the requested web page</p>
      </div>
    </>
  );
}

export default NotFound;
