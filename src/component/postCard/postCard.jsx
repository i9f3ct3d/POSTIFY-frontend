import React, { useEffect, useRef, useState } from "react";
import axios from "axios"
import "./postCard.css"
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import {IoCloseOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import Avatar from '../Avatar/Avatar'
import LottieAnimation from "../../Pages/lottiAnimation";
import saveAnimation from '../../images/saveAnimation.json'
import viewPostAnimation from '../../images/viewpostAnimation.json'
import starReactAnimation from '../../images/starReactAnimation.json'
import Lottie from 'lottie-web'
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// let likedPosts = new Set();

const PostCard = props => {

    const [randomComment, setRandomComment] = useState(props.post.comments.length > 0 ? props.post.comments[Math.floor(Math.random() * props.post.comments.length)] : null);
    const [likeCount, changeLikeCount] = useState(0)
    const [isLiked, changeisLiked] = useState(false);

    const postCardDotsBar = useRef();
    const postCardDotsBarCloser = useRef();


    const findRandomComment = () => {
        props.post.comments.forEach(comment => {
            if (comment.userEmail === props.userEmail) {
                setRandomComment(comment);
                return;
            }
        });
    }

    const checkLikeCount = () => {

        changeLikeCount(props.post.likeArray.length);
        if (props.post.likeArray.includes(props.mainUserId)) {
            changeisLiked(true);
        }
        else {
            changeisLiked(false);
        }

    }

    // const turnOnConfetti = () => {

    //     props && props.turnOnConfetti && props.turnOnConfetti();

    // }

    // const turnOffConfetti = () => {

    //     props && props.turnOffConfetti && props.turnOffConfetti();

    // }

    const [lastCancelToken , setLastCancelToken] = useState(null);

    const handleLikeClick = async (event) => {

        lastCancelToken && lastCancelToken.cancel();

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        setLastCancelToken(source);

        
        if (isLiked && likeCount > 0) {
            changeLikeCount(prev => prev - 1);
            // turnOffConfetti();
            starAnim.goToAndStop(0,true);
        }
        else {
            changeLikeCount(prev => prev + 1);
                            
            starAnim.setSpeed(0.5)
            starAnim.play();
            dontRunUseEffect.current = true;
        }

        changeisLiked(prev => !prev);

        const postId = props.post._id;
        const userId = props.mainUserId;

        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "likepost", {
                postid: postId,
                userid: userId,
                username: props.viewingUsername,
                userProfilePic : props.viewingUserProfilePic,
            },{
                cancelToken : source.token,
            })

            changeLikeCount(response.data.length);

        } catch (error) {
            const e = new Error(error);

            if(e.message !== "Cancel"){
                window.location="/error";
            }
        }

    }

    const viewPostHandler = async (event) => {
        event.preventDefault();
        const postid = props.post._id;
        const userid = props.mainUserId;

        window.location = "/postinfo/?postid=" + postid + "&userid=" + userid;
    }


    useEffect(() => {
        findRandomComment();
        checkLikeCount();
    }, [props])



    const postCardDotsClickHanlder=()=>{
        postCardDotsBar.current.style.display = "block";
    }

    const postCardBarCrossClickHanlder=()=>{
        postCardDotsBar.current.style.display = "none";
    }

    const savePostButtonClickHanlder=async()=>{
        postCardBarCrossClickHanlder();
        try {
            
            const cookie = Cookies.get("x-auth-token");
            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"savepost/?token="+cookie,{
                "post" : props.post,
            });

            if(res.status === 200){
                
                toast.success('Saved!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }


        } catch (error) {
            window.location ="/error"
        }

    }

    function getMonth(n){

        switch(n){
            case 1 : {
                return "Jan";
            }
            case 2 : {
                return "Feb";
            }
            case 3 : {
                return "Mar";
            }
            case 4 : {
                return "Apr";
            }
            case 5 : {
                return "May";
            }
            case 6 : {
                return "Jun";
            }
            case 7 : {
                return "Jul";
            }
            case 8 : {
                return "Aug";
            }
            case 9 : {
                return "Sep";
            }
            case 10 : {
                return "Oct";
            }
            case 11 : {
                return "Nov";
            }
            case 12 : {
                return "Dec";
            }
            default : {
                return "Jan";
            }
        }

    }

    const getDate=(s)=>{

        const stringDate = new Date(s);
        const month = getMonth(stringDate.getMonth());
        const date = stringDate.getDate();

        let ansString = "";

        if(date % 10 === 1){
            ansString += date + "st ";
        }else if(date % 10 === 2){
            ansString += date + "nd ";
        }else if(date % 10 === 3){
            ansString += date + "rd ";
        }else{
            ansString += date + "th";
        }

        ansString += month;

        return ansString;

    }
    

    const showuserPageHandler = () => {
        if(props){

            if(props.mainUserId === props.post.userid){
                window.location="/myprofile";
                return;
            }

            window.location="/profilepage?searcheduserid="+props.post.userid;
        }
    }


    const starReactAnimationRef = useRef(null);
    const [starAnim , setStarAnim] = useState(null)

      useEffect(()=>{

        const anim = Lottie.loadAnimation({
            container : starReactAnimationRef.current, 
            renderer : 'canvas',
            loop : false,
            autoplay : false,
            path : "../../images/starReactAnimation.json",
            animationData : starReactAnimation,
        })

        
        setStarAnim(anim);


      },[])

      const dontRunUseEffect = useRef(false);

      useEffect(()=>{

        if(isLiked !== null && starAnim && !dontRunUseEffect.current){

            if(isLiked){

                starAnim.goToAndStop(30,true);
                
            }else{
                
                starAnim.goToAndStop(0,true);
            }

        }

      },[starAnim , isLiked])

      const postCardImageDivRef = useRef();

    return (
        <div className="post-card-main-div">

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme = "colored"
            />

            <div onClick={postCardDotsClickHanlder} className="post-card-dots-div">
                <BiDotsHorizontalRounded
                    className="post-card-dots"
                />
            </div>
            <div ref={postCardDotsBar} className="post-card-dots-bar">
                <div onClick={savePostButtonClickHanlder} className="post-card-dots-bar-save-post-div">
                    <div className="post-card-dots-bar-save-post-icon-div">
                        <LottieAnimation
                            lotti = {saveAnimation}
                            height = "1.7rem"
                            width = "1.7rem"
                        />
                     </div>
                    <div className="post-card-dots-bar-save-post-text-div">Save post</div>
                </div>
                <div onClick={viewPostHandler} className="post-card-dots-bar-save-post-div">
                    <div className="post-card-dots-bar-save-post-icon-div">
                        <LottieAnimation
                            lotti = {viewPostAnimation}
                            height = "1.8rem"
                            width = "1.8rem"
                        />
                        {/* <AiOutlineEye className="post-card-dots-bar-save-post-icon"/> */}
                    </div>
                    <div className="post-card-dots-bar-save-post-text-div">Read post</div>
                </div>
                <div ref={postCardDotsBarCloser} onClick={postCardBarCrossClickHanlder} className="post-card-dots-bar-save-post-div-close-cross-div">
                    <IoCloseOutline
                        className="post-card-dots-bar-save-post-div-close-cross"
                    />
                </div>
            </div>
            <div className="post-card-header">
                <div className="post-author-image">
                    <Avatar
                        height = "3.5rem"
                        width = '3.5rem'
                        borderColor = "cyan"
                        image = {props && props.post.authorProfilePic}
                        onClick = {showuserPageHandler}
                    />
                </div>
                <div className="post-card-author">
                    <h4 onClick = {showuserPageHandler}>{props.post.username}</h4>
                </div>
                <p className="post-card-date">{props && props.post && props.post.postDate && getDate(props.post.postDate)}</p>
            </div>
            <div className="post-card-underline" style={{ height: "1px" }}></div>
            <div className="post-card-title-div">
                <h3 className="post-card-title">{props.post.heading}</h3>
            </div>
            <div className="post-card-content-div">
                <p className="post-card-content">{props.post.postcontent.length > 410 ? props.post.postcontent.substr(0, 410) + "...." : props.post.postcontent}</p>
                {props.post.postcontent.length > 410 && <p onClick={viewPostHandler} className="post-card-readmore">Read more</p>}
            </div>
            {props.post.postImage && props.post.postImage!=="false" && <div ref={postCardImageDivRef} className="post-card-img-div">
                <LazyLoadImage afterLoad={()=>{
                    postCardImageDivRef.current.style.height = "unset";
                    postCardImageDivRef.current.style.maxHeight = "30rem";
                }} placeholderSrc = {process.env.PUBLIC_URL + "/logo192.png"} width="100%" height="100%" onClick={viewPostHandler} className="post-card-img" src={process.env.REACT_APP_BACKEND_API_URL + props.post.postImage} />
            </div>}
            <div className="post-card-like-count-div">
                <i className="fa-star fas" style={{ color: "gold" }}>{"    " + likeCount}</i>
            </div>
            <div className="post-card-underline" style={{ width: "90%", height: "1px" }}></div>
            

            
            
            <div className="post-card-like-div">
               
                <div className="post-card-like-div-like-button">
                    <div className="post-card-like-div-like-button-lottie-container" ref={starReactAnimationRef}></div>
                    <div onClick={handleLikeClick}  className="post-card-like-div-like-button-touchable-div"></div>
                    <span onClick = {handleLikeClick} className = "post-card-like-div-like-button-text">Star</span>
                </div>
                
                <div className="post-card-like-div-comment-button">
                    <i onClick={viewPostHandler} className="fas fa-pen">Comment</i>
                </div>
            
            
            </div>






            {
                randomComment && <div className="post-card-random-comment-div">
                    <h3>Comments</h3>
                    <div className="post-card-underline" style={{ marginBottom: "10px", height: "1px" }}></div>
                    <div className="post-card-random-comment">
                        <div className="post-card-random-comment-avatar-div">
                            <Avatar
                                height = "2rem"
                                width = "2rem"
                                image = {randomComment.userProfilePic}
                                borderWidth = "2px"
                                onClick = {showuserPageHandler}
                            />
                        </div>
                        <h4>{randomComment.username}</h4>
                        <p style={{ paddingTop: randomComment.commentContent.length < 58 && "5px", paddingBottom: randomComment.commentContent.length < 58 && "10px" }}>{randomComment.commentContent}</p>
                    </div>
                </div>}
        </div>
    );
}

export default PostCard;