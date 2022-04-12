import axios from "axios";
import {
    lazy,
    memo,
    Suspense,
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import { io } from "socket.io-client";
import "./rightOnlineUsersBar.css";
import { IoCloseOutline } from "react-icons/io5";
import { Howl, Howler } from "howler";
import NotificationSound from "../../audio/Notification.mp3";
import { useLocation, useNavigate } from "react-router-dom";
const Avatar = lazy(() => import("../Avatar/Avatar"));

const RightOnlineUsersBar = (props, ref) => {
    const socket = useRef();
    const [onlineUsersData, setOnlineUsersData] = useState([]);
    const [unSeenMessageMap, setUnseenMessageMap] = useState(new Map());
    const [refreshState, setRefreshState] = useState(false);
    const socketOnlineUsersIdArray = useRef([]);
    const chattingUserId = useRef(null);
    const location = useLocation();

    useEffect(() => {
        props &&
            props.setOnlineUserIdArray &&
            props.setOnlineUserIdArray(onlineUsersData);
    }, [onlineUsersData]);

    const playSound = () => {
        const sound = new Howl({
            src: [NotificationSound],
        });

        sound.play();
        Howler.volume(1);
    };

    // setting chattingUserId if the user is on message page
    useEffect(() => {
        chattingUserId.current = null;
    }, [location]);

    useImperativeHandle(ref, () => ({
        sendMessageSocket: (data) => {
            socketOnlineUsersIdArray.current.includes(data.recieverId) &&
                socket.current.emit("sendMessage", data);
        },
        seenMessages: (searchedUserId) => {
            // when the user enters in the message page it makes all the messages seen from that user
            setUnseenMessageMap((prev) => {
                if (
                    prev[searchedUserId] !== undefined ||
                    prev[searchedUserId] !== null
                ) {
                    prev[searchedUserId] = 0;
                    return prev;
                } else return prev;
            });
            chattingUserId.current = searchedUserId;
        },
    }));

    const fillSocketUnseenMessages = (newSenderId) => {
        setUnseenMessageMap((prev) => {
            if (prev[newSenderId] !== undefined && prev[newSenderId] !== null) {
                prev[newSenderId] = prev[newSenderId] + 1;
                return prev;
            } else {
                prev[newSenderId] = 1;
                return prev;
            }
        });

        setRefreshState((prev) => !prev);
    };

    const playSoundAndFillSocketUnseenMessagesHandler = (data) => {
        if (chattingUserId.current !== data.senderId) {
            playSound();
            fillSocketUnseenMessages(data.senderId);
        }
        props &&
            props.callUpdateArrivalMessage &&
            props.callUpdateArrivalMessage(data);
    };

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_SOCKET_API_URL);
        socket.current.on(
            "getMessage",
            playSoundAndFillSocketUnseenMessagesHandler
        );

        return () => {
            socket.current.off(
                "getMessage",
                playSoundAndFillSocketUnseenMessagesHandler
            );
        };
    }, []);

    const removeUser = (user) => {
        user &&
            socketOnlineUsersIdArray &&
            socketOnlineUsersIdArray.current &&
            socketOnlineUsersIdArray.current.filter(
                (eachUserId) => eachUserId !== user.userId
            );

        user &&
            setOnlineUsersData((prev) => {
                return prev
                    ? prev.filter((eachUser) => eachUser._id !== user.userId)
                    : prev;
            });
        user &&
            setUnseenMessageMap((prev) => {
                delete prev[user.userId];
                return prev;
            });
    };

    useEffect(() => {
        socket.current.on("recentOfflineUser", removeUser);

        return () => {
            socket.current.off("recentOfflineUser", removeUser);
        };
    }, []);

    const isFetchBigDataCalled = useRef(false);

    const fetchBigData = async () => {
        try {
            if (
                socketOnlineUsersIdArray.current.length > 0 &&
                props &&
                props.user &&
                props.user._id
            ) {
                const res = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "getonlineusers",
                    {
                        onlineUsersidArray: socketOnlineUsersIdArray.current,
                        viewingUserid: props.user._id,
                    }
                );

                if (res.status === 200) {
                    isFetchBigDataCalled.current = true;
                    setOnlineUsersData(res.data.onlineUsersData);
                    setUnseenMessageMap(res.data.unSeenMessagesCount);
                    // setRefreshState(prev => !prev)
                }
            }
        } catch (error) {
            window.location = "/error";
        }
    };

    // < ------------------- Big Data --------------- >
    useEffect(() => {
        fetchBigData.current === false && fetchBigData();
    }, []);
    // < ------------------- Big Data --------------- >

    const setSocketUserArrayHandler = (users) => {
        users.forEach((eachUser) => {
            if (eachUser.userId !== props.user._id) {
                socketOnlineUsersIdArray.current.push(eachUser.userId);
            }
        });

        fetchBigData();
    };

    const getRecentOnlineUser = async (user) => {
        socketOnlineUsersIdArray &&
            socketOnlineUsersIdArray.current &&
            socketOnlineUsersIdArray.current.push(user.userId);

        try {
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "getsingleonlineuser",
                {
                    onlineUserid: user.userId,
                    viewingUserid: props.user._id,
                }
            );

            if (res.status === 200) {
                setUnseenMessageMap((prev) => {
                    Object.assign(prev, res.data.unSeenMessagesCount);
                    return prev;
                });
                setOnlineUsersData((prev) => [...prev, res.data.onlineUserData]);
            }
        } catch (error) {
            window.location = "/error";
        }
    };

    useEffect(() => {
        if (props && props.user) {
            socket.current.emit("addUser", props.user._id);
            socket.current.on("getAllOnlineUsers", setSocketUserArrayHandler);
        }

        return () => {
            socket.current.off("getAllOnlineUsers", setSocketUserArrayHandler);
        };
    }, []);

    useEffect(() => {
        socket.current.on("getRecentOnlineUser", getRecentOnlineUser);

        return () => {
            socket.current.off("getRecentOnlineUser", getRecentOnlineUser);
        };
    }, []);

    const navigate = useNavigate();

    const onlineUserClickHandler = (onlineUserid) => {
        navigate(`/messagepage/${props.user._id}/${onlineUserid}`);
    };

    const onlineUsersBarCloseButtonHandler = () => {
        const allOnlineUsersBar = document.querySelectorAll(
            ".right-online-users-bar-full-div"
        );

        allOnlineUsersBar.forEach((o) => {
            o.style.transform = "translateX(101%) translateZ(0)";
        });
    };

    return (
        <div
            id="#right__online-users__bar"
            style={props && props.style && props.style}
            className="right-online-users-bar-full-div"
        >
            <div
                id="#right__online-users__bar-cross-closer"
                style={props && props.crossCloserStyle && props.crossCloserStyle}
                onClick={onlineUsersBarCloseButtonHandler}
                className="mobile-right-online-users-bar-close-div"
            >
                <IoCloseOutline />
            </div>

            <p className="right-online-users-bar-title">
                <i className="far fa-circle right-online-users-bar-title-icon"></i>
                Online
            </p>

            <div
                style={{
                    height: "1px",
                    backgroundColor: "#3D3F42",
                    width: "100%",
                    margin: "10px 0 0 0",
                }}
                className="underline"
            ></div>
            <div className="right-online-users-bar-inner-div">
                {onlineUsersData &&
                    onlineUsersData.map((eachUser, index) => {
                        if (eachUser._id === props.user._id) {
                            return <div key={eachUser._id} style={{ display: "none" }}></div>;
                        }

                        return (
                            <div
                                onClick={() => {
                                    onlineUserClickHandler(eachUser._id);
                                }}
                                key={eachUser._id}
                                className="right-online-users-bar-eachuser-div"
                            >
                                <div className="right-online-users-bar-eachuser-avatar-div">
                                    <Suspense fallback={<></>}>
                                        <Avatar
                                            height="3rem"
                                            width="3rem"
                                            image={eachUser.profilePic}
                                            borderColor={
                                                unSeenMessageMap[eachUser._id]
                                                    ? unSeenMessageMap[eachUser._id] > 0
                                                        ? "cyan"
                                                        : "greenYellow"
                                                    : "greenYellow"
                                            }
                                        />
                                    </Suspense>
                                    {
                                        <div
                                            style={{
                                                display: unSeenMessageMap[eachUser._id] == 0 && "none",
                                            }}
                                            className="online-user-div-unseen-message-count-div"
                                        >
                                            <span
                                                className="online-user-div-unseen-message-count"
                                                style={{ color: "cyan", marginLeft: "20px" }}
                                            >
                                                {unSeenMessageMap[eachUser._id]}
                                            </span>
                                        </div>
                                    }
                                </div>
                                <div className="right-online-users-bar-eachuser-username-div">
                                    <span
                                        style={{
                                            color: unSeenMessageMap[eachUser._id]
                                                ? unSeenMessageMap[eachUser._id] > 0
                                                    ? "cyan"
                                                    : "greenYellow"
                                                : "greenYellow",
                                        }}
                                        className="right-online-users-bar-eachuser-username"
                                    >
                                        {eachUser.username}
                                    </span>
                                </div>
                                <div className="right-online-users-bar-eachuser-div-background"></div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default memo(forwardRef(RightOnlineUsersBar));
