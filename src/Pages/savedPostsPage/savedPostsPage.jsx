import React, { useEffect, useRef, useState } from 'react';
import './savedPostsPage.css';
import Navbar from '../../component/navbar/navbar'
import LeftNavbar from '../../component/leftNavbar/leftNavbar'
import axios from 'axios';
import Cookies from 'js-cookie';
import PostCard from '../../component/postCard/postCard';
import BackgroundAnimation from '../../component/BackgroundAnimation/BackgroundAnimation'
import StarAnimation from "../../component/StarAnimation/StarAnimation";
import Loader from '../../component/Loader/Loader';

const SavedPostsPage=()=>{

    const [posts , setPosts] = useState(null);
    const [viewingUser , setViewinguser] = useState(null);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(()=>{

        const fetch=async()=>{

            try {

                const cookie = Cookies.get("x-auth-token");
                
                const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL+"getsavedposts/?token="+cookie);
    
                if(res.status === 200){
                    
                    setPosts(res.data.savedPosts);
                    setViewinguser(res.data.viewingUser);
                    setIsLoading(false);
    
                }

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
            {isLoading && <Loader/>}
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