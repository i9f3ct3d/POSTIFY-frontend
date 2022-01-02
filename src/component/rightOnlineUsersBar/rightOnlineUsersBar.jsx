import axios from 'axios';
import { lazy, memo, Suspense, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import './rightOnlineUsersBar.css'
import { IoCloseOutline } from 'react-icons/io5'
import { Howl, Howler } from 'howler';
import NotificationSound from '../../audio/Notification.mp3'
import { useHistory } from 'react-router-dom';
const Avatar = lazy(() => import('../Avatar/Avatar'))

const RightOnlineUsersBar = (props) => {

    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, [])



    const socket = useRef();
    const [onlineUsersData, setOnlineUsersData] = useState(null);
    const [socketUserArray, setSocketUserArray] = useState(null);
    const [viewingUserid, setViewingUserid] = useState(null);
    const [unSeenMessageMap, setUnseenMessageMap] = useState(new Map());

    const playSound = () => {

        const sound = new Howl({
            src: [NotificationSound]
        });

        sound.play();
        Howler.volume(1);

    }

    useEffect(() => {

        socket.current = io(process.env.REACT_APP_SOCKET_API_URL);

        socket.current.on("getMessage", (data) => {

            playSound();
            fillSocketUnseenMessages(data.senderId);

        })


    }, []);




    const fillSocketUnseenMessages = (newSenderId) => {

        setUnseenMessageMap((prev) => {

            if (prev.has(newSenderId)) {

                let x = prev.get(newSenderId);
                let newMap = new Map(prev);
                newMap.set(newSenderId, x + 1);
                return newMap;

            } else {

                prev.set(newSenderId, 1);
                return prev;

            }

        })



    }


    useEffect(() => {

        if (props && props.viewingUserid) {
            setViewingUserid(props.viewingUserid);
        }

    }, [props])

    useEffect(() => {

        if (viewingUserid) {

            socket.current.emit("addUser", viewingUserid);
            socket.current.on("getOnlineUsers", users => {

                setSocketUserArray(users)
            })
        }


    }, [viewingUserid])

    async function convertArrayToMap(unSeenMessagesCountArray, unSeenMessagesCountMap, i) {

        if (i === unSeenMessagesCountArray.length) {

            setUnseenMessageMap(unSeenMessagesCountMap);
            return;

        }

        unSeenMessagesCountMap.set(unSeenMessagesCountArray[i][0], unSeenMessagesCountArray[i][1]);

        await convertArrayToMap(unSeenMessagesCountArray, unSeenMessagesCountMap, i + 1);

    }

    useEffect(() => {

        const fetch = async () => {


            try {

                if (socketUserArray && viewingUserid) {

                    let onlineUsersidArray = [];

                    for await (const u of socketUserArray) {
                        if (u.userId != viewingUserid)
                            onlineUsersidArray = [...onlineUsersidArray, u.userId];
                    }

                    if (onlineUsersidArray.length === 0) {
                        return;
                    }

                    const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "getonlineusers", {
                        "onlineUsersidArray": onlineUsersidArray,
                        "viewingUserid": viewingUserid
                    })

                    if (res.status === 200) {

                        setOnlineUsersData(res.data.onlineUsersData);
                        await convertArrayToMap(res.data.unSeenMessagesCount, new Map(), 0);
                    }


                }

            } catch (error) {
                window.location = "/error";
            }


        }

        fetch();


    }, [socketUserArray])

    const history = useHistory();

    const onlineUserClickHandler = (onlineUserid) => {

        history.push(`/messagepage/${viewingUserid}/${onlineUserid}`);


    }

    const onlineUsersBarCloseButtonHandler = () => {

        const allOnlineUsersBar = document.querySelectorAll(".right-online-users-bar-full-div");

        allOnlineUsersBar.forEach(o => {
            o.style.transform = "translateX(101%) translateZ(0)";
        });

    }

    if (!didMount) {
        return null;
    }


    return (
        <div style={props && props.style && props.style} className="right-online-users-bar-full-div">

            <div style={props && props.crossCloserStyle && props.crossCloserStyle} onClick={onlineUsersBarCloseButtonHandler} className="mobile-right-online-users-bar-close-div">
                <IoCloseOutline

                />
            </div>

            <p className="right-online-users-bar-title"><i className="far fa-circle right-online-users-bar-title-icon"></i>Online</p>
            <div style={{ height: "1px", backgroundColor: "#3D3F42", width: "100%", margin: "10px 0 0 0" }} className="underline"></div>
            <div className="right-online-users-bar-inner-div">

                {
                    onlineUsersData && onlineUsersData.map((eachUser, index) => {

                        if (eachUser._id === viewingUserid) {
                            return (
                                <div key={eachUser._id} style={{ display: "none" }}></div>
                            )
                        }

                        return (
                            <div onClick={() => { onlineUserClickHandler(eachUser._id) }} key={eachUser._id} className="right-online-users-bar-eachuser-div">
                                <div className="right-online-users-bar-eachuser-avatar-div">
                                    <Suspense fallback = {<></>}>
                                        <Avatar
                                            height="3rem"
                                            width="3rem"
                                            image={eachUser.profilePic}
                                            borderColor={unSeenMessageMap.has(eachUser._id) ? unSeenMessageMap.get(eachUser._id) > 0 ? "cyan" : "greenYellow" : "greenYellow"}
                                        />
                                    </Suspense>
                                    {unSeenMessageMap.has(eachUser._id) && unSeenMessageMap.get(eachUser._id) > 0 && <div className="online-user-div-unseen-message-count-div"><span className="online-user-div-unseen-message-count" style={{ color: "cyan", marginLeft: "20px" }}>{unSeenMessageMap.get(eachUser._id)}</span></div>}
                                </div>
                                <div className="right-online-users-bar-eachuser-username-div">
                                    <span style={{ color: unSeenMessageMap.has(eachUser._id) && unSeenMessageMap.get(eachUser._id) > 0 && "cyan" }} className="right-online-users-bar-eachuser-username">{eachUser.username}</span>
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

export default memo(RightOnlineUsersBar)
