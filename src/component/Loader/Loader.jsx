import React from 'react'
import './Loader.css'
import LoaderAnimation from '../../images/loaderAnimation.json'
import LottiAnimation from '../../Pages/lottiAnimation'

const Loader = (props) => {

    return (
        <div className={`loader-page-full-div ${props && props.className && props.className}`}>
            <div className="loader-page-loader-div">
                <LottiAnimation
                    lotti = {LoaderAnimation}
                />
            </div>
        </div>
    )
}

export default React.memo(Loader);
