import React, { useState , forwardRef } from 'react';

import './inputField.css';

const InputField = (props , ref) =>{

    const [eyeClicked , setEyeClicked] = useState(true);

    const inputValueOnChangeHandler=(e)=>{
        props && props.onChange && props.onChange(e);
    }

    return(
        <div className="inputfield-input-div">
            <input style={props && props.style && props.style} name={props && props.name && props.name} ref = {ref} autoComplete="new-password" type={(eyeClicked) ? props.type : "text"} onChange={inputValueOnChangeHandler} className="inputfield-input" required/>
            <span style={{background : props && props.placeholderBackground && props.placeholderBackground}} className="inputfield-input-placeholder">
                {props.placeholder}
            </span>
            {props.type === "password" && <i onClick={()=>{setEyeClicked(prev => !prev)}} className={`far fa-eye${eyeClicked ? "-slash":""} password-viewer`}  required></i>}
        </div>
        
    );
}

export default React.memo(forwardRef(InputField));