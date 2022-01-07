import { forwardRef, memo, useImperativeHandle, useRef } from "react"
import './MiniLoader.css'

const MiniLoader = ({style} , ref) => {

    useImperativeHandle(ref , () => ({

        fadeIn : () => {
            miniLoaderRef.current.style.opacity = 1
            miniLoaderRef.current.style.zIndex = 2
        }
        ,
        fadeOut : () => {
            miniLoaderRef.current.style.opacity = 0
            miniLoaderRef.current.style.zIndex = -1
        }

    }))

    const miniLoaderRef = useRef();

    return (
        <div ref = {miniLoaderRef} style = {style && style} className="mini-loader__full-div">
            <div className="mini-loader"></div>
        </div>
    )
}

export default memo(forwardRef(MiniLoader))
