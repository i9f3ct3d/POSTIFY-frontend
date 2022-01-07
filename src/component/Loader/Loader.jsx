import { forwardRef, memo } from 'react'
import './Loader.css'

const Loader = ({className , style } , ref) => {

    return (
        <div ref = {ref} style={style && style} className={`global-loader__full-div ${className && className}`}>
            <div className='global-loader__navbar'></div>
            <div className='global-loader__posts'>
                {new Array(Math.ceil((window.innerHeight - 100) / 320)).fill(0).map((e,i) => {
                return(
                    <div key = {i} className="home-page__all-posts__loader">
                    <div className="home-page__all-posts__loader__avatar"></div>
                    <div className="home-page__all-posts__loader__username"></div>
                    <div className="home-page__all-posts__loader__content"></div>
                    <div className="home-page__all-posts__loader__star"></div>
                    <div className="home-page__all-posts__loader__comment"></div>
                    </div>
                )
                })}
            </div>
        </div>
    )
}

export default memo(forwardRef(Loader));
