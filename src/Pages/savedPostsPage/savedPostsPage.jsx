import React, { useEffect, useRef, useState } from 'react';
import './savedPostsPage.css';
import Navbar from '../../component/navbar/navbar'
import LeftNavbar from '../../component/leftNavbar/leftNavbar'
import axios from 'axios';
import Cookies from 'js-cookie';
import PostCard from '../../component/postCard/postCard';
import BackgroundAnimation from '../../component/BackgroundAnimation/BackgroundAnimation'
import StarAnimation from "../../component/StarAnimation/StarAnimation";

const SavedPostsPage=(props)=>{

    const [posts , setPosts] = useState(null);
    const [viewingUser , setViewinguser] = useState(null);

    useEffect(()=>{

        const fetch=async()=>{

            props && props.showLoader && props.showLoader();

            try {

                const cookie = Cookies.get("x-auth-token");
                
                const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL+"getsavedposts/?token="+cookie);
    
                if(res.status === 200){
                    
                    setPosts(res.data.savedPosts);
                    setViewinguser(res.data.viewingUser);
                     
                }

                props && props.hideLoader && props.hideLoader();

            } catch (error) {

                window.location = "/error";
            }
            
        }

        fetch();

    },[])

    const ref = useRef();
    const starAnimationDivRef = useRef();
    const timeoutRef = useRef(null);

    return(

        <div className="saved-posts-page-full-div">
            <Navbar/>
            <div className="background-div"></div>
            <BackgroundAnimation/>
            <div
            style={{display : "none"}} 
            ref={starAnimationDivRef}>
                <StarAnimation
                    ref={ref}
                />
            </div>
            <LeftNavbar
                profilePic = {viewingUser && viewingUser.profilePic}
                username = {viewingUser && viewingUser.username}
            />
            {
                posts && viewingUser && posts.length > 0 && posts.map((eachPost)=>{
                    return(
                        <PostCard
                            viewingUserProfilePic = {viewingUser.profilePic}
                            userEmail = {viewingUser.email}
                            mainUserId = {viewingUser._id}
                            viewingUsername = {viewingUser.username}
                            post = {eachPost}
                            key = {eachPost._id}
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
                    );
                })
            }
        </div>

    );
}
export default SavedPostsPage;