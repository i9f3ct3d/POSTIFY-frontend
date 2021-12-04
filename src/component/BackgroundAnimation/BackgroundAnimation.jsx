import React from 'react'
import LottieAnimation from '../../Pages/lottiAnimation'
import backgroundAnimation from '../../images/backgroundLotti.json';
import './BackgroundAnimation.css'

function BackgroundAnimation() {
    return (
        <div className="background-image-container-full-page">
        <LottieAnimation
          lotti = {backgroundAnimation}
          height = "100vh"
          width = "100vw"
        />
        </div>
    )
}

export default React.memo(BackgroundAnimation)
