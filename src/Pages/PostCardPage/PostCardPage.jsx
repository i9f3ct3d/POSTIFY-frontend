import { memo } from "react"

import "./PostCardPage.css";
import Postcard from "../../component/postCard/postCard"



const PostCardPage=(props)=>{


    return(
        <div className="posts-card">

                {props.posts.length>0 && props.posts.map((eachPost)=>{
                    return (
                        <Postcard
                            viewingUserProfilePic = {props.viewingUserProfilePic}
                            userEmail = {props.userEmail}
                            post = {eachPost}
                            key = {eachPost._id}
                            mainUserId = {props.userId}
                            viewingUsername = {props.username}
                        />
                    )
                })}
        </div>
    )
}

export default memo(PostCardPage);
