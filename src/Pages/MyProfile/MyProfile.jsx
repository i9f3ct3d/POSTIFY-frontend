import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from '../../component/navbar/navbar';
import PostCard from '../../component/postCard/postCard';
import LeftNavbar from '../../component/leftNavbar/leftNavbar';

import './MyProfile.css';
import BackgroundAnimation from '../../component/BackgroundAnimation/BackgroundAnimation';
import StarAnimation from '../../component/StarAnimation/StarAnimation';
import RightOnlineUsersBar from '../../component/rightOnlineUsersBar/rightOnlineUsersBar';

const MyProfile=(props)=>{

    const [userData , setUserData]=useState();
    const [userPosts , setUserPosts]=useState();

    useEffect(()=>{

        props && props.showLoader && props.showLoader();

        const cookie=Cookies.get('x-auth-token');

        const fetch=async()=>{
            if(!cookie || cookie===undefined)
            {
                window.location="/login";

            }
            else{
                try
                {
                    const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL+"getmyprofile/?token="+cookie);

                    if(res.status===204)
                    {
                        window.location="/login";
                    }
                    else if(res.status===200){

                        setUserData(res.data.userData);
                        setUserPosts(res.data.userPosts);
                    }

                    props && props.hideLoader && props.hideLoader();

                }catch(error)
                {
                    window.location="/error";
                }

            }


        }

        fetch();

    },[])

    const ref = useRef();
    const starAnimationDivRef = useRef();
    const timeoutRef = useRef(null);

    return(
        <div className="myprofile-full-div">
        <div className="background-div"></div>
            <Navbar/>
            <BackgroundAnimation/>
            <LeftNavbar
                profilePic = {userData && userData.profilePic}
                username = {userData && userData.username}
            />
            <RightOnlineUsersBar
                viewingUserid={userData && userData._id}
            />
            <div
            style={{display : "none"}} 
            ref={starAnimationDivRef}>
                <StarAnimation
                    ref={ref}
                />
            </div>
            <div className="myprofile-inner-div">
                <section className="myprofile-section-1">
                    <div className="myprofile-avatar-div">
                        <div className="myprofile-cover-pic">

                        </div>
                        <div className="myprofile-profile-pic">
                            <img src={userData && userData.profilePic && (userData.profilePic[0] === "u" ? process.env.REACT_APP_BACKEND_API_URL+userData.profilePic : userData.profilePic)} />
                        </div>
                    </div>
                </section>
                <section className="myprofile-section-2">
                    <p className="myprofile-section-2-username">{userData && userData.username}</p>
                    <p className="myprofile-section-2-useremail">{userData && userData.email}</p>
                </section>
                <section className="myprofile-section-3">
                {
                    userPosts && userPosts.map((eachPost)=>{
                        return(
                            <PostCard
                            userEmail={userData.email}
                            post={eachPost}
                            key={eachPost._id}
                            mainUserId={userData._id}
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
                </section>
                
            </div>
        </div>
    );

}

export default MyProfile;
