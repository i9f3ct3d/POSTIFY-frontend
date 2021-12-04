import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import "./PostContentPage.css"
import { useState, useEffect, useRef } from "react";

import Navbar from "../../component/navbar/navbar";
import Avatar from "../../component/Avatar/Avatar";
import BackgroundAnimation from "../../component/BackgroundAnimation/BackgroundAnimation";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LottiAnimation from "../lottiAnimation";
import CommentAnimation from '../../images/commentAnimation.json'

import starReactAnimation from '../../images/starReactAnimation.json'
import Lottie from 'lottie-web'
import LeftNavbar from "../../component/leftNavbar/leftNavbar";
import RightOnlineUsersBar from "../../component/rightOnlineUsersBar/rightOnlineUsersBar";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const PostContentPage = (props) => {
    let query = useQuery();
    const postid = query.get("postid");
    const viewingUserid = query.get("userid");

    const [post , setPost] = useState(null);
    const [currentUser , setCurrentUser] = useState(null);
    const [isLiked , setIsLiked] = useState(false);
    const [likeCount , setLikeCount] = useState(0);

    const fetchData = async () => {

        props && props.showLoader && props.showLoader();

        try {
            const cookie = Cookie.get("x-auth-token");
            const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL + 'fetchuser/?token=' + cookie);
            
            if(res.data.credentials==="invalid")
            {
                window.location="/login";
            }
           setCurrentUser(res.data.user);

            const response = await axios.get(process.env.REACT_APP_BACKEND_API_URL + 'postinfo?postid=' + postid);
            setPost(response.data);
            setLikeCount(response.data.likeArray.length)
            
            const isIncluded = response.data.likeArray.includes(viewingUserid);

            if (isIncluded) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }

            // setIsLoading(false);

            props && props.hideLoader && props.hideLoader();

        } catch (error) {
            window.location = "/error";
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const [lastCancelToken , setLastCancelToken] = useState(null);

    const handleLikeClick = async (event) => {

        lastCancelToken && lastCancelToken.cancel();

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        setLastCancelToken(source);

        setIsLiked(prev => !prev);

        if(isLiked && likeCount > 0){

            setLikeCount(prev => (prev - 1));
            starAnim.goToAndStop(0,true);

        }else if(!isLiked){

            setLikeCount(prev => (prev + 1));
            starAnim.setSpeed(0.5)
            starAnim.play();
            dontRunUseEffect.current = true;

        }else{
            setLikeCount(prev => (prev + 1));
            starAnim.setSpeed(0.5)
            starAnim.play();
            dontRunUseEffect.current = true;
            return;
        }



        try {
            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "likepost", {
                postid: postid,
                userid: currentUser._id,
                username: currentUser.username,
                userProfilePic : currentUser.profilePic,
            },{
                cancelToken : source.token,
            })


        } catch (error) {
            const e = new Error(error);

            if(e.message !== "Cancel"){
                window.location="/error";
            }
        }

    }


    const textAreaOnFocus=()=>{

        const placeholder = document.querySelector(".postcard-content-page-comment-section-custom-placeholder");
        placeholder.style.top = "-12px";
        placeholder.innerHTML = "Comment";
        placeholder.style.color = "cyan";
        placeholder.style.backgroundColor = "#121212";
        document.querySelector(".postcard-content-page-comment-section-div").style.borderColor = "cyan";
        
    }
    
    const textAreaOnBlur = (e) => {
        
        if(e.target.value.trim().length === 0){
            const placeholder = document.querySelector(".postcard-content-page-comment-section-custom-placeholder");
            placeholder.style.top = "9px";
            placeholder.innerHTML = "Comment ...";
            placeholder.style.color = "#909192";
            placeholder.style.backgroundColor = "#121212";
            document.querySelector(".postcard-content-page-comment-section-div").style.borderColor = "#3D3F42";
        }

    }

    
    const textAreaOnInput=(e)=>{
        e.target.style.height = "5px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        document.querySelector(".postcard-content-page-comment-section-div").style.height = (e.target.scrollHeight + 8)+"px";
    }

    const showuserPageHandler = () => {

        if(post && currentUser){

            if(post.userid === currentUser._id){
                window.location = "/myprofile";
                return;
            }

            window.location="/profilepage?searcheduserid="+post.userid;
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

    const postcardContentPagePostImageDivRef = useRef();
    const commentRef = useRef();

    const commentOnPostHandler = async(e) => {

        e.preventDefault();

        const typedComment = commentRef.current.value.trim();
            if(typedComment.length > 0){

                props && props.showLoader && props.showLoader();

                try {
                    
                    const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL+"postinfo",{

                        "postid" : postid,
                        "comment":typedComment,
                        "userEmail":currentUser.email,
                        "username":currentUser.username,
                        "userProfilePic":currentUser.profilePic,
                        "userid":viewingUserid,

                    })

                    if(res.status === 200){

                        // setRunUseEffect(prev=>!prev);
                        fetchData();

                    }else{
                        window.location = "/error";
                    }

                    commentRef.current.value = "";
                    
                } catch (error) {
                    window.location = "/error";
                }

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



    return (
        <div className="postcard-content-page-full-div">
            
            <Navbar />
            <BackgroundAnimation/>

            <LeftNavbar
                profilePic = {currentUser && currentUser.profilePic}
                username = {currentUser && currentUser.username}
                style = {{
                    backgroundColor : "#242527",
                    height : "100vh",
                    transform : "translateX(-101%) translateZ(0)",
                }}
                crossCloserStyle = {{
                    display : "inline-block"
                }}
            />
            <RightOnlineUsersBar
                viewingUserid={currentUser && currentUser._id}
                style = {{
                    backgroundColor : "#242527",
                    height : "100vh",
                    transform : "translateX(101%) translateZ(0)",
                }}
                crossCloserStyle = {{
                    display : "inline-block"
                }}
            />

            <div className="postcard-content-page-post-card-main-div">
            <div className="postcard-content-page-post-card-header">
                <div className="postcard-content-page-post-author-image">
                    <LazyLoadImage placeholderSrc = {process.env.PUBLIC_URL + "/logo192.png"} height="4rem" width="4rem" onClick = {showuserPageHandler} id="postcard-content-page-post-author-pic" alt="posterPic" src={post && (post.authorProfilePic ? ( post.authorProfilePic[0] === "u" ? process.env.REACT_APP_BACKEND_API_URL + post.authorProfilePic : post.authorProfilePic ): "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd")} />
                </div>
                <div className="postcard-content-page-post-card-author">
                    <h4 onClick = {showuserPageHandler}>{post && post.username}</h4>
                </div>
                <p className="postcard-content-page-post-card-date">{post && post.postDate && getDate(post.postDate)}</p>
            </div>
            <div className="postcard-content-page-post-card-title-div">
                <h3 className="postcard-content-page-post-card-title">{post && post.heading}</h3>
            </div>
            <div className="postcard-content-page-post-card-content-div">
                <p className="postcard-content-page-post-card-content">{post && post.postcontent}</p>
            </div>
            {post && post.postImage && post.postImage!=="false" && <div ref = {postcardContentPagePostImageDivRef} className="postcard-content-page-post-card-img-div">
                <LazyLoadImage afterLoad={()=>{
                    postcardContentPagePostImageDivRef.current.style.height = "unset";
                }} placeholderSrc = {process.env.PUBLIC_URL + "/logo192.png"} height="100%" width="100%" alt="postImage" className="postcard-content-page-post-card-img" src={process.env.REACT_APP_BACKEND_API_URL + post.postImage} />
            </div>}
            <div className="postcard-content-page-post-card-like-count-div">
                <i className="fa-star fas" style={{ color: "gold" , fontSize : "1.2rem"}}>{"             "}{likeCount}</i>
            </div>
            <div className="postcard-content-page-post-card-underline" style={{ width: "99%", height: "1px" }}></div>
            




            
            <div className="postcard-content-page-post-card-like-div">
                {/* <i 
                    className={`fa-star ${isLiked ? "fas" : "far"}`} 
                    style={{ color: isLiked ? "gold" : "grey", cursor: "pointer", marginTop: "10px" }} 
                    onClick={handleLikeClick}>Star</i> */}

                <div className="postcard-content-page-post-card-like-div-like-button">
                    <div className="postcard-content-page-post-card-like-div-like-button-lottie-container" ref={starReactAnimationRef}></div>
                    <div onClick={handleLikeClick}  className="postcard-content-page-post-card-like-div-like-button-touchable-div"></div>
                    <span onClick = {handleLikeClick} className = "postcard-content-page-post-card-like-div-like-button-text">Star</span>
                </div>

                <i className="fas fa-pen" style={{ position: "absolute", right: "0", marginTop: "10px", color: "grey", cursor: "pointer" }}>Comment</i>

            </div>







            {
                <div className="postcard-content-page-post-card-comments-div">
                    <h3>Comments</h3>
                    <div className="postcard-content-page-post-card-underline" style={{ marginBottom: "50px",marginTop : "0", height: "7px" ,width : "9rem", backgroundColor : "yellow" , borderRadius : "7px"}}></div>
                    
                    <div className="postcard-content-page-comment-section-div">
                        <div className="postcard-content-page-comment-section-avatar-div">
                            <Avatar
                                height = "1.5rem"
                                width = "1.5rem"
                                image = {currentUser && currentUser.profilePic}
                            />
                        </div>
                        <div className = "postcard-content-page-comment-section-input-div">
                            <form onSubmit = {commentOnPostHandler}>
                            <input style = {{resize : "both"}} ref={commentRef} onFocus={textAreaOnFocus} onBlur={textAreaOnBlur} className="postcard-content-page-comment-section-textarea" type="text" required/>
                            <div onClick = {commentOnPostHandler} type = "submit" className="postcard-content-page-comment-button-div">
                                <LottiAnimation
                                    lotti = {CommentAnimation}
                                    height = "4rem"
                                    width = "4rem"
                                    className = "postcard-content-page-comment-button"
                                />
                            </div>
                            </form>
                        </div>
                        <span className="postcard-content-page-comment-section-custom-placeholder">Comment ...</span>
                    </div>
                    {post && post.comments && post.comments.length > 0 && <div className="postcard-content-page-post-card-underline" style={{ marginBottom: "50px",marginTop : "50px", height: "1px" }}></div>}
                    {

                        post && post.comments && post.comments.map((eachComment, index)=>{
                            return(
                                <div key={index} className="postcard-content-page-post-card-each-comment">
                                    <div>
                                        <img alt="commenterPic" src={(eachComment.userProfilePic && eachComment.userProfilePic !== undefined) ? (eachComment.userProfilePic[0] === "u" ? process.env.REACT_APP_BACKEND_API_URL + eachComment.userProfilePic : eachComment.userProfilePic) : "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd"} />
                                    </div>
                                    <h4>{eachComment.username}</h4>
                                    <br/>
                                    <p style={{ paddingTop: eachComment.commentContent.length < 58 && "5px", paddingBottom: eachComment.commentContent.length < 58 && "10px" }}>{eachComment.commentContent}</p>
                                    <br/>
                                    <br/>
                                </div>
                            );
                        })

                    }
                    

                </div>
            }
        </div>
        </div>

    )


}
export default PostContentPage;