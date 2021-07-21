import react, { useEffect, useState } from "react";
import axios from "axios"
import "./postCard.css"

const PostCard = props => {

    const [randomComment, setRandomComment] = useState(props.post.comments.length > 0 ? props.post.comments[Math.floor(Math.random() * props.post.comments.length)] : null);
    const [likeCount, changeLikeCount] = useState(0)
    const [isLiked, changeisLiked] = useState(false);


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



    const handleLikeClick = async (event) => {
        changeisLiked(!isLiked);
        if (isLiked) {

            changeLikeCount(likeCount - 1);

        }
        else {
            changeLikeCount(likeCount + 1);

        }

        const postId = props.post._id;
        const userId = props.mainUserId;

        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_API_URL + "likepost", {
                postid: postId,
                userid: userId
            })

            changeLikeCount(response.data.length);

        } catch (error) {
            window.location = "/error";
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

    //viewPostHandler => postClicker
    //props.heading => title
    //props.content => post content
    //props.author => post writter
    //props.date => post date
    //props.comment => post's arbitary comment
    //props.commentAuthor => props.comment 's author




    return (
        <div className="post-card-main-div">
            <div className="post-card-header">
                <div className="post-author-image">
                    <img id="post-author-pic" src={(props.post.authorProfilePic && props.post.authorProfilePic !== undefined) ? process.env.REACT_APP_BACKEND_API_URL + props.post.authorProfilePic : "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd"} />
                </div>
                <div className="post-card-author">
                    <h4>{props.post.username}</h4>
                </div>
                <p className="post-card-date">on {props.post.postDate}</p>
            </div>
            <div className="post-card-underline" style={{ height: "1px" }}></div>
            <div className="post-card-title-div">
                <h3 className="post-card-title">{props.post.heading}</h3>
            </div>
            <div className="post-card-content-div">
                <p className="post-card-content">{props.post.postcontent.length > 410 ? props.post.postcontent.substr(0, 410) + "...." : props.post.postcontent}</p>
                {props.post.postcontent.length > 410 && <p onClick={viewPostHandler} className="post-card-readmore">Read more</p>}
            </div>
            {props.post.postImage && <div className="post-card-img-div">
                <img className="post-card-img" src={process.env.REACT_APP_BACKEND_API_URL + props.post.postImage} />
            </div>}
            <div className="post-card-like-count-div">
                <i className="fa-star fas" style={{ color: "gold" }}>{"    " + likeCount}</i>
            </div>
            <div className="post-card-underline" style={{ width: "90%", height: "1px" }}></div>
            <div className="post-card-like-div">
                <i className={`fa-star ${isLiked ? "fas" : "far"}`} style={{ color: isLiked ? "gold" : "grey", cursor: "pointer", marginTop: "10px" }} onClick={handleLikeClick}>Star</i>

                <i onClick={viewPostHandler} className="fas fa-pen" style={{ position: "absolute", right: "0", marginTop: "10px", color: "grey", cursor: "pointer" }}>Comment</i>

            </div>
            {
                randomComment && <div className="post-card-random-comment-div">
                    <h3>Comments</h3>
                    <div className="post-card-underline" style={{ marginBottom: "10px", height: "1px" }}></div>
                    <div className="post-card-random-comment">
                        <div>
                            <img src={(randomComment.userProfilePic && randomComment.userProfilePic !== undefined) ? process.env.REACT_APP_BACKEND_API_URL + randomComment.userProfilePic : "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd"} />
                        </div>
                        <h4>{randomComment.username}</h4>
                        <p style={{ paddingTop: randomComment.commentContent.length < 58 && "5px", paddingBottom: randomComment.commentContent.length < 58 && "10px" }}>{randomComment.commentContent}</p>
                    </div>
                </div>}
        </div>
    );
}

export default PostCard;