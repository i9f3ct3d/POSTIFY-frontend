import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import MyPostCardComp from "./component/MyPostCardComp/MyPostCardComp"
import "./MyPostCard.css";

const MyPostcard=(props)=>{

    return(
        <div >
            <ul className="each-post-container" style={{listStyle : "none"}}>
                {props.posts.map(eachPost=>{
                    return(
                        <div className="eachpost-div" key={eachPost._id}>
                        <MyPostCardComp                 
                            postid={eachPost._id}
                            postcontent={eachPost.postcontent}
                            heading={eachPost.heading}
                            author={eachPost.username}
                            date={eachPost.postDate}
                            ConfirmedDeleteHandler={(data)=>props.deletePost(data)}
                            isDeleted={props.isDeleted}                           
                        />
                        </div>
                        
                    )
                })}
            </ul>
        </div>
    )
}

export default MyPostcard;