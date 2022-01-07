import { useEffect, useState, useRef , useImperativeHandle , forwardRef, memo , lazy , Suspense } from "react";
import Cookies from "js-cookie";

import "./messagePage.css";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
const Avatar = lazy(() => import( "../../component/Avatar/Avatar"))
const ChatBubble = lazy(() => import( "./chatBubble"))

const MessagePage = ({hideLeftNavbar , showLeftNavbar , setProgress , onlineUsersIdArray , callSendMessageSocket , callSeenMessages},ref) => {
    const { myuserid, searcheduserid } = useParams();
    const [searchedUser, setSearchedUser] = useState(null);
    const [conversationId, setConversationId] = useState("");
    const [allChats, setAllChats] = useState([]);
    const cookie = Cookies.get("x-auth-token");
    const [isFriendOnline, setIsFriendOnline] = useState(false);

    useImperativeHandle(ref , (data) => ({
        updateArrivalMessage : (data) => {

            if(data && myuserid && searcheduserid && ((data.senderId === myuserid && data.recieverId === searcheduserid) || (data.senderId === searcheduserid && data.recieverId === myuserid))){
                setAllChats(prev => [...prev,data])
            }
        }
        
    }))

    useEffect(() => {
        if(searcheduserid){
            callSeenMessages && callSeenMessages(searcheduserid)
        }
    },[searcheduserid])


    const fetch = async () => {
        setProgress && setProgress(10);

        try {
            //////////////////// Getting ConversationId ////////////////////
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "conversation/?token=" + cookie,
                {
                    senderId: myuserid,
                    recieverId: searcheduserid,
                }
            );

            setProgress && setProgress(30);

            if (res.status === 204) {
                window.location = "/login";
            } else if (res.status === 200) {
                setConversationId(res.data.conversation._id);
            }

            setProgress && setProgress(40);

            //////////////////// Getting userDetails ////////////////////
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL +
                "getmessagepageuserdata/?token=" +
                cookie,
                {
                    userId: searcheduserid,
                }
            );

            setProgress && setProgress(70);

            if (response.status === 204) {
                window.location = "/login";
            } else if (response.status === 200) {
                setSearchedUser(response.data.user);
            }
            setProgress && setProgress(100);
        } catch (error) {
            window.location = "/error";
        }
    };

    useEffect(() => {
        if (!cookie || cookie === undefined) {
            window.location = "/login";
        } else {
            fetch();
        }
    }, [myuserid, searcheduserid]);

    useEffect(() => {
        if (conversationId) {
            const fetch = async () => {
                try {
                    /////////////////////getting all chats when conversationId is available////////////////

                    const res = await axios.post(
                        process.env.REACT_APP_BACKEND_API_URL +
                        "getmessages/?token=" +
                        cookie,
                        {
                            conversationId: conversationId,
                        }
                    );

                    if (res.status === 204) {
                        window.location = "/login";
                    } else if (res.status === 200) {
                        setAllChats(res.data.allChats);
                    }
                } catch (error) {
                    window.location = "/error";
                }
            };

            fetch();
        }
    }, [conversationId]);

    

    useEffect(() => {
        if(onlineUsersIdArray){

            setIsFriendOnline(onlineUsersIdArray.some(eachUser => eachUser._id === searcheduserid));

        }
    
    },[searcheduserid,onlineUsersIdArray])

    const messageSendButtonClickHandler = async (e) => {
        e.preventDefault();

        const chatContent = textRef.current.value.trim();

        if (chatContent && conversationId) {
            textRef.current.value = "";
            onChangeHandler();

            let customChatid = uuidv4();

            callSendMessageSocket && callSendMessageSocket({
                senderId: myuserid,
                recieverId: searcheduserid,
                chatContent: chatContent,
                conversationId: conversationId,
                customChatid: customChatid,
                isSeen: false,
            })

            try {
                const date = new Date();

                // produce random string
                let r = (Math.random() + 1).toString(36).substring(7);

                setAllChats((prev) => [
                    ...prev,
                    {
                        _id: r,
                        conversationId: conversationId,
                        senderId: myuserid,
                        recieverId: searcheduserid,
                        date: date,
                        chatContent: chatContent,
                        customChatid: customChatid,
                    },
                ]);

                const res = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "sendmessage?token=" + cookie,
                    {
                        senderId: myuserid,
                        recieverId: searcheduserid,
                        date: date,
                        chatContent: chatContent,
                        conversationId: conversationId,
                        customChatid: customChatid,
                    }
                );

                if (res.status === 204) {
                    window.location = "/login";
                }
            } catch (error) {
                window.location = "/error";
            }
        }
    };

    const textRef = useRef();

    const onChangeHandler = () => {
        textRef.current.style.height = "30px";
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    };

    useEffect(() => {
        if (allChats) {
            document.getElementById("message-page-last-message") &&
                document
                    .getElementById("message-page-last-message")
                    .scrollIntoView({ behavior: "smooth" });
        }
    }, [allChats]);

    function getOnlyUserName(fullName) {
        var i;
        let firstName = "";

        for (i of fullName) {
            if (i === " ") {
                return firstName;
            }

            firstName += i;
        }

        return firstName;
    }

    useEffect(() => {
        if (window.innerWidth > 900)
        {
            showLeftNavbar && showLeftNavbar()
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
        else hideLeftNavbar && hideLeftNavbar();
    }, []);



    return (
        <div className="messagepage-full-div">
            <div className="messagepage-inner-div">
                <div className="messagepage-friend-div">
                    <Suspense fallback = {<></>}>
                        <Avatar
                            height="4rem"
                            width="4rem"
                            image={searchedUser && searchedUser.profilePic}
                        />
                    </Suspense>
                    <div className="messagepage-friend-status-outer-div">
                        <p className="messagepage-friend-username">
                            {searchedUser &&
                                searchedUser.username &&
                                getOnlyUserName(searchedUser.username)}
                        </p>
                        <div className="messagepage-friend-status-inner-div">
                            <i
                                style={{ color: isFriendOnline && "greenYellow" }}
                                className="far fa-circle friend-status-icon"
                            ></i>
                            <p
                                style={{ color: isFriendOnline && "greenYellow" }}
                                className="friend-status-text"
                            >
                                {isFriendOnline ? "online" : "offline"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="message-div">
                    <div className="message-inner-div">
                        {allChats &&
                            <Suspense fallback = {<></>}>
                                {allChats.map((eachChat, index) => {
                                    
                                    return (
                                        <ChatBubble
                                            id={
                                                allChats
                                                    ? index === allChats.length - 1
                                                        ? "message-page-last-message"
                                                        : null
                                                    : null
                                            }
                                            key={uuidv4()}
                                            myUserid={myuserid}
                                            senderid={eachChat.senderId}
                                            chatContent={eachChat.chatContent}
                                            date={eachChat.date}
                                            chatId={eachChat._id}
                                            customChatid={eachChat.customChatid}
                                            isSeen={eachChat.isSeen}
                                            isPreviousMessageSenderSame={
                                                index > 0 &&
                                                allChats[index - 1].senderId === eachChat.senderId
                                            }
                                        />
                                    );
                                })}
                            </Suspense>
                        }
                    </div>
                </div>
                <div className="message-send-div">
                    <div className="message-send-textarea-div">
                        <textarea
                            onKeyPress={(e) => {
                                if (e.key !== "Enter" || e.shiftKey) {
                                    return;
                                }

                                messageSendButtonClickHandler(e);
                            }}
                            ref={textRef}
                            onChange={onChangeHandler}
                            placeholder="message..."
                            className="message-send-textarea"
                        />
                    </div>
                    <button
                        onClick={messageSendButtonClickHandler}
                        className="message-send-button"
                    >
                        <AiOutlineSend className="message-send-button-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(forwardRef(MessagePage));
