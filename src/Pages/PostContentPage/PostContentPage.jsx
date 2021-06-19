import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import "./PostContentPage.css"
import { useState, useEffect } from "react";


import Comment from "./components/comment";
import Navbar from "../../component/navbar/navbar";
import BackImg from "../../images/icon.svg";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const PostContentPage = () => {
    let query = useQuery();
    const postid = query.get("postid");
    const userid = query.get("userid");

    //count of the likes
    const [likeCount, changeLikeCount] = useState(0)
    //to check if the current user has liked this post or not
    const [isLiked, changeisLiked] = useState(false);
    const [comments, setComments] = useState();

    const [isEmpty, changeisEmpty] = useState(false);


    //heading of the of the post
    const [heading, changeHeading] = useState("");
    //body of the post 
    const [content, changeContent] = useState("");
    //name of the author who posted it
    const [authorName, chnageName] = useState("");
    //email of the author who posted it
    const [authorEmail, chnageAuthorEmail] = useState("");
    //date when the author has publihed this post
    const [date, changeDate] = useState(new Date().toDateString());
    const [userName, changeUserName] = useState("");
    const [userEmail , setUserEmail] = useState("");
    const [userProfilePic , setUserProfilePic] = useState("");

    useEffect(() => {


        const fetchData = async () => {
            try {
                const cookie = Cookie.get("x-auth-token");
                const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL + 'home/?token=' + cookie);
                
                if(res.data.credentials==="invalid")
                {
                    window.location="/login";
                }
                changeUserName(res.data.username);
                setUserEmail(res.data.useremail);
                setUserProfilePic(res.data.profilePic);

                const response = await axios.get(process.env.REACT_APP_BACKEND_API_URL + 'postinfo?postid=' + postid);
                changeHeading(response.data.heading);
                setComments(response.data.comments);
                changeContent(response.data.postcontent);
                chnageName(response.data.username);
                changeDate(response.data.postDate);
                const isIncluded = response.data.likeArray.includes(userid);
                changeLikeCount(response.data.likeArray.length);

                if (isIncluded) {
                    changeisLiked(true);
                } else {
                    changeisLiked(false);
                }

            } catch (error) {
                window.location = "/error";
            }
        };
        fetchData();
    }, []);

    //function triggers on click of the like button
    const handleLikeClick = async (event) => {

        //write the code
        try {
            const res = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "likepost", {
                postid: postid,
                userid: userid
            })

        } catch (error) {
            window.location="/error";
        }

        if (isLiked) {
            //user unliked the post


            //changing the state
            changeLikeCount(likeCount - 1);
            changeisLiked(false);
        }
        else {
            //user liked the post


            //changing the state
            changeLikeCount(likeCount + 1);
            changeisLiked(true);
        }
    }
    //function triggers everytime user types something on the comment text area
    const onTextareaChange = event => {
        const textArea = document.getElementsByName("comment-area")[0];
        textArea.style.height = (textArea.value.split(/\r*\n/).length) * 1.5.toLocaleString() + "rem";
    }
    //function triggers whenever the user click the post a comment
    const handlePostButtonClick = async (event) => {
        const textArea = document.getElementsByName("comment-area")[0];
        const comment = textArea.value.toLocaleString().trim();
        textArea.value = "";
        const button = document.getElementsByName("post-button")[0];
        button.classList.toggle("postcontent-input-button-on-click");
        setTimeout(() => {
            button.classList.toggle("postcontent-input-button-on-click")
        }, 200);
        if (comment.length === 0) {
            //comment is empty
            changeisEmpty(true);//to display that user hasn't typed any comment
        }
        else {
            changeisEmpty(false);
            //comment has something
            //write code

            const username = userName;

            try {

                const response = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "postinfo", {
                    userEmail:userEmail,
                    username: username,
                    postid: postid,
                    comment: comment,
                    userProfilePic:userProfilePic,
                });
                if (response.status === 200) {
                    const responseNew = await axios.get(process.env.REACT_APP_BACKEND_API_URL + 'postinfo?postid=' + postid);
                    if (responseNew.status === 200) {
                        setComments(responseNew.data.comments);
                    }
                }

            } catch (error) {
                window.location = "/error";
            }

        }

    }
    const mapComment = eachComment => {
        return (
            <Comment key={Math.random()} commentContent={eachComment.commentContent} username={eachComment.username} />
        )
    }
    return (
        <div>
            <Navbar />
            <div className="background-image-container">
        <img src={BackImg} />
      </div>
            <div className="postcontent-maindiv">
                <div className="postcontent-topdiv">
                    <div className="postcontent-heading">
                        <div className="postcontent-title-placeholder">
                            <p>TITLE</p>
                        </div>
                        <div className="postcontent-heading-content">
                            <h1>{heading}</h1>
                        </div>
                        <div className="postcontent-post-date">
                            <p>POSTED ON : {date}</p>
                        </div>
                    </div>
                    <div className="postcontent-authorpic">
                        <h1>{authorName.slice(0, 1).toUpperCase()}</h1>
                    </div>
                    <div className="postcontent-authordetails">
                        <span>Posted By</span>
                        <div>
                            <p>{authorName}</p>
                            <p>{authorEmail}</p>
                        </div>
                    </div>
                    <div className="postcontent-content">
                        <p>{content}</p>
                    </div>

                    <div className="postcontent-info-div">
                        <div className="postcontent-info-div-top">
                            <div className="postcontent-like-div">
                                <i className={`like-icon fa-thumbs-up ${isLiked ? "fas" : "far"}`} onClick={handleLikeClick}></i>
                                <div>
                                    <p>{likeCount}</p>
                                </div>
                            </div>
                            <p className="postcontent-like-info">{likeCount === 0 ? "no one liked this post yet" : likeCount === 1 && isLiked ? "you liked this post" : likeCount > 1 && isLiked ? `You and ${likeCount - 1} ${(likeCount - 1) > 1 ? "others" : "other"} Liked this post` : `${likeCount} ${likeCount > 1 ? "others" : "other"} Liked this post`}</p>
                        </div>
                        <div className="postcontent-comment-form-div">
                            <div className="postcontent-input-wrapper" name="input-wrapper-1">
                                <textarea type="text" name="comment-area" placeholder={`Write a comment....`} onChange={onTextareaChange} />
                            </div>
                            <div className="postcontent-input-button-div">
                                <button type="button" name="post-button" onClick={handlePostButtonClick}><i className="fas fa-comment"></i></button>
                                {/* <p style={{ visibility: isEmpty ? "visible" : "hidden" }}>Can't post an empty comment</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="postcontent-content-comment-div">
                    <div className="postcontent-content-comment-div__comment-logo">
                        <div>
                            <h2>COMMENTS</h2>
                        </div>
                    </div>
                    {
                        comments && comments.map(mapComment)
                    }
                </div>
            </div>
        </div>

    )


}
export default PostContentPage;