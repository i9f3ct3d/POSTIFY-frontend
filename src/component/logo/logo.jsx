import "./logo.css";
import LogoLotti from '../../images/LogoLotti.json'
import { lazy , memo, Suspense , useRef } from "react";
const LottiAnimation = lazy(() => import( "../../Pages/lottiAnimation"));

const Logo=props=>
{

    const isHoverAnimationComplete = useRef(true);

    return(
            <div className={`logo-div ${props ? (props.className ? props.className : "") :""}`} style={{transform:`scale(${props.scale})` , height : props && props.height && props.height , width : props && props.width && props.width}}>
                <div className="logo-div-lotti-div">
                    <Suspense fallback={<span></span>}>
                        <LottiAnimation
                            lotti = {LogoLotti}
                            height = "100%"
                            width = "100%"
                        />
                    </Suspense>
                </div>
                <div className="logo-div-text-div">
                    <span onMouseEnter = {(e) => {
                        
                        if(isHoverAnimationComplete.current){
                            isHoverAnimationComplete.current = false;
                            e.target.classList.add("logo-div-text__onhover");

                            setTimeout(() => {
                                
                                e.target.classList.remove("logo-div-text__onhover");
                                isHoverAnimationComplete.current = true;

                            },1000)
                        }


                    }} className="logo-div-text">POSTIFY</span>
                    {/* <span className="logo-div-text">O</span>
                    <span className="logo-div-text">S</span>
                    <span className="logo-div-text">T</span>
                    <span className="logo-div-text">I</span>
                    <span className="logo-div-text">F</span>
                    <span className="logo-div-text">Y</span> */}
                </div>
            </div>
    )
}

export default memo(Logo);