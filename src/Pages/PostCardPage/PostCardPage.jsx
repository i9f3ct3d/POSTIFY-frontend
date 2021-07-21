import React from "react"

import "./PostCardPage.css";


import Postcard from "../../component/postCard/postCard"

const PostCardPage=(props)=>{

    return(
        <div className="posts-card">
        
        <h1>POST-FEED</h1>
        <div className="underline"></div>
                {props.posts.length>0 && props.posts.map((eachPost)=>{
                    return (
                        <Postcard
                            userEmail={props.userEmail}
                            post={eachPost}
                            key={eachPost._id}
                            mainUserId={props.userId}
                        />
                    )
                })}
        </div>
    )
}

export default PostCardPage;
