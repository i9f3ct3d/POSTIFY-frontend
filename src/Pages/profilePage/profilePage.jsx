import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from '../../component/navbar/navbar';
import PostCard from '../../component/postCard/postCard';
import { BiDotsVerticalRounded } from "react-icons/bi";

import './profilePage.css';
import PopUp from './components/PopUp/popUp';
import LeftNavbar from '../../component/leftNavbar/leftNavbar';
import RightOnlineUsersBar from '../../component/rightOnlineUsersBar/rightOnlineUsersBar';

const ProfilePage = () => {

    const noPic = "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd";
    const [searchedUser , setSearchedUser] = useState();
    const [searchedUserPosts , setSearchedUserPosts] = useState();
    const [myUserid , setMyUserid] = useState();

    const [showAddFriend , setShowAddFriend] = useState("none");
    const [showReqSent , setShowReqSent] = useState("none");
    const [showFriends , setShowFriends] = useState("none");
    const [showReqRecieved , setShowReqRecieved] = useState("none");

    const [useEffectRefresh , setUseEffectRefresh] = useState(false);
    const [showPopUp , setShowPopUp] = useState(false);
    const [popUpStatement , setPopUpStatement] = useState("");
    const [popUpFunction , setPopUpFunction] = useState(()=>{});

    const cookie = Cookies.get('x-auth-token');

    useEffect(()=>{

        const fetch = async()=>{

        if(!cookie)
        {
            window.location = '/error';
        }

        if(cookie)
        {
            const search = window.location.search;
            const query = new URLSearchParams(search);

            const searchedUserid = query.get('searcheduserid');

            if(!searchedUserid)
            {
                ///////////// Show a no match of user block////////////
                window.location = '/error';
            }
            else{

                try {

                    const response = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "getuser/?token="+cookie,{
                        "searchedUserid":searchedUserid
                    });

                    if(response.status === 204){
                        cookie && Cookies.remove('x-auth-token');
                        window.location="/login";
                    }
                    else if(response.status === 200){
                        
                        const resSearchedUser = response.data.searchedUser;
                        const resSearchedUserPosts = response.data.searchedUserPosts;
                        const resMyUserid = response.data.myUserid;

                        setSearchedUser(resSearchedUser);
                        setSearchedUserPosts(resSearchedUserPosts);
                        setMyUserid(resMyUserid)

                        if(resSearchedUser.friends && resSearchedUser.friendReqRecieved && resSearchedUser.friendReqSent){
                            if(!resSearchedUser.friends.includes(resMyUserid) && !resSearchedUser.friendReqRecieved.includes(resMyUserid) && !resSearchedUser.friendReqSent.includes(resMyUserid)){
                                setShowAddFriend("inline-block");
                                setShowFriends("none");
                                setShowReqSent("none");
                                setShowReqRecieved("none");
                            }
                            else if(resSearchedUser.friends.includes(resMyUserid)){
                                setShowAddFriend("none");
                                setShowFriends("inline-block");
                                setShowReqSent("none");
                                setShowReqRecieved("none");
                            }
                            else if(resSearchedUser.friendReqRecieved.includes(resMyUserid)){
                                setShowAddFriend("none");
                                setShowFriends("none");
                                setShowReqSent("inline-block");
                                setShowReqRecieved("none");
                            }
                            else if(resSearchedUser.friendReqSent.includes(resMyUserid)){
                                setShowAddFriend("none");
                                setShowFriends("none");
                                setShowReqSent("none");
                                setShowReqRecieved("inline-block");
                            }
                        }

                    }


                } catch (error) {
                    window.location('/error');
                }

            }
        }

        }

        fetch();


    },[useEffectRefresh])

    const addFriendButtonClickHandler=async(event)=>{

        event.preventDefault();


        try {

            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"sendfriendreq/?token="+cookie,{
                "friendUserId":searchedUser._id
            });

            
            if(res.status === 204){
                cookie && Cookies.remove('x-auth-token');
                window.location="/login";
            }else if(res.status === 200){
                setUseEffectRefresh(!useEffectRefresh);
            }
            
        } catch (error) {
            window.location="/error";
        }
    }


    async function  removeSentFriendReq (){

        try {

            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"removesentfriendreq/?token="+cookie,{
                "friendUserId":searchedUser._id
            });

            
            if(res.status === 204){
                window.location="/login";
            }else if(res.status === 200){
                setUseEffectRefresh(!useEffectRefresh);
            }
            
        } catch (error) {
            window.location="/error";
        }
    }


    const confirmFriendButtonClickHandler=async(event)=>{

        event.preventDefault();

        try {

            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"acceptfriendreq/?token="+cookie,{
                "friendUserId":searchedUser._id
            });

            
            if(res.status === 204){
                window.location="/login";

            }else if(res.status === 200){
                setUseEffectRefresh(!useEffectRefresh);
            }
            
        } catch (error) {
            window.location="/error";
        }
    }

    const unfriendButtonHandler=async()=>{

        try {

            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"removefriend/?token="+cookie,{
                "friendUserId":searchedUser._id
            });

            
            if(res.status === 204){
                window.location="/login";

            }else if(res.status === 200){
                setUseEffectRefresh(!useEffectRefresh);
            }
            
        } catch (error) {
            window.location="/error";
        }
        

    }

    const cancelReceivedRequestButtonClickHandler = async () => {
        try {

            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"removerecievedfriendreq/?token="+cookie,{
                "friendUserId":searchedUser._id
            });

            
            if(res.status === 204){
                window.location="/login";

            }else if(res.status === 200){
                setUseEffectRefresh(!useEffectRefresh);
            }
            
        } catch (error) {
            window.location="/error";
        }
    }

    const messageButtonClickHandler=(e)=>{
        e.preventDefault();

        console.log({"myUserid":myUserid,
        "searchedId":searchedUser._id});

        window.location="/messagepage/?myuserid="+myUserid+"&searcheduserid="+searchedUser._id;

    }




    return(
        <div  className="profilepage-full-div">
            <Navbar/>
            <LeftNavbar
                profilePic = {searchedUser && searchedUser.profilePic}
                username = {searchedUser && searchedUser.username}
            />
            <PopUp
                show={showPopUp}
                closePopUp={setShowPopUp}
                confirmPopUp={popUpFunction}
                statement={popUpStatement}
            />
            <RightOnlineUsersBar
                viewingUserid = {myUserid && myUserid}
            />
            <div style={{display:!showPopUp && "none"}} className="popup-backdrop"></div>
            <div style={{filter:showPopUp && "blur(5px)"}} className="profilepage-inner-div">
                <section className="profilepage-section-1">
                    <div className="profilepage-avatar-div">
                        <div className="profilepage-cover-pic">

                        </div>
                        <div className="profilepage-profile-pic">
                            <img src={searchedUser && searchedUser.profilePic ? (searchedUser.profilePic[0] === "u" ? process.env.REACT_APP_BACKEND_API_URL+searchedUser.profilePic : searchedUser.profilePic) : noPic} />
                        </div>
                    </div>
                </section>
                <section className="profilepage-section-2">
                    <p className="profilepage-section-2-username">{searchedUser && searchedUser.username}</p>
                    <button onClick={ addFriendButtonClickHandler} style={{display:showAddFriend}} className="add-friend-button"><i className="fas fa-user-plus"></i>  Add Friend</button>
                    <button onClick={ (e)=>{

                        e.preventDefault();
                        setShowPopUp(true);
                        setPopUpStatement("Do you want to cancel the friend request to "+searchedUser.username+" ?");
                        setPopUpFunction(()=>removeSentFriendReq);

                    } } style={{display:showReqSent}} className="req-sent-button"><i className="fas fa-check"></i>  Reqest Sent</button>
                    <button onClick={ confirmFriendButtonClickHandler} style={{display:showReqRecieved}} className="friend-req-confirm-button"><i className="fas fa-check"></i>  Confirm</button>
                    <button onClick={ cancelReceivedRequestButtonClickHandler} style={{display:showReqRecieved}} className="friend-req-cancel-button"><i className="fas fa-check"></i>  Cancel</button>
                    
                    <button onClick={(e)=>{

                        e.preventDefault();
                        setShowPopUp(true);
                        setPopUpStatement("Do you want to unfriend "+searchedUser.username+" ?");
                        setPopUpFunction(()=>unfriendButtonHandler);

                    }} style={{display:showFriends}} className="friends-button"><i className="fas fa-user-friends"></i>  Friends</button>
                    <i onClick={messageButtonClickHandler} className="far fa-comments send-message-icon"></i>
                    <BiDotsVerticalRounded
                        className = "add-friend-dots"
                    />
                    {/* <i className="fas fa-ellipsis-v add-friend-dots"></i> */}
                    {/* <div className="profilepage-details-div">
                        <p style={{cursor:"pointer"}}>Friends : {searchedUser && searchedUser.friends && searchedUser.friends.length}</p>
                        <p>Posts : {searchedUserPosts && searchedUserPosts.length}</p>
                    </div> */}
                </section>
                <section className="profilepage-section-3">
                {
                    searchedUserPosts && searchedUserPosts.map((eachPost)=>{
                        return(
                            <PostCard
                                userEmail={searchedUser.email}
                                post={eachPost}
                                key={eachPost._id}
                                mainUserId={searchedUser._id}
                            />
                        );
                    })
                }
                </section>
                
            </div>
        </div>
    );
}

export default ProfilePage;


