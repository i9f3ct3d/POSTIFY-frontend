import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from '../../component/navbar/navbar';
import PostCard from '../../component/postCard/postCard';
import { BiDotsVerticalRounded } from "react-icons/bi";

import './profilePage.css';
import PopUp from './components/PopUp/popUp';
import LeftNavbar from '../../component/leftNavbar/leftNavbar';
import RightOnlineUsersBar from '../../component/rightOnlineUsersBar/rightOnlineUsersBar';
import BackgroundAnimation from '../../component/BackgroundAnimation/BackgroundAnimation';
import StarAnimation from '../../component/StarAnimation/StarAnimation';
import GlobalButton from '../../component/GlobalButton/GlobalButton';

const ProfilePage = (props) => {

    const noPic = "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd";
    const [searchedUser , setSearchedUser] = useState();
    const [searchedUserPosts , setSearchedUserPosts] = useState();
    const [myUserid , setMyUserid] = useState();

    // const [useEffectRefresh , setUseEffectRefresh] = useState(false);
    const [showPopUp , setShowPopUp] = useState(false);
    const [popUpStatement , setPopUpStatement] = useState("");
    const [popUpFunction , setPopUpFunction] = useState(()=>{});

    const cookie = Cookies.get('x-auth-token');

    const showAddFriendRef = useRef();
    const showFriendsRef = useRef();
    const showReqSentRef = useRef();
    const friendReqCancelRef = useRef();
    const friendReqConfirmRef = useRef();

    const fetch = async()=>{
        props && props.showLoader && props.showLoader();
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


                                showAddFriendRef.current.style.display = "inline-block";
                                showFriendsRef.current.style.display = "none";
                                showReqSentRef.current.style.display = "none";
                                friendReqCancelRef.current.style.display = "none";
                                friendReqConfirmRef.current.style.display = "none";
                            }
                            else if(resSearchedUser.friends.includes(resMyUserid)){

                                showAddFriendRef.current.style.display = "none";
                                showFriendsRef.current.style.display = "inline-block";
                                showReqSentRef.current.style.display = "none";
                                friendReqCancelRef.current.style.display = "none";
                                friendReqConfirmRef.current.style.display = "none";

                            }
                            else if(resSearchedUser.friendReqRecieved.includes(resMyUserid)){


                                showAddFriendRef.current.style.display = "none";
                                showFriendsRef.current.style.display = "none";
                                showReqSentRef.current.style.display = "inline-block";
                                friendReqCancelRef.current.style.display = "none";
                                friendReqConfirmRef.current.style.display = "none";
                            }
                            else if(resSearchedUser.friendReqSent.includes(resMyUserid)){

                                showAddFriendRef.current.style.display = "none";
                                showFriendsRef.current.style.display = "none";
                                showReqSentRef.current.style.display = "none";
                                friendReqCancelRef.current.style.display = "inline-block";
                                friendReqConfirmRef.current.style.display = "inline-block";
                            }
                        }

                    }
                    
                    props && props.hideLoader && props.hideLoader();

                } catch (error) {
                    window.location('/error');
                }

            }
        }

        }

    useEffect(()=>{

        fetch();

    },[])

    const addFriendButtonClickHandler=async(event)=>{

        event.preventDefault();
        props && props.showLoader && props.showLoader();


        try {

            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"sendfriendreq/?token="+cookie,{
                "friendUserId":searchedUser._id
            });

            
            if(res.status === 204){
                cookie && Cookies.remove('x-auth-token');
                window.location="/login";
            }else if(res.status === 200){
                // setUseEffectRefresh(prev => !prev);
                fetch();
            }

            // props && props.hideLoader && props.hideLoader();

            
        } catch (error) {
            window.location="/error";
        }
    }


    async function  removeSentFriendReq (){

        props && props.showLoader && props.showLoader();


        try {

            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"removesentfriendreq/?token="+cookie,{
                "friendUserId":searchedUser._id
            });

            
            if(res.status === 204){
                window.location="/login";
            }else if(res.status === 200){
                // setUseEffectRefresh(prev => !prev);
                fetch();
            }
            // props && props.hideLoader && props.hideLoader();

        } catch (error) {
            window.location="/error";
        }
    }


    const confirmFriendButtonClickHandler=async(event)=>{

        event.preventDefault();

        props && props.showLoader && props.showLoader();


        try {

            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"acceptfriendreq/?token="+cookie,{
                "friendUserId":searchedUser._id
            });

            
            if(res.status === 204){
                window.location="/login";

            }else if(res.status === 200){
                // setUseEffectRefresh(prev => !prev);
                fetch();
            }

            // props && props.hideLoader && props.hideLoader();

            
        } catch (error) {
            window.location="/error";
        }
    }

    const unfriendButtonHandler=async()=>{

        props && props.showLoader && props.showLoader();


        try {

            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"removefriend/?token="+cookie,{
                "friendUserId":searchedUser._id
            });

            
            if(res.status === 204){
                window.location="/login";

            }else if(res.status === 200){
                // setUseEffectRefresh(prev => !prev);
                fetch();
            }

            // props && props.hideLoader && props.hideLoader();

            
        } catch (error) {
            window.location="/error";
        }
        

    }

    const cancelReceivedRequestButtonClickHandler = async () => {

        props && props.showLoader && props.showLoader();

        try {

            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"removerecievedfriendreq/?token="+cookie,{
                "friendUserId":searchedUser._id
            });

            
            if(res.status === 204){
                window.location="/login";

            }else if(res.status === 200){
                // setUseEffectRefresh(prev => !prev);
                fetch();
            }

            // props && props.hideLoader && props.hideLoader();

            
        } catch (error) {
            window.location="/error";
        }
    }

    const messageButtonClickHandler=(e)=>{
        e.preventDefault();

        window.location="/messagepage/?myuserid="+myUserid+"&searcheduserid="+searchedUser._id;

    }

    const ref = useRef();
    const starAnimationDivRef = useRef();
    const timeoutRef = useRef(null);



    return(
        <div className="profilepage-full-div">
            <Navbar/>
            <BackgroundAnimation/>
            <LeftNavbar
                profilePic = {searchedUser && searchedUser.profilePic}
                username = {searchedUser && searchedUser.username}
            />

            <div
                style={{display : "none"}} 
                ref={starAnimationDivRef}>
                <StarAnimation
                    ref={ref}
                />
            </div>

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
                            <img alt = "profilePic" src={searchedUser && searchedUser.profilePic ? (searchedUser.profilePic[0] === "u" ? process.env.REACT_APP_BACKEND_API_URL+searchedUser.profilePic : searchedUser.profilePic) : noPic} />
                        </div>
                    </div>
                </section>
                <section className="profilepage-section-2">
                    <p className="profilepage-section-2-username">{searchedUser && searchedUser.username}</p>
                    <div className = "profilepage-section-2-buttons">

                    
                    <GlobalButton
                        icon = {<i className="fas fa-user-plus"></i>}
                        text = "Add Friend"
                        ref = {showAddFriendRef} 
                        onClick={ addFriendButtonClickHandler}
                        style = {{
                            width : "10rem",
                            marginRight : "0",
                            display : "none"
                        }}
                        borderColor = "cyan"
                        color = "cyan"
                        backgroundColor = "cyan"
                    />
                    <GlobalButton
                        text = "Request Sent"
                        ref = {showReqSentRef} 
                        onClick={ (e)=>{
                        e.preventDefault();
                        setShowPopUp(true);
                        setPopUpStatement("Do you want to cancel the friend request to "+searchedUser.username+" ?");
                        setPopUpFunction(()=>removeSentFriendReq);
                        }}
                        icon = {<i className="fas fa-check"></i>}
                        style = {{
                            width : "10rem",
                            marginRight : "0",
                            display : "none"
                        }}
                        borderColor = "grey"
                        color = "grey"
                        backgroundColor = "grey"
                    />
                    <GlobalButton
                        text = "Confirm"
                        ref = {friendReqConfirmRef} 
                        onClick={ confirmFriendButtonClickHandler}
                        icon = {<i className="fas fa-check"></i> }
                        style = {{
                            marginRight : "0",
                            display : "none"
                        }}
                        borderColor = "cyan"
                        color = "cyan"
                        backgroundColor = "cyan"
                    />
                    <GlobalButton
                        text = "Cancel"
                        ref = {friendReqCancelRef} 
                        onClick={ cancelReceivedRequestButtonClickHandler}
                        icon = {<i className="fas fa-check"></i>}
                        style = {{
                            marginRight : "0",
                            display : "none"
                        }}
                        borderColor = "grey"
                        color = "grey"
                        backgroundColor = "grey"
                    />
                    <GlobalButton
                        icon = {<i className="fas fa-user-friends"></i>}
                        text = "Friends"
                        ref = {showFriendsRef} onClick={(e)=>{
                        e.preventDefault();
                        setShowPopUp(true);
                        setPopUpStatement("Do you want to unfriend "+searchedUser.username+" ?");
                        setPopUpFunction(()=>unfriendButtonHandler);
                        }}
                        style = {{
                            marginRight : "0",
                            display : "none"
                        }}
                        borderColor = "cyan"
                        color = "cyan"
                        backgroundColor = "cyan"
                    />
                    <i onClick={messageButtonClickHandler} className="far fa-comments send-message-icon"></i>
                    <BiDotsVerticalRounded
                        className = "add-friend-dots"
                    />
                </div>
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

export default ProfilePage;


