import { lazy, memo, Suspense, useEffect, useRef, useState } from "react";
import "./FriendRequest.css";
import Cookies from "js-cookie";
import axios from "axios";
const FriendRequestCard = lazy(() => import("./components/FriendRequestCard"));

const FriendRequest = ({showLeftNavbar , hideLeftNavbar , setProgress , user}) => {
    const [friendReqRecievedUsersArray, setFriendReqRecievedUsersArray] = useState(null);
    const cookie = Cookies.get("x-auth-token");
    const noFriendReqRef = useRef();

    useEffect(() => {
        if (window.innerWidth > 900)
        {
            showLeftNavbar && showLeftNavbar();
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

    useEffect(() => {
        if (user) {
            const fetch = async () => {
                try {
                    const res = await axios.post(
                        process.env.REACT_APP_BACKEND_API_URL +
                        "getreceivedrequestuserdata",
                        {
                            friendReqRecieved: user.friendReqRecieved,
                        }
                    );

                    if (res.status === 200) {
                        setFriendReqRecievedUsersArray(
                            res.data.friendReqRecievedUsersArray
                        );

                        if(!res.data.friendReqRecievedUsersArray || res.data.friendReqRecievedUsersArray.length === 0){
                            noFriendReqRef.current.style.display = 'block'
                        }
                    }
                } catch (error) {
                    window.location = "/error";
                }
            };

            fetch();
        }
    }, [user]);

    return (
        <div className="friend-request-page-full-div">
            <div className="friend-request-page-inner-div">
                <Suspense fallback={<></>}>
                    {friendReqRecievedUsersArray &&
                        friendReqRecievedUsersArray.map((eachUser) => {
                            return (
                                <FriendRequestCard
                                    key={eachUser._id}
                                    userid={eachUser._id}
                                    username={eachUser.username}
                                    userProfilePic={eachUser.profilePic}
                                    confirmFriendButtonClickHandler={async () => {
                                        try {
                                            const res = await axios.post(
                                                process.env.REACT_APP_BACKEND_API_URL +
                                                "acceptfriendreq/?token=" +
                                                cookie,
                                                {
                                                    friendUserId: eachUser._id,
                                                }
                                            );

                                            if (res.status === 204) {
                                                window.location = "/login";
                                            }
                                        } catch (error) {
                                            window.location = "/error";
                                        }
                                    }}
                                    cancelFriendRequestButtonClickHandler={async () => {
                                        try {
                                            const res = await axios.post(
                                                process.env.REACT_APP_BACKEND_API_URL +
                                                "removerecievedfriendreq/?token=" +
                                                cookie,
                                                {
                                                    friendUserId: eachUser._id,
                                                }
                                            );

                                            if (res.status === 204) {
                                                window.location = "/login";
                                            } else if (res.status === 200) {
                                                setFriendReqRecievedUsersArray((prev) =>
                                                    prev.filter((u) => u._id !== eachUser._id)
                                                );
                                            }
                                        } catch (error) {
                                            window.location = "/error";
                                        }
                                    }}
                                />
                            );
                        })}
                </Suspense>
                <span style={{display : 'none' , color : 'white' , fontFamily : 'Barlow Condensed' , fontSize : '2rem' , marginTop : '20px'}} ref = {noFriendReqRef}>No FriendRequest Yet ...</span>
                {/* } */}
            </div>
        </div>
    );
};

export default memo(FriendRequest);
