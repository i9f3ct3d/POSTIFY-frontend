import React, { useEffect, useState } from "react";
import './FriendRequest.css'
import Navbar from '../../component/navbar/navbar'
import LeftNavbar from '../../component/leftNavbar/leftNavbar'
import RightOnlineUsersBar from '../../component/rightOnlineUsersBar/rightOnlineUsersBar'
import Cookies from "js-cookie";
import axios from "axios";
import FriendRequestCard from "./components/FriendRequestCard";
import BackgroundAnimation from '../../component/BackgroundAnimation/BackgroundAnimation'

const FriendRequest=()=>{

    const [user , setUser] = useState(null);
    const [useEffectRefresh , setUseEffectRefresh] = useState(false);
    const [friendReqRecievedUsersArray , setFriendReqRecievedUsersArray] = useState(null);

    const cookie = Cookies.get('x-auth-token');

    useEffect(()=>{

        const fetch = async() => {

            try {
                
                const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL+"fetchuser/?token="+cookie);

                if(res.status === 200 && res.data.credentials === "valid"){

                    setUser(res.data.user);

                }
    
            } catch (error) {
                window.location = "/error";
            }

        }

        fetch();


    },[useEffectRefresh])


    useEffect(()=>{

        if(user){

            const fetch = async() => {

                try {

                    const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"getreceivedrequestuserdata",{
                        friendReqRecieved : user.friendReqRecieved,
                    });
    
                    if(res.status === 200){
    
                        setFriendReqRecievedUsersArray(res.data.friendReqRecievedUsersArray);
    
                    }
                    
                } catch (error) {
                    window.location = "/error";
                }


            }

            fetch();

        }

    },[user , useEffectRefresh])



    return(
        <div className="friend-request-page-full-div">
            <Navbar/>
            <div className="background-div"></div>
            <BackgroundAnimation/>
            <LeftNavbar
                profilePic = {user && user.profilePic}
                username = {user && user.username}
            />
            <RightOnlineUsersBar
                viewingUserid={user && user._id}
            />
            <div className="friend-request-page-inner-div">
                {
                    friendReqRecievedUsersArray && friendReqRecievedUsersArray.map((eachUser)=>{
                        return(
                                <FriendRequestCard

                                    key = {eachUser._id}
                                    userid = {eachUser._id}
                                    username = {eachUser.username}
                                    userProfilePic = {eachUser.profilePic}
                                    confirmFriendButtonClickHandler = {async()=>{

                                        try {

                                            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"acceptfriendreq/?token="+cookie,{
                                                "friendUserId":eachUser._id
                                            });

                                            
                                            if(res.status === 204){
                                                window.location="/login";
                                            }
                                            
                                        } catch (error) {
                                            window.location="/error";
                                        }
                                    }}

                                    cancelFriendRequestButtonClickHandler = {async()=>{
                                        try {

                                            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"removerecievedfriendreq/?token="+cookie,{
                                                "friendUserId":eachUser._id
                                            });


                                            if(res.status === 204){
                                                window.location="/login";

                                            }else if(res.status === 200){
                                                setUseEffectRefresh((prev) => !prev);
                                            }

                                            } catch (error) {
                                            window.location="/error";
                                            }
                                    }}
                                />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default FriendRequest;