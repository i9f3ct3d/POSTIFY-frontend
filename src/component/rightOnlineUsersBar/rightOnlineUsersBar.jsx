import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../Avatar/Avatar';
import {io} from 'socket.io-client';
import './rightOnlineUsersBar.css'
import {IoCloseOutline} from 'react-icons/io5'

const RightOnlineUsersBar=(props)=>{

    const socket = useRef();
    const onlineUsersDivLoaderRef = useRef();
    const [onlineUsersData , setOnlineUsersData] = useState(null);
    const [socketUserArray , setSocketUserArray] = useState(null);
    const [viewingUserid , setViewingUserid] = useState(null);
    const [unSeenMessageMap , setUnseenMessageMap] = useState(new Map());

    useEffect(()=>{
    
        socket.current = io(process.env.REACT_APP_SOCKET_API_URL);

        socket.current.on("getMessage" , (data)=>{

            fillSocketUnseenMessages(data.senderId);

        })
        
        
    },[]);




    const fillSocketUnseenMessages= (newSenderId) => {

        setUnseenMessageMap((prev) => {

            if(prev.has(newSenderId)){

                let x = prev.get(newSenderId);
                let newMap = new Map(prev);
                newMap.set(newSenderId , x + 1);
                return newMap;

            }else{

                prev.set(newSenderId , 1);
                return prev;

            }

        })

        
            
    }
        

    useEffect(()=>{

        if(props && props.viewingUserid){
            setViewingUserid(props.viewingUserid);
        }

    },[props])
    
      useEffect(()=>{
              
        if(viewingUserid){

            socket.current.emit("addUser" , viewingUserid);
            socket.current.on("getOnlineUsers" , users=>{
                
                setSocketUserArray(users)
            })
        }
        
    
      },[viewingUserid])

    async function convertArrayToMap(unSeenMessagesCountArray , unSeenMessagesCountMap , i){

        if(i === unSeenMessagesCountArray.length){

            setUnseenMessageMap(unSeenMessagesCountMap);
            return;

        }

        unSeenMessagesCountMap.set(unSeenMessagesCountArray[i][0] , unSeenMessagesCountArray[i][1]);

        await convertArrayToMap(unSeenMessagesCountArray , unSeenMessagesCountMap , i + 1);

    }

    useEffect(()=>{

        const fetch = async() => {
            

            try {

                if(socketUserArray && viewingUserid){

                    let onlineUsersidArray = [];

                    for await(const u of socketUserArray){
                        if(u.userId != viewingUserid)
                            onlineUsersidArray = [...onlineUsersidArray,u.userId];
                    }

                    if(onlineUsersidArray.length === 0){
                        return;
                    }
                    else if( onlineUsersDivLoaderRef.current ){
                        onlineUsersDivLoaderRef.current.style.display = "block"
                    }
    
                    const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"getonlineusers",{
                        "onlineUsersidArray" : onlineUsersidArray,
                        "viewingUserid" : viewingUserid
                    })

                    if(res.status === 200){
                        
                        setOnlineUsersData(res.data.onlineUsersData);
                        await convertArrayToMap(res.data.unSeenMessagesCount , new Map() , 0);

                        onlineUsersDivLoaderRef.current.style.display = "none"
                    }

                    
                }
                
            } catch (error) {
                window.location = "/error";
            }
            

        }

        fetch();


    },[socketUserArray])

    const onlineUserClickHandler = (onlineUserid) => {

        window.location="/messagepage/?myuserid="+viewingUserid+"&searcheduserid="+onlineUserid;

    }

    const onlineUsersBarCloseButtonHandler = () => {

        const allOnlineUsersBar = document.querySelectorAll(".right-online-users-bar-full-div");

        allOnlineUsersBar.forEach(o => {
          o.style.transform = "translateX(101%) translateZ(0)";
        });

    }


    return (
        <div style = {props && props.style && props.style} className="right-online-users-bar-full-div">
            
            <div style = {props && props.crossCloserStyle && props.crossCloserStyle} onClick = {onlineUsersBarCloseButtonHandler} className="mobile-right-online-users-bar-close-div">
                <IoCloseOutline
                    
                />
            </div>

            <p className="right-online-users-bar-title"><i className="far fa-circle right-online-users-bar-title-icon"></i>Online</p>
            <div style={{height : "1px" , backgroundColor : "#3D3F42" , width : "100%" , margin : "10px 0 0 0"}} className="underline"></div>
            <div className = "right-online-users-bar-inner-div">
            
            <div ref = {onlineUsersDivLoaderRef} className="online-users-div-loader">
                            <div className="online-users-div-loader-part-1 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-2 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-3 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-4 online-users-div-loader-part"></div>                            <div className="online-users-div-loader-part-1 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-2 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-3 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-4 online-users-div-loader-part"></div>                            <div className="online-users-div-loader-part-1 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-2 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-3 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-4 online-users-div-loader-part"></div>                            <div className="online-users-div-loader-part-1 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-2 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-3 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-4 online-users-div-loader-part"></div><div className="online-users-div-loader-part-1 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-2 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-3 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-4 online-users-div-loader-part"></div>                            <div className="online-users-div-loader-part-1 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-2 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-3 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-4 online-users-div-loader-part"></div>                            <div className="online-users-div-loader-part-1 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-2 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-3 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-4 online-users-div-loader-part"></div>                            <div className="online-users-div-loader-part-1 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-2 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-3 online-users-div-loader-part"></div>
                            <div className="online-users-div-loader-part-4 online-users-div-loader-part"></div>
            </div>

                {
                    onlineUsersData && onlineUsersData.map((eachUser , index)=>{
                        
                        if(eachUser._id === viewingUserid){
                            return(
                                <div key = {eachUser._id} style={{display : "none"}}></div>
                            )
                        }

                        return(
                            <div onClick={()=>{onlineUserClickHandler(eachUser._id)}} key={eachUser._id} className="right-online-users-bar-eachuser-div">
                                <div className="right-online-users-bar-eachuser-avatar-div">
                                    <Avatar
                                        height = "3rem"
                                        width = "3rem"
                                        image = {eachUser.profilePic}
                                        borderColor = {unSeenMessageMap.has(eachUser._id) ? unSeenMessageMap.get(eachUser._id) > 0 ? "cyan" : "greenYellow" : "greenYellow"}
                                    />
                                    { unSeenMessageMap.has(eachUser._id) && unSeenMessageMap.get(eachUser._id) > 0 && <div className = "online-user-div-unseen-message-count-div"><span className = "online-user-div-unseen-message-count" style = {{color : "cyan" , marginLeft : "20px"}}>{ unSeenMessageMap.get(eachUser._id) }</span></div> }
                                </div>
                                <div className="right-online-users-bar-eachuser-username-div">
                                    <span style = {{color : unSeenMessageMap.has(eachUser._id) && unSeenMessageMap.get(eachUser._id) > 0 && "cyan"}} className="right-online-users-bar-eachuser-username">{eachUser.username}</span>
                                </div>
                                <div className="right-online-users-bar-eachuser-div-background"></div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(RightOnlineUsersBar)
