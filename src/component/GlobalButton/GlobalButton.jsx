import React , { forwardRef } from 'react'
import './GlobalButton.css'

const GlobalButton = (props , ref) => {

    return (
        <div ref = {ref} style={props && props.style} className={`global-button-full-div ${props ? (props.className ? props.className : null) : null}`}>
            <button onClick={(e)=>{props && props.onClick && props.onClick(e)}} style={{borderColor : props && props.borderColor , color : props && props.color}} className="global-button"><div className='global-button__icon-div'>{props && props.icon}</div>{props && props.text}</button>
            <div style={{backgroundColor : props && props.backgroundColor}} className="global-button-background"></div>
            <div style={{backgroundColor : props && props.backgroundColor && props.backgroundColor}} className='global-button-top-right-div'></div>
            <div style={{borderColor : props && props.backgroundColor && props.backgroundColor}} className='global-button-bottom-left-div'></div>
        </div>
    )
}

export default React.memo(forwardRef(GlobalButton));
