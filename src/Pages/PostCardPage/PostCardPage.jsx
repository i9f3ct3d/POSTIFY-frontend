import React, { useRef } from "react"

import "./PostCardPage.css";
import Postcard from "../../component/postCard/postCard"
import StarAnimation from "../../component/StarAnimation/StarAnimation";



const PostCardPage=(props)=>{

    const ref = useRef();
    const starAnimationDivRef = useRef();
    const timeoutRef = useRef(null);

    return(
        <div className="posts-card">
            <div
            style={{display : "none"}} 
            ref={starAnimationDivRef}>
                <StarAnimation
                    ref={ref}
                />
            </div>

                {props.posts.length>0 && props.posts.map((eachPost)=>{
                    return (
                        <Postcard
                            viewingUserProfilePic = {props.viewingUserProfilePic}
                            userEmail = {props.userEmail}
                            post = {eachPost}
                            key = {eachPost._id}
                            mainUserId = {props.userId}
                            viewingUsername = {props.username}
                            turnOnConfetti = {()=>{
                                
                                if(timeoutRef.current){
                                    clearTimeout(timeoutRef.current)
                                }

                                ref.current.play(0 , 50);
                                starAnimationDivRef.current.style.display = "block"

                                timeoutRef.current = setTimeout(()=>{

                                    starAnimationDivRef.current.style.display = "none"
                                    ref.current.stop();

                                },1950)

                            }}

                            turnOffConfetti = {()=>{
                                starAnimationDivRef.current.style.display = "none"
                                ref.current.stop();
                            }}
                        />
                    )
                })}
        </div>
    )
}

export default PostCardPage;
