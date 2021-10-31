import React from 'react';

import './signupLoginButton.css'

const SignupLoginButton = (props) =>{

    return(
        <button
            style={{background:props.background, borderColor:props.borderColor}} 
            className="signup-login-button-div"
            >
            <div className="button-gloss">

            </div>
            <div className="signup-login-button-bottom-div">
                
            </div>
            <span className="signup-login-button-content" style={{color: props.textColor}}>
                <i className={`${props.iconClassName} signup-login-button-icon`}></i><p className="signup-login-button-text">{props.buttonText}</p>
            </span>
        </button>
    );

}

export default React.memo(SignupLoginButton);