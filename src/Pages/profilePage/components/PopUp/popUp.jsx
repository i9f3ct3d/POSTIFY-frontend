import React, { useEffect, useState } from 'react';

import './popUp.css';

const PopUp=(props)=>{

    const [recProps , setRecProps] = useState(props);

    useEffect(()=>{
        setRecProps(props)
    },[props])

    return(
        <div style={{display:recProps.show ? "block" : "none"}} className="popup-full-div">
            <div className="popup-top-div">
                <p>{recProps.statement}</p>
            </div>
            <div className="popup-bottom-div">
                <button onClick={(e)=>{
                    recProps.closePopUp(false);
                }} className="popup-button popup-cancel-button">Cancel</button>
                <button onClick={(e)=>{
                    e.preventDefault();
                    recProps.confirmPopUp();
                    recProps.closePopUp(false);
                }} className="popup-button popup-confirm-button">Confirm</button>
            </div>
        </div>
    );
}

export default PopUp;