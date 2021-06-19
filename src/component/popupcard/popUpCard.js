import react, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import "./popUpCard.css";

const PopUpCard=props=>{
    const cookie=Cookie.get("x-auth-token");
    const [isPopUpOpen,changeIsPopUpOpen]=useState(false);

    useEffect(()=>{
        changeIsPopUpOpen(props.isPopUpOpen);
    },[props.isPopUpOpen])
    
    const handleButtonClick=async(e)=>{

        if(e.target.name==="cancel")
        {
            props.onButtonClick(false);
        }
        else
        {
            props.onButtonClick(true,props.postid);
        }
        changeIsPopUpOpen(false);
    }


    return(<div className="popup-fulldiv">
        <div className="popup-background" style={{display:isPopUpOpen?"block":"none"}}>

        </div>
        <div className="popup-card" style={{top:isPopUpOpen?"10%":"-50rem"}}>
            <div className="popup-card-title">
                <h1>Are you sure you want to delete this post named </h1>
                <h2>My Post.</h2>
                <h1>This action is irreversible</h1>
            </div>
            <div className="popup-card-button">
                <p>Are you sure you want to continue?</p>
                <div className="popup-card-buttons">
                <button className="popup-button-cancle" name="cancel" onClick={handleButtonClick}>CANCEL</button>
                <button className="popup-button-confirm" name="confirm" onClick={handleButtonClick}>CONFIRM</button>
                </div>
                </div>
        </div>
    </div>)
}
export default PopUpCard;