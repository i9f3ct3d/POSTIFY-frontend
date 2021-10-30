import React from "react";
import "./logo.css";
import LogoLotti from '../../images/LogoLotti.json'
import LottiAnimation from "../../Pages/lottiAnimation";

const Logo=props=>
{
    return(
            <div className={`logo-div ${props ? (props.className ? props.className : "") :""}`} style={{transform:`scale(${props.scale})` , height : props && props.height && props.height , width : props && props.width && props.width}}>
                <div className="logo-div-lotti-div">
                    <LottiAnimation
                        lotti = {LogoLotti}
                        height = "100%"
                        width = "100%"
                    />
                </div>
                <div className="logo-div-text-div">
                    <span className="logo-div-text">POSTIFY</span>
                </div>
            </div>
    )
}

export default React.memo(Logo);