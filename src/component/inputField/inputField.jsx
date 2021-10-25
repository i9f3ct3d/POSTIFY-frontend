import React, { useRef, useState } from 'react';

import './inputField.css';

const InputField = (props) =>{

    const [eyeClicked , setEyeClicked] = useState(false);
    const placeholderRef = useRef();

    const inputValueOnChangeHandler=(e)=>{
        props && props.onChange && props.onChange(e);
        placeholderRef.current.style.opacity=e.target.value && "0"
    }

    return(
        <div className="inputfield-input-div">
            <input style={{borderColor: (!props.isCorrect ) && "red"}} autoComplete="new-password" type={eyeClicked ? props.type : "text"} onChange={inputValueOnChangeHandler} className="inputfield-input"/>
            <span ref={placeholderRef} className="inputfield-input-placeholder">
                {props.placeholder}
            </span>
            {props.type === "password" && <i onClick={()=>{setEyeClicked(!eyeClicked)}} className={`far fa-eye${!eyeClicked ? "-slash":""} password-viewer`}></i>}
        </div>
        
    );
}

export default React.memo(InputField);