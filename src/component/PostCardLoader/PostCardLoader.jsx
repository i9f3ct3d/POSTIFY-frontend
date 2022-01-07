import { memo } from "react"
import './PostCardLoader.css'

const PostCardLoader = ({top , count , style}) => {
    return (
        <>
            {new Array(count ? count : (Math.ceil((window.innerHeight - (top ? top : 0)) / 320))).fill(0).map((e,i) => {
              return(
                <div style = {style ? style : {}} key = {i} className="home-page__all-posts__loader">
                  <div className="home-page__all-posts__loader__avatar"></div>
                  <div className="home-page__all-posts__loader__username"></div>
                  <div className="home-page__all-posts__loader__content"></div>
                  <div className="home-page__all-posts__loader__star"></div>
                  <div className="home-page__all-posts__loader__comment"></div>
                </div>
              )
            })}

        </>
    )
}

export default memo(PostCardLoader)
