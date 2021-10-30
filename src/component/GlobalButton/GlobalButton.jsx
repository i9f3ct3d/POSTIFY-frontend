import React from 'react'
// using ES6
import './GlobalButton.css'

const GlobalButton = (props) => {



    return (
        <div style={props && props.style} className={`global-button-full-div ${props ? (props.className ? props.className : null) : null}`}>
            <button onClick={()=>{props && props.onClick && props.onClick()}} style={{borderColor : props && props.borderColor , color : props && props.color}} className="global-button">{props && props.icon}{props && props.text}</button>
            <div style={{backgroundColor : props && props.backgroundColor}} className="global-button-background"></div>
        </div>
    )
}

export default GlobalButton
