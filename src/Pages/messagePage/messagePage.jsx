import React, { useEffect, useState , useRef } from 'react';
import {io} from 'socket.io-client';
import Cookies from 'js-cookie';
import Navbar from "../../component/navbar/navbar"

import './messagePage.css';
import axios from 'axios';
import Avatar from '../../component/Avatar/Avatar';
import ChatBubble from './chatBubble';
import BackgroundAnimation from '../../component/BackgroundAnimation/BackgroundAnimation';
import LeftNavbar from '../../component/leftNavbar/leftNavbar';
import RightOnlineUsersBar from '../../component/rightOnlineUsersBar/rightOnlineUsersBar';

const MessagePage=(props)=>{


    const search = window.location.search;
    const query = new URLSearchParams(search);

    const myUserid = query.get('myuserid');
    const searchedUserid = query.get('searcheduserid');


    const [searchedUser , setSearchedUser] = useState(null);
    const [viewingUser , setViewingUser] = useState(null);
    const [runUseEffect , setRunUseEffect] = useState(false);
    const [conversationId , setConversationId] = useState("");
    
    
    const [ arrivalMessage , setArrivalMessage] = useState(null)
    const [allChats , setAllChats] = useState([]);
    const [onlineUsers , setOnlineUsers] = useState(null);
    const [typedText , setTypedText] = useState("");
    
    
    const socket  = useRef();
    const cookie = Cookies.get('x-auth-token');
    
    useEffect(()=>{
        
        socket.current = io(process.env.REACT_APP_SOCKET_API_URL);

        socket.current.on("getMessage" , data=>{

            setArrivalMessage({
                senderId : data.senderId,
                recieverId : data.recieverId,
                date : new Date(),
                chatContent : data.chatContent,
                conversationId : data.conversationId
            })

        })

    },[]);

    useEffect(()=>{

        if(arrivalMessage && allChats && myUserid && searchedUserid && (arrivalMessage.senderId === myUserid || searchedUserid)){

            setAllChats((prev)=>[...prev,arrivalMessage])

        }

    },[arrivalMessage])

    useEffect(()=>{
        
        
        if(myUserid){
            socket.current.emit("addUser" , myUserid);
            socket.current.on("getOnlineUsers" , users=>{
                setOnlineUsers(users)
            })
        }
        

    },[myUserid])



    
    
    useEffect(()=>{
        
        if(!cookie || cookie===undefined){
            window.location="/login";
        }else{

            const fetch=async()=>{
                try {
                    //////////////////// Getting ConversationId ////////////////////
                    const res =await axios.post(process.env.REACT_APP_BACKEND_API_URL+"conversation/?token="+cookie,{
                        "senderId" : myUserid,
                        "recieverId" : searchedUserid,
                    });
    
                    if(res.status===204){
                        window.location="/login";
                    }else if(res.status === 200){
                        setConversationId(res.data.conversation._id);
                    }
                    
                //////////////////// Getting userDetails ////////////////////
                    const response =await axios.post(process.env.REACT_APP_BACKEND_API_URL+"getmessagepageuserdata/?token="+cookie,{
                        "userId" : searchedUserid,
                    });
    
                    if(response.status===204){
                        window.location="/login";
                    }else if(response.status === 200){
                        setSearchedUser(response.data.user);
                        setViewingUser(response.data.viewingUser);
                    }


                } catch (error) {
                    window.location="/error";
                }  
            }
            
            fetch();
        }

    },[]);

    

    useEffect(()=>{
        if(conversationId){
        const fetch=async()=>{
            try {
                /////////////////////getting all chats when conversationId is available////////////////

                const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"getmessages/?token="+cookie,{
                    conversationId : conversationId,
                });

                if(res.status === 204){
                    window.location="/login";
                }else if(res.status === 200){

                    setAllChats(res.data.allChats);
                    
                }

            } catch (error) {
                window.location="/error"
            }
        } 
        
        fetch();}

    },[conversationId,runUseEffect])

    const [isFriendOnline , setIsFriendOnline] = useState(false)

    useEffect(()=>{

            let flag = false;


            onlineUsers && onlineUsers.forEach(user => {

                if(user.userId === searchedUserid){
                    flag =true;
                }
                
            });

            flag ? setIsFriendOnline(true)  : setIsFriendOnline(false)

    },[onlineUsers])

    const messageSendButtonClickHandler=async(e)=>{
        e.preventDefault();

        const chatContent = typedText.trim();

        if(chatContent && conversationId){

            const background = document.querySelector(".message-send-button-background");
            background.classList.toggle("clicked-message-button");
            setTypedText("");
            setTimeout(() => {
                background.classList.toggle("clicked-message-button");
            }, 1000);


            isFriendOnline && socket.current.emit("sendMessage" , {
                senderId : myUserid,
                recieverId : searchedUserid,
                chatContent : chatContent,
                conversationId : conversationId
            })

            try {

                const date = new Date();

                const res =await axios.post(process.env.REACT_APP_BACKEND_API_URL+"sendmessage?token="+cookie,{
                    "senderId" : myUserid,
                    "recieverId" : searchedUserid,
                    "date" : date,
                    "chatContent" : chatContent,
                    "conversationId" : conversationId
                });

                if(res.status===204){
                    window.location="/login";
                }
                else if(res.status === 200){
                    setRunUseEffect(!runUseEffect);
                }
                
            } catch (error) {
                window.location="/error";
            }
        }
        
    }



    return(
        <div className="messagepage-full-div">
            <Navbar/>
            <BackgroundAnimation/>
            <LeftNavbar
                profilePic = {viewingUser && viewingUser.profilePic}
                username = {viewingUser && viewingUser.username}
            />
            <RightOnlineUsersBar
                viewingUserid={viewingUser && viewingUser._id}
            />
            <div className="messagepage-inner-div">
                <div className="messagepage-friend-div">
                    <Avatar
                        height="4rem"
                        width="4rem"
                        image={searchedUser && searchedUser.profilePic}
                    />
                    <div className="messagepage-friend-status-outer-div">
                        <p className="messagepage-friend-username">{searchedUser && searchedUser.username}</p>
                        <div className="messagepage-friend-status-inner-div">
                            <i style={{color : isFriendOnline && "greenYellow"}} className="far fa-circle friend-status-icon"></i>
                            <p style={{color : isFriendOnline && "greenYellow"}} className="friend-status-text">{isFriendOnline ?"online" : "offline"}</p>
                        </div>
                    </div>
                </div>
                <div className="message-div">
                <div className="message-inner-div">

                    {
                        allChats.map((eachChat)=>{

                            let obj = <ChatBubble
                                        key={eachChat._id}
                                        myUserid = {myUserid}
                                        senderid = {eachChat.senderId}
                                        chatContent = {eachChat.chatContent}
                                        date = {eachChat.date}
                                    />

                            return(
                                obj
                            )
                        })
                    }
                    </div>
                </div>
                <div className="message-send-div">
                <div className="message-send-textarea-div">
                    <textarea placeholder="message..." value={typedText} onChange={(e)=>{setTypedText(e.target.value)}} className="message-send-textarea"/>
                </div>
                    <button style={{background: !typedText.trim() && "rgba(161, 160, 160, 0.349)",transform:!typedText.trim() && "none"}} onClick={messageSendButtonClickHandler} className="message-send-button"><i style={{color: !typedText.trim() && "grey"}} className="far fa-paper-plane message-send-button-icon"></i><i className="far fa-paper-plane message-send-button-background"></i></button>
                </div>
            </div>
        </div>
    )

}


export default MessagePage;