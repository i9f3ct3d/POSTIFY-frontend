import React, { useEffect, useRef , forwardRef } from 'react'
import './Loader.css'
import LoaderAnimation from '../../images/loaderAnimation2.json'
import LottiAnimation from '../../Pages/lottiAnimation'

const Loader = (props , ref) => {

    const LoaderChildRef = useRef();

    const show = () => {
        // console.log("called");
        LoaderChildRef.current.style.transition = "transform 500ms ease-in-out , opacity 500ms ease-in-out";
        LoaderChildRef.current.style.transform = "translateX(0)";
        LoaderChildRef.current.style.opacity = "1";
    }

    const hide = () => {
        LoaderChildRef.current.style.transform = "translateX(101%)";
        LoaderChildRef.current.style.opacity = "0";
    }

    const reset = () => {
        LoaderChildRef.current.style.transition = "none";
        LoaderChildRef.current.style.transform = "translateX(-101%)";
        LoaderChildRef.current.style.opacity = "0";
    }

    useEffect(()=>{

        if(ref){
            ref.current = {
                show : show,
                hide : hide,
                reset : reset,
            };
            // ref.current.hide = hide;
        }

    },[ref])

    return (
        <div ref = {LoaderChildRef} className={`loader-page-full-div ${props && props.className && props.className}`}>
            <div className="loader-page-loader-div">
                <LottiAnimation
                    lotti = {LoaderAnimation}
                />
            </div>
        </div>
    )
}

export default React.memo(forwardRef(Loader));
