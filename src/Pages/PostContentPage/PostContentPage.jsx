import {
    BrowserRouter as Router,
    Link,
    useHistory,
    useLocation,
    useParams,
} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import "./PostContentPage.css";
import { useState, useEffect, useRef , memo } from "react";

import Avatar from "../../component/Avatar/Avatar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { GiFlexibleStar } from 'react-icons/gi'
import { BsPen } from 'react-icons/bs'
import { AiOutlineSend } from 'react-icons/ai'

import starReactAnimation from "../../images/starReactAnimation.json";
import Lottie from "lottie-web";
import RightOnlineUsersBar from "../../component/rightOnlineUsersBar/rightOnlineUsersBar";

const PostContentPage = (props) => {

    const history = useHistory();
    const { postid, userid } = useParams();
    const viewingUserid = userid;

    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        props && props.hideLeftNavbar && props.hideLeftNavbar();
    }, []);

    const fetchData = async () => {
        props && props.setProgress && props.setProgress(10);

        try {
            const cookie = Cookie.get("x-auth-token");
            const res = await axios.get(
                process.env.REACT_APP_BACKEND_API_URL + "fetchuser/?token=" + cookie
            );

            props && props.setProgress && props.setProgress(30);

            if (res.data.credentials === "invalid") {
                window.location = "/login";
            }
            setCurrentUser(res.data.user);

            const response = await axios.get(
                process.env.REACT_APP_BACKEND_API_URL + "postinfo?postid=" + postid
            );
            
            if(response.data && (!response.data.postImage || response.data.postImage === "false")){
                if(postcardContentPagePostImageDivRef && postcardContentPagePostImageDivRef.current){
                    postcardContentPagePostImageDivRef.current.style.display = 'none'
                }
            }
            setPost(response.data);
            setLikeCount(response.data.likeArray.length);

            props && props.setProgress && props.setProgress(70);

            const isIncluded = response.data.likeArray.includes(viewingUserid);

            if (isIncluded) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }

            props && props.setProgress && props.setProgress(100);
        } catch (error) {
            window.location = "/error";
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [lastCancelToken, setLastCancelToken] = useState(null);

    const handleLikeClick = async (event) => {
        lastCancelToken && lastCancelToken.cancel();

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        setLastCancelToken(source);

        setIsLiked((prev) => !prev);

        if (isLiked && likeCount > 0) {
            setLikeCount((prev) => prev - 1);
            starAnim.goToAndStop(0, true);
        } else if (!isLiked) {
            setLikeCount((prev) => prev + 1);
            starAnim.setSpeed(0.5);
            starAnim.play();
            dontRunUseEffect.current = true;
        } else {
            setLikeCount((prev) => prev + 1);
            starAnim.setSpeed(0.5);
            starAnim.play();
            dontRunUseEffect.current = true;
            return;
        }

        try {
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_API_URL + "likepost",
                {
                    postid: postid,
                    userid: currentUser._id,
                    username: currentUser.username,
                    userProfilePic: currentUser.profilePic,
                },
                {
                    cancelToken: source.token,
                }
            );
        } catch (error) {
            const e = new Error(error);

            if (e.message !== "Cancel") {
                window.location = "/error";
            }
        }
    };

    const textAreaOnFocus = () => {
        const placeholder = document.querySelector(
            ".postcard-content-page-comment-section-custom-placeholder"
        );
        placeholder.style.top = "-12px";
        placeholder.innerHTML = "Comment";
        placeholder.style.color = "cyan";
        placeholder.style.backgroundColor = "#121212";
        document.querySelector(
            ".postcard-content-page-comment-section-div"
        ).style.borderColor = "cyan";
    };

    const textAreaOnBlur = (e) => {
        if (e.target.value.trim().length === 0) {
            const placeholder = document.querySelector(
                ".postcard-content-page-comment-section-custom-placeholder"
            );
            placeholder.style.top = "9px";
            placeholder.innerHTML = "Comment ...";
            placeholder.style.color = "#909192";
            placeholder.style.backgroundColor = "#121212";
            document.querySelector(
                ".postcard-content-page-comment-section-div"
            ).style.borderColor = "#3D3F42";
        }
    };

    const showuserPageHandler = () => {
        if (post && currentUser) {
            if (post.userid === currentUser._id) {
                history.push("/myprofile");
                return;
            }

            history.push(`/profilepage/${post.userid}`);
        }
    };

    function getMonth(n) {
        switch (n) {
            case 1: {
                return "Jan";
            }
            case 2: {
                return "Feb";
            }
            case 3: {
                return "Mar";
            }
            case 4: {
                return "Apr";
            }
            case 5: {
                return "May";
            }
            case 6: {
                return "Jun";
            }
            case 7: {
                return "Jul";
            }
            case 8: {
                return "Aug";
            }
            case 9: {
                return "Sep";
            }
            case 10: {
                return "Oct";
            }
            case 11: {
                return "Nov";
            }
            case 12: {
                return "Dec";
            }
            default: {
                return "Jan";
            }
        }
    }

    const getDate = (s) => {
        const stringDate = new Date(s);
        const month = getMonth(stringDate.getMonth());
        const date = stringDate.getDate();

        let ansString = "";

        if (date % 10 === 1) {
            ansString += date + "st ";
        } else if (date % 10 === 2) {
            ansString += date + "nd ";
        } else if (date % 10 === 3) {
            ansString += date + "rd ";
        } else {
            ansString += date + "th";
        }

        ansString += month;

        return ansString;
    };

    const postcardContentPagePostImageDivRef = useRef();
    const commentRef = useRef();

    const commentOnPostHandler = async (e) => {
        e.preventDefault();

        const typedComment = commentRef.current.value.trim();
        if (typedComment.length > 0) {

            try {
                const res = await axios.post(
                    process.env.REACT_APP_BACKEND_API_URL + "postinfo",
                    {
                        postid: postid,
                        comment: typedComment,
                        userEmail: currentUser.email,
                        username: currentUser.username,
                        userProfilePic: currentUser.profilePic,
                        userid: viewingUserid,
                    }
                );

                if (res.status === 200) {
                    // setRunUseEffect(prev=>!prev);
                    fetchData();
                } else {
                    window.location = "/error";
                }

                commentRef.current.value = "";
            } catch (error) {
                window.location = "/error";
            }
        }
    };

    const starReactAnimationRef = useRef(null);
    const [starAnim, setStarAnim] = useState(null);

    useEffect(() => {
        const anim = Lottie.loadAnimation({
            container: starReactAnimationRef.current,
            renderer: "canvas",
            loop: false,
            autoplay: false,
            path: "../../images/starReactAnimation.json",
            animationData: starReactAnimation,
            height : '5rem',
            width : '5rem'
        });

        setStarAnim(anim);
    }, []);

    const dontRunUseEffect = useRef(false);

    useEffect(() => {
        if (isLiked !== null && starAnim && !dontRunUseEffect.current) {
            if (isLiked) {
                starAnim.goToAndStop(30, true);
            } else {
                starAnim.goToAndStop(0, true);
            }
        }
    }, [starAnim, isLiked]);

    return (
        <div className="postcard-content-page-full-div">
            <RightOnlineUsersBar
                viewingUserid={currentUser && currentUser._id}
                style={{
                    backgroundColor: "#242527",
                    height: "100vh",
                    transform: "translateX(101%) translateZ(0)",
                    boxShadow: "-8px -4px 10px rgba(0 , 0 , 0 , 0.5)",
                }}
                crossCloserStyle={{
                    display: "inline-block",
                }}
            />

            <div className="postcard-content-page-post-card-main-div">
                <div className="postcard-content-page-post-card-header">
                    <div className="postcard-content-page-post-author-image">
                        <Avatar
                            height = "4rem"
                            width = "4rem"
                            image = {post && post.authorProfilePic && post.authorProfilePic}
                        />
                    </div>
                    <div className="postcard-content-page-post-card-author">
                        <span onClick={showuserPageHandler}>{post && post.username}</span>
                    </div>
                    <span className="postcard-content-page-post-card-date">
                        {post && post.postDate && getDate(post.postDate)}
                    </span>
                </div>
                <div className="postcard-content-page-post-card-title-div">
                    <span className="postcard-content-page-post-card-title">
                        {post && post.heading}
                    </span>
                </div>
                <div className="postcard-content-page-post-card-content-div">
                    <span className="postcard-content-page-post-card-content">
                        {post && post.postcontent}
                    </span>
                </div>
                <div
                    ref={postcardContentPagePostImageDivRef}
                    className="postcard-content-page-post-card-img-div"
                >
                {post && post.postImage && post.postImage !== "false" && (
                        <LazyLoadImage
                            afterLoad={() => {
                                postcardContentPagePostImageDivRef.current.style.height = "unset";
                            }}
                            placeholderSrc={process.env.PUBLIC_URL + "/logo192.png"}
                            height="100%"
                            width="100%"
                            alt="postImage"
                            className="postcard-content-page-post-card-img"
                            src={process.env.REACT_APP_BACKEND_API_URL + post.postImage}
                        />
                )}
                </div>
                <div className="postcard-content-page-post-card-like-count-div">
                    <GiFlexibleStar
                        className = 'postcard-content-page-post-card-like-icon'
                    />
                    <span className="postcard-content-page-post-card-like-count">{likeCount && likeCount}</span>
                </div>
                <div
                    className="postcard-content-page-post-card-underline"
                    style={{ width: "99%", height: "1px" , marginBottom : '10px'}}
                ></div>

                <div className="postcard-content-page-post-card-like-div">
                    <div onClick = {handleLikeClick} className="postcard-content-page-post-card-like-div-like-button">
                        <div
                            className="postcard-content-page-post-card-like-div-like-button-lottie-container"
                            ref={starReactAnimationRef}
                        ></div>
                        <span
                            className="postcard-content-page-post-card-like-div-like-button-text"
                        >
                            Star
                        </span>
                    </div>
                    <div className="postcard-content-page-post-card-like-div__comment-button__div">
                        <BsPen
                            className = 'postcard-content-page-post-card-like-div__comment-icon'
                        />
                        <span className="postcard-content-page-post-card-like-div__comment-button__div__span" >Comment</span>
                    </div>
                </div>
                <div
                    className="postcard-content-page-post-card-underline"
                    style={{ width: "99%", height: "1px" , marginBottom : '10px'}}
                ></div>

                
                    <div className="postcard-content-page-post-card-comments-div">
                        <div className="postcard-content-page-post-card-comments-div__title-div">
                            <span className="postcard-content-page-post-card-comments-div__title">C</span>
                            <span className="postcard-content-page-post-card-comments-div__title__middle">omment</span>
                            <span className="postcard-content-page-post-card-comments-div__title">S</span>
                        </div>

                        <div className="postcard-content-page-comment-section-div">
                            <div className="postcard-content-page-comment-section-avatar-div">
                                <Avatar
                                    height="1.5rem"
                                    width="1.5rem"
                                    image={currentUser && currentUser.profilePic}
                                />
                            </div>
                            <div className="postcard-content-page-comment-section-input-div">
                                <form onSubmit={commentOnPostHandler}>
                                    <input
                                        style={{ resize: "both" }}
                                        ref={commentRef}
                                        onFocus={textAreaOnFocus}
                                        onBlur={textAreaOnBlur}
                                        className="postcard-content-page-comment-section-textarea"
                                        type="text"
                                        required
                                    />
                                    <div
                                        onClick={commentOnPostHandler}
                                        type="submit"
                                        className="postcard-content-page-comment-button-div"
                                    >
                                        <AiOutlineSend
                                            className="postcard-content-page-comment-button"
                                        />
                                    </div>
                                </form>
                            </div>
                            <span className="postcard-content-page-comment-section-custom-placeholder">
                                Comment ...
                            </span>
                        </div>
                        {post && post.comments && post.comments.length > 0 && (
                            <div
                                className="postcard-content-page-post-card-underline"
                                style={{
                                    marginBottom: "50px",
                                    marginTop: "50px",
                                    height: "1px",
                                    width : '100%'
                                }}
                            ></div>
                        )}

                        {post &&
                            post.comments &&
                            post.comments.map((eachComment, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="postcard-content-page-post-card-each-comment"
                                    >
                                        <div className="postcard-content-page__each-comment__avatar-div">
                                            <Avatar
                                                height="100%"
                                                width="100%"
                                                image={
                                                    eachComment.userProfilePic &&
                                                    eachComment.userProfilePic
                                                }
                                            />
                                        </div>
                                        <div className="postcard-content-page__each-comment__right-div">
                                            <span className="postcard-content-page__each-comment__author-name">
                                                {eachComment.username}
                                            </span>
                                            <p
                                                className="postcard-content-page__each-comment__content"
                                                style={{
                                                    paddingTop:
                                                        eachComment.commentContent.length < 58 && "5px",
                                                    paddingBottom:
                                                        eachComment.commentContent.length < 58 && "10px",
                                                }}
                                            >
                                                {eachComment.commentContent}
                                            </p>
                                        </div>
                                        <br />
                                        <br />
                                    </div>
                                );
                            })}
                    </div>
                
            </div>
        </div>
    );
};
export default memo(PostContentPage);
