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
// import StarAnimation from "../../component/StarAnimation/StarAnimation";



function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const PostContentPage = () => {
    let query = useQuery();
    const postid = query.get("postid");
    const viewingUserid = query.get("userid");

    // const ref = useRef();
    // const starAnimationDivRef = useRef();

    const [post , setPost] = useState(null);
    const [currentUser , setCurrentUser] = useState(null);
    const [isLiked , setIsLiked] = useState(false);
    const [runUseEffect , setRunUseEffect] = useState(false);
    const [likeCount , setLikeCount] = useState(0);


    useEffect(() => {

        
        const fetchData = async () => {
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

            } catch (error) {
                window.location = "/error";
            }
        };
        fetchData();
    }, [runUseEffect]);

    // const turnOnConfetti = () => {

    //     starAnimationDivRef.current.style.display = "block"
    //     ref.current.play();

    //     console.log(ref.current);

    //     setTimeout(()=>{
    //         starAnimationDivRef.current.style.display = "none"
    //         ref.current.stop();
    //     },1950)

    // }

    //function triggers on click of the like button
    const handleLikeClick = async (event) => {

        //write the code
        // cancel the axios request for liking if the previous one is still going on
        setIsLiked(prev => !prev);

        if(isLiked && likeCount > 0){

            setLikeCount(prev => (prev - 1));

        }else if(!isLiked){

            setLikeCount(prev => (prev + 1));
            // turnOnConfetti();

        }else{
            return;
        }



        try {
            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "likepost", {
                postid: postid,
                userid: currentUser._id,
                username: currentUser.username,
                userProfilePic : currentUser.profilePic,
            })


        } catch (error) {
            window.location="/error";
        }

    }


    const textAreaOnFocus=()=>{

        const placeholder = document.querySelector(".postcard-content-page-comment-section-custom-placeholder");
        placeholder.style.top = "-12px";
        placeholder.innerHTML = "Comment";
        placeholder.style.color = "rgb(24,119,241)";
        placeholder.style.background = "white";
        document.querySelector(".postcard-content-page-comment-section-div").style.borderColor = "rgb(24,119,241)";
        
    }
    
    const textAreaOnBlur = (e) => {
        
        if(e.target.value.trim().length === 0){
            const placeholder = document.querySelector(".postcard-content-page-comment-section-custom-placeholder");
            placeholder.style.top = "9px";
            placeholder.innerHTML = "Comment ...";
            placeholder.style.color = "#909192";
            placeholder.style.background = "white";
            document.querySelector(".postcard-content-page-comment-section-div").style.borderColor = "#909192";
        }

    }

    const commentSubmitHandler=async(e)=>{
        
        if(e.key === "Enter" && !e.shiftKey){

            const typedComment = (e.target.value).trim();
            if(typedComment.length > 0){

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

                        setRunUseEffect(prev=>!prev);

                    }else{
                        window.location = "/error";
                    }

                    e.target.value = "";
                    textAreaOnInput(e);
                    
                } catch (error) {
                    window.location = "/error";
                }

            }

        }

    }
    
    const textAreaOnInput=(e)=>{
        e.target.style.height = "5px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        document.querySelector(".postcard-content-page-comment-section-div").style.height = (e.target.scrollHeight + 8)+"px";
    }

    const showuserPageHandler = () => {
        if(post){
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



    return (
        <div className="postcard-content-page-full-div">
            
            {/* <div ref={starAnimationDivRef} 
            style={{display : "none"}}
            >
                <StarAnimation
                    ref = {ref}
                />
            </div> */}
            
            <div className="background-div"></div>
            <Navbar />


            <BackgroundAnimation/>

            <div className="postcard-content-page-post-card-main-div">
            <div className="postcard-content-page-post-card-header">
                <div className="postcard-content-page-post-author-image">
                    <img onClick = {showuserPageHandler} id="postcard-content-page-post-author-pic" alt="posterPic" src={post && (post.authorProfilePic ? ( post.authorProfilePic[0] === "u" ? process.env.REACT_APP_BACKEND_API_URL + post.authorProfilePic : post.authorProfilePic ): "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd")} />
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
            {post && post.postImage && post.postImage!=="false" && <div className="postcard-content-page-post-card-img-div">
                <img alt="postImage" className="postcard-content-page-post-card-img" src={process.env.REACT_APP_BACKEND_API_URL + post.postImage} />
            </div>}
            <div className="postcard-content-page-post-card-like-count-div">
                <i className="fa-star fas" style={{ color: "gold" }}>{"             "}{likeCount}</i>
            </div>
            <div className="postcard-content-page-post-card-underline" style={{ width: "99%", height: "1px" }}></div>
            <div className="postcard-content-page-post-card-like-div">
                <i 
                    className={`fa-star ${isLiked ? "fas" : "far"}`} 
                    style={{ color: isLiked ? "gold" : "grey", cursor: "pointer", marginTop: "10px" }} 
                    onClick={handleLikeClick}>Star</i>

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
                            <textarea  onFocus={textAreaOnFocus} onBlur={textAreaOnBlur} onKeyPress={commentSubmitHandler} onInput={textAreaOnInput} className="postcard-content-page-comment-section-textarea" type="text" required/>
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