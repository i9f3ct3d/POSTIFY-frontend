import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from '../../component/navbar/navbar';
import PostCard from '../../component/postCard/postCard';
import LeftNavbar from '../../component/leftNavbar/leftNavbar';

import './MyProfile.css';

const MyProfile=()=>{

    const [userData , setUserData]=useState();
    const [userPosts , setUserPosts]=useState();

    useEffect(()=>{

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
                }catch(error)
                {
                    window.location="/error";
                }

            }


        }

        fetch();

    },[])



    return(
        <div className="myprofile-full-div">
            <Navbar/>
            <LeftNavbar
                profilePic = {userData && userData.profilePic}
                username = {userData && userData.username}
            />
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
                    {/* <div className="myProfile-details-div">
                        <p style={{cursor:"pointer"}}>Friends : {userData && userData.friends && userData.friends.length}</p>
                        <p>Posts : {userPosts && userPosts.length}</p>
                    </div> */}
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
