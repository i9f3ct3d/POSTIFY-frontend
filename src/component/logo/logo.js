import React from "react";
import "./logo.css";

const Logo=props=>
{
    return(
            <div className="logo-div" style={{transform:`scale(${props.scale})`}}>
                <span>P</span>{/*1*/}
                <span>O</span>{/*2*/}
                <span>S</span>{/*3*/}
                <span>T</span>{/*4*/}
                <span>-</span>{/*5*/}
                <span>I</span>{/*6*/}
                <span>F</span>{/*7*/}
                <span>Y</span>{/*8*/}
            </div>
    )
}

export default React.memo(Logo);