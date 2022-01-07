import { lazy, Suspense, memo, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./MyProfile.css";
import Avatar from "../../component/Avatar/Avatar";
import PostCardLoader from "../../component/PostCardLoader/PostCardLoader";

const PostCard = lazy(() => import("../../component/postCard/postCard"));

const MyProfile = ({showLeftNavbar , hideLeftNavbar , setProgress , user}) => {
    const [userPosts, setUserPosts] = useState();

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
        setProgress && setProgress(10);

        const cookie = Cookies.get("x-auth-token");

        const fetch = async () => {
            if (!cookie || cookie === undefined) {
                window.location = "/login";
            } else {
                try {
                    setProgress && setProgress(20);
                    const res = await axios.get(
                        process.env.REACT_APP_BACKEND_API_URL +
                        "getmyprofile/?token=" +
                        cookie
                    );

                    setProgress && setProgress(40);

                    if (res.status === 204) {
                        window.location = "/login";
                    } else if (res.status === 200) {
                        setUserPosts(res.data.userPosts.reverse());
                        setProgress && setProgress(70);
                    }

                    setProgress && setProgress(100);
                } catch (error) {
                    window.location = "/error";
                }
            }
        };

        fetch();
    }, []);

    return (
        <div className="myprofile-full-div">
            <div className="myprofile-inner-div">
                <section className="myprofile-section-1">
                    <div className="myprofile-avatar-div">
                        <div className="myprofile-cover-pic"></div>
                        <div className="myprofile-profile-pic__div">
                            <Avatar
                                height="100%"
                                width="100%"
                                image={
                                    user &&
                                    user.profilePic
                                }
                            />
                        </div>
                    </div>
                </section>
                <section className="myprofile-section-2">
                    <p className="myprofile-section-2-username">
                        {user && user.username}
                    </p>
                    <p className="myprofile-section-2-useremail">
                        {user && user.email}
                    </p>
                </section>
                <section className="myprofile-section-3">
                    <br />
                    <Suspense fallback={<PostCardLoader top={544} />}>
                        {userPosts &&
                            userPosts.map((eachPost) => {
                                return (
                                    <PostCard
                                        userEmail={user.email}
                                        post={eachPost}
                                        key={eachPost._id}
                                        mainUserId={user._id}
                                    />
                                );
                            })}
                    </Suspense>
                </section>
            </div>
        </div>
    );
};

export default memo(MyProfile);
