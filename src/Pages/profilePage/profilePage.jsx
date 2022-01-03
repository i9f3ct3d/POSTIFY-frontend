import {lazy , Suspense, memo , useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BiDotsVerticalRounded } from "react-icons/bi";

import './profilePage.css';
import PopUp from './components/PopUp/popUp';
import { useHistory, useParams } from 'react-router-dom';
import Avatar from '../../component/Avatar/Avatar';
import PostCardLoader from '../../component/PostCardLoader/PostCardLoader';

const GlobalButton = lazy(() => import( '../../component/GlobalButton/GlobalButton'))
const PostCard = lazy(() => import( '../../component/postCard/postCard'))

const ProfilePage = (props) => {

    const noPic = "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd";
    const [searchedUser , setSearchedUser] = useState();
    const [searchedUserPosts , setSearchedUserPosts] = useState();
    const [myUserid , setMyUserid] = useState();

    const [showPopUp , setShowPopUp] = useState(false);
    const [popUpStatement , setPopUpStatement] = useState("");
    const [popUpFunction , setPopUpFunction] = useState(()=>{});

    const cookie = Cookies.get('x-auth-token');

    const showAddFriendRef = useRef();
    const showFriendsRef = useRef();
    const showReqSentRef = useRef();
    const friendReqCancelRef = useRef();
    const friendReqConfirmRef = useRef();

    const { searcheduserid } = useParams();

    const history = useHistory();



    useEffect(() => {

        if(window.innerWidth > 900){
            props && props.showLeftNavbar && props.showLeftNavbar();
            const rightOnlineUsersBar = document.getElementById('#right__online-users__bar');
            if(rightOnlineUsersBar){
                rightOnlineUsersBar.style.backgroundColor = 'transparent'
                rightOnlineUsersBar.style.height = '100vh'
                rightOnlineUsersBar.style.transform = 'translateX(0) translateZ(0)'
                rightOnlineUsersBar.style.boxShadow = 'none'
            }
      
            const crossCloser = document.getElementById('#right__online-users__bar-cross-closer');
            if(crossCloser){
                crossCloser.style.display = 'none'
            }
        }
        else props && props.hideLeftNavbar && props.hideLeftNavbar();
    
    },[])

    const fetch = async()=>{
        props && props.setProgress && props.setProgress(10);

        let searchedUserid = searcheduserid;


        if(!cookie)
        {
            window.location = '/error';
        }

        if(cookie)
        {
            

            if(!searchedUserid)
            {
                ///////////// Show a no match of user block////////////
                return;
            }
            else{

                try {

                    props && props.setProgress && props.setProgress(20);

                    const response = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "getuser/?token="+cookie,{
                        "searchedUserid":searchedUserid
                    });

                    props && props.setProgress && props.setProgress(50);

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

                        props && props.setProgress && props.setProgress(80);

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
                    
                    props && props.setProgress && props.setProgress(100);


                } catch (error) {
                    window.location = '/error';
                }

            }
        }

    }

    useEffect(() => {

        searcheduserid && fetch();

    } , [searcheduserid])

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
                // setUseEffectRefresh(prev => !prev);
                fetch();
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
                // setUseEffectRefresh(prev => !prev);
                fetch();
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
                // setUseEffectRefresh(prev => !prev);
                fetch();
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
                // setUseEffectRefresh(prev => !prev);
                fetch();
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
                // setUseEffectRefresh(prev => !prev);
                fetch();
            }


            
        } catch (error) {
            window.location="/error";
        }
    }



    const messageButtonClickHandler=(e)=>{
        e.preventDefault();

        history.push(`/messagepage/${myUserid}/${searchedUser._id}`)

    }



    return(
        <div className="profilepage-full-div">

            <PopUp
                show={showPopUp}
                closePopUp={setShowPopUp}
                confirmPopUp={popUpFunction}
                statement={popUpStatement}
            />
            <div style={{display:!showPopUp && "none"}} className="popup-backdrop"></div>
            <div style={{filter:showPopUp && "blur(5px)"}} className="profilepage-inner-div">
                <section className="profilepage-section-1">
                    <div className="profilepage-avatar-div">
                        <div className="profilepage-cover-pic">

                        </div>
                        <div className="profilepage-profile-pic__div">
                            <Avatar height = '100%' width = '100%' image = {searchedUser && searchedUser.profilePic} />
                        </div>
                    </div>
                </section>
                <section className="profilepage-section-2">
                    <p className="profilepage-section-2-username">{searchedUser && searchedUser.username}</p>
                    <div className = "profilepage-section-2-buttons">

                    <Suspense fallback = {<></>}>
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
                    </Suspense>
                    <i onClick={messageButtonClickHandler} className="far fa-comments send-message-icon"></i>
                    <BiDotsVerticalRounded
                        className = "add-friend-dots"
                    />
                </div>
                </section>
                <section className="profilepage-section-3">
                <br/>
                <Suspense fallback = {<PostCardLoader top = {544} />}>
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
                </Suspense>
                </section>
                
            </div>
        </div>
    );
}

export default memo(ProfilePage);


