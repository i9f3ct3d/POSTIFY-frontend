import React from "react";
import "./http-error.css";

const Httperror=props=>
{
    return(
        <div>
            <div className="error-div">
                <i className="far fa-frown fa-10x" ></i>
                <h1>404</h1>
                <h2>Page not found</h2>
                <p>The Page you are looking for doesn't exists or another error occured</p>
                <h6>Go to</h6><a href="/login"> Login </a><h6>page </h6>
            </div>
        </div>
    )
}
export default React.memo(Httperror);