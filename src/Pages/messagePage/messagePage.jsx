import React, { useEffect, useState , useRef } from 'react';
import {io} from 'socket.io-client';
import Cookies from 'js-cookie';

import './messagePage.css';
import axios from 'axios';
import Avatar from '../../component/Avatar/Avatar';
import ChatBubble from './chatBubble';
import RightOnlineUsersBar from '../../component/rightOnlineUsersBar/rightOnlineUsersBar';
import { AiOutlineSend } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

const MessagePage=(props)=>{

    const { myuserid , searcheduserid } = useParams();


    const [searchedUser , setSearchedUser] = useState(null);
    const [viewingUser , setViewingUser] = useState(null);
    const [conversationId , setConversationId] = useState("");
    
    
    const [ arrivalMessage , setArrivalMessage] = useState(null)
    const [allChats , setAllChats] = useState([]);
    const [onlineUsers , setOnlineUsers] = useState(null);
    
    
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
                conversationId : data.conversationId,
                customChatid : data.customChatid,
                isSeen : data.isSeen,
            })

        })

    },[]);


    useEffect(()=>{

        if(arrivalMessage && allChats && myuserid && searcheduserid && ((arrivalMessage.senderId === myuserid && arrivalMessage.recieverId === searcheduserid) || (arrivalMessage.senderId === searcheduserid && arrivalMessage.recieverId === myuserid))){

            setAllChats((prev)=>[...prev,arrivalMessage])

        }

    },[arrivalMessage])

    useEffect(()=>{
        
        
        if(myuserid){
            socket.current.emit("addUser" , myuserid);
            socket.current.on("getOnlineUsers" , users=>{
                setOnlineUsers(users)
            })
        }
        

    },[myuserid])


    const fetch=async()=>{

        props && props.setProgress && props.setProgress(10);

        try {
            //////////////////// Getting ConversationId ////////////////////
            const res =await axios.post(process.env.REACT_APP_BACKEND_API_URL+"conversation/?token="+cookie,{
                "senderId" : myuserid,
                "recieverId" : searcheduserid,
            });

            props && props.setProgress && props.setProgress(30);

            if(res.status===204){
                window.location="/login";
            }else if(res.status === 200){
                setConversationId(res.data.conversation._id);
            }

            props && props.setProgress && props.setProgress(40);
            
        //////////////////// Getting userDetails ////////////////////
            const response =await axios.post(process.env.REACT_APP_BACKEND_API_URL+"getmessagepageuserdata/?token="+cookie,{
                "userId" : searcheduserid,
            });

            props && props.setProgress && props.setProgress(70);

            if(response.status===204){
                window.location="/login";
            }else if(response.status === 200){
                setSearchedUser(response.data.user);
                setViewingUser(response.data.viewingUser);

            }
            props && props.setProgress && props.setProgress(100);

        } catch (error) {
            window.location="/error";
        }  
    }


    
    
    useEffect(()=>{
        
        if(!cookie || cookie===undefined){
            window.location="/login";
        }else{
            
            fetch();
        }

    },[myuserid , searcheduserid]);

    

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

    },[conversationId])

    const [isFriendOnline , setIsFriendOnline] = useState(false)

    useEffect(()=>{

            let flag = false;


            onlineUsers && onlineUsers.forEach(user => {

                if(user.userId === searcheduserid){
                    flag =true;
                }
                
            });

            flag ? setIsFriendOnline(true)  : setIsFriendOnline(false)

    },[onlineUsers])

    const messageSendButtonClickHandler=async(e)=>{
        e.preventDefault();

        const chatContent = textRef.current.value.trim();

        if(chatContent && conversationId){

            textRef.current.value = "";
            onChangeHandler();

            let customChatid = uuidv4();


            isFriendOnline && socket.current.emit("sendMessage" , {
                senderId : myuserid,
                recieverId : searcheduserid,
                chatContent : chatContent,
                conversationId : conversationId,
                customChatid : customChatid,
                isSeen : false,
            })

            try {

                const date = new Date();

                // produce random string
                let r = (Math.random() + 1).toString(36).substring(7);

                setAllChats(prev => [...prev,{
                    _id : r,
                    conversationId : conversationId,
                    senderId : myuserid,
                    recieverId : searcheduserid,
                    date : date,
                    chatContent : chatContent,
                    customChatid : customChatid,
                }])

                const res =await axios.post(process.env.REACT_APP_BACKEND_API_URL+"sendmessage?token="+cookie,{
                    "senderId" : myuserid,
                    "recieverId" : searcheduserid,
                    "date" : date,
                    "chatContent" : chatContent,
                    "conversationId" : conversationId,
                    customChatid : customChatid,
                });
                

                if(res.status===204){
                    window.location="/login";
                }
                
            } catch (error) {
                window.location="/error";
            }
        }
        
    }

      const textRef = useRef();

      const onChangeHandler = () => {
        textRef.current.style.height = "30px";
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
      }

    useEffect(()=>{

        if(allChats){

            document.getElementById("message-page-last-message") && document.getElementById("message-page-last-message").scrollIntoView({behavior : 'smooth'});

        }

    },[allChats])
    

    function getOnlyUserName(fullName){

        var i;
        let firstName = "";

        for (i of fullName){

            if(i === ' '){
                return firstName;
            }

            firstName += i;

        }

        return firstName;

    }


    useEffect(() => {

        if(window.innerWidth > 900) props && props.showLeftNavbar && props.showLeftNavbar();
        else props && props.hideLeftNavbar && props.hideLeftNavbar();
    
    },[])


    return(
        
        <div className="messagepage-full-div">
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
                        <p className="messagepage-friend-username">{searchedUser && searchedUser.username && getOnlyUserName(searchedUser.username)}</p>
                        <div className="messagepage-friend-status-inner-div">
                            <i style={{color : isFriendOnline && "greenYellow"}} className="far fa-circle friend-status-icon"></i>
                            <p style={{color : isFriendOnline && "greenYellow"}} className="friend-status-text">{isFriendOnline ?"online" : "offline"}</p>
                        </div>
                    </div>
                </div>
                <div className="message-div">
                <div className="message-inner-div">

                    {
                        allChats && allChats.map((eachChat , index)=>{

                            return(
                                <ChatBubble

                                        id = {allChats ? ((index === allChats.length - 1) ? "message-page-last-message" : null) : null}
                                        key={eachChat._id}
                                        myUserid = {myuserid}
                                        senderid = {eachChat.senderId}
                                        chatContent = {eachChat.chatContent}
                                        date = {eachChat.date}
                                        chatId = {eachChat._id}
                                        customChatid = {eachChat.customChatid}
                                        isSeen = {eachChat.isSeen}
                                        isPreviousMessageSenderSame = { index > 0 && allChats[index - 1].senderId === eachChat.senderId}

                                    />
                            )
                        })
                    }
                    </div>
                </div>
                <div className="message-send-div">
                <div className="message-send-textarea-div">
                    <textarea
                    onKeyPress = {(e) => {
                        if(e.key !== "Enter" || e.shiftKey){
                            return;
                        }

                        messageSendButtonClickHandler(e);
                    }}
                    ref={textRef}
                    onChange={onChangeHandler} 
                    placeholder="message..." 
                    className="message-send-textarea"/>
                </div>
                    <button 
                        onClick={messageSendButtonClickHandler} className="message-send-button">
                        <AiOutlineSend
                            className = "message-send-button-icon"
                        />
                    </button>
                </div>
            </div>
        </div>
    )

}


export default MessagePage;