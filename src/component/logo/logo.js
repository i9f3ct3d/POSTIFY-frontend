import react from "react";
import "./logo.css";

const Logo=props=>
{
    return(
            <div className="logo-div" style={{transform:`scale(${props.scale})`}}>
                <span>P</span>{/*1*/}
                <span>O</span>{/*2*/}
                <span>S</span>{/*3*/}
                <span>T</span>{/*4*/}
                <span>B</span>{/*5*/}
                <span>O</span>{/*6*/}
                <span>O</span>{/*7*/}
                <span>K</span>{/*8*/}
            </div>
    )
}

export default Logo;