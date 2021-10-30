import React , { forwardRef } from 'react'
import './StarAnimation.css'
import LottieAnimation from '../../Pages/lottiAnimation';
import starAnimation from '../../images/confetti.json';

const StarAnimation = (props , ref) => {

    return (
        <div className="star-animation-full-div">
            <LottieAnimation
                ref = {ref}
                lotti = {starAnimation}
                width = "100vw"
                height = "100vh"
                loop = {false}
                isStopped = {true}
            />
        </div>
    )
}

export default forwardRef(StarAnimation)
