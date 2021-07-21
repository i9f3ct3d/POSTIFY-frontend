import React, { useState } from 'react';

import './inputField.css';

const InputField = (props) =>{

    const [inputValue , setInputValue] = useState("");
    const [eyeClicked , setEyeClicked] = useState(false);

    const [inputFieldClicked , setInputFieldCLicked] = useState(true);

    return(
        <div className="inputfield-input-div">
            <input  onBlur={()=>{setInputFieldCLicked(false)}} onFocus={()=>{setInputFieldCLicked(true)}} style={{borderColor: (!props.isCorrect ) && "red"}} autoComplete="new-password" type={eyeClicked ? props.type : "text"} onChange={(e)=>{setInputValue(e.target.value);props.onChange(e);}} className="inputfield-input" value={inputValue}/>
            <span style={{opacity: inputValue && "0"}} className="inputfield-input-placeholder">
                {props.placeholder}
            </span>
            {props.type === "password" && <i onClick={()=>{setEyeClicked(!eyeClicked)}} className={`far fa-eye${!eyeClicked ? "-slash":""} password-viewer`}></i>}
        </div>
        
    );
}

export default InputField;