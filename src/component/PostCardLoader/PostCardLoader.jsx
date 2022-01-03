import { memo } from "react"
import './PostCardLoader.css'

const PostCardLoader = ({top}) => {
    return (
        <>
            {new Array(Math.ceil((window.innerHeight - (top ? top : 0)) / 320)).fill(0).map((e,i) => {
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

        </>
    )
}

export default memo(PostCardLoader)
