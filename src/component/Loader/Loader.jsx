import { forwardRef, memo } from 'react'
import './Loader.css'

const Loader = ({className , style , loaderStyle} , ref) => {

    return (
        // <div ref = {ref} style={style && style} className={`global-loader__full-div ${className && className}`}>
        //     <div style={loaderStyle && loaderStyle} className='global_loader__spinner-div'></div>
        // </div>
        <div ref = {ref} style={style && style} className={`global-loader__full-div ${className && className}`}>
            <div className='global-loader__navbar'></div>
            <div className='global-loader__left-navbar'>
                <div style = {{width : '100%' , height : '2rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingLeft : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '2rem' , height : '2rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '8rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '2rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingLeft : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '2rem' , height : '2rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '8rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '2rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingLeft : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '2rem' , height : '2rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '8rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '2rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingLeft : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '2rem' , height : '2rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '8rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '2rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingLeft : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '2rem' , height : '2rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '8rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '2rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingLeft : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '2rem' , height : '2rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '8rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '2rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingLeft : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '2rem' , height : '2rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '8rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '2rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingLeft : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '2rem' , height : '2rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '8rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '2rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingLeft : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '2rem' , height : '2rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '8rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '2rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingLeft : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '2rem' , height : '2rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '8rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
            </div>
            <div className='global-loader__right-online-users'>
                <div style = {{width : '100%' , height : '4rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingRight : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '3.5rem' , height : '3.5rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '7rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '4rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingRight : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '3.5rem' , height : '3.5rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '7rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '4rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingRight : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '3.5rem' , height : '3.5rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '7rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '4rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingRight : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '3.5rem' , height : '3.5rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '7rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '4rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingRight : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '3.5rem' , height : '3.5rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '7rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
                <div style = {{width : '100%' , height : '4rem' , borderRadius : '2px' , display : 'flex' , alignItems : 'center' , paddingRight : '20px' , marginBottom : '30px'}}>
                    <div style = {{width : '3.5rem' , height : '3.5rem' , borderRadius : '100%' , backgroundColor : '#242527' , marginRight : '10px'}}></div>
                    <div style = {{width : '7rem' , height : '1.5rem' , borderRadius : '2px' , backgroundColor : '#242527'}}></div>
                </div>
            </div>
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
