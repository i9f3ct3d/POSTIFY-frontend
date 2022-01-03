import { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./postCard.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Cookies from "js-cookie";
import Avatar from "../Avatar/Avatar";
import LottieAnimation from "../../Pages/lottiAnimation";
import saveAnimation from "../../images/saveAnimation.json";
import viewPostAnimation from "../../images/viewpostAnimation.json";
import starReactAnimation from "../../images/starReactAnimation.json";
import deleteLotti from "../../images/deleteLotti.json";
import Lottie from "lottie-web";
import { GiFlexibleStar } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// let likedPosts = new Set();

const PostCard = (props) => {
  const [randomComment, setRandomComment] = useState(
    props.post.comments.length > 0
      ? props.post.comments[
      Math.floor(Math.random() * props.post.comments.length)
      ]
      : null
  );
  const [likeCount, changeLikeCount] = useState(0);
  const [isLiked, changeisLiked] = useState(false);

  const postCardDotsBar = useRef();
  const postCardDotsBarCloser = useRef();

  const findRandomComment = () => {
    props.post.comments.forEach((comment) => {
      if (comment.commentingUserId === props.mainUserId) {
        setRandomComment(comment);
        return;
      }
    });
  };

  const checkLikeCount = () => {
    changeLikeCount(props.post.likeArray.length);
    if (props.post.likeArray.includes(props.mainUserId)) {
      changeisLiked(true);
    } else {
      changeisLiked(false);
    }
  };

  const [lastCancelToken, setLastCancelToken] = useState(null);

  const handleLikeClick = async (event) => {
    lastCancelToken && lastCancelToken.cancel();

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    setLastCancelToken(source);

    if (isLiked && likeCount > 0) {
      changeLikeCount((prev) => prev - 1);
      // turnOffConfetti();
      starAnim.goToAndStop(0, true);
    } else {
      changeLikeCount((prev) => prev + 1);

      starAnim.setSpeed(0.5);
      starAnim.play();
      dontRunUseEffect.current = true;
    }

    changeisLiked((prev) => !prev);

    const postId = props.post._id;
    const userId = props.mainUserId;

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_API_URL + "likepost",
        {
          postid: postId,
          userid: userId,
          username: props.viewingUsername,
          userProfilePic: props.viewingUserProfilePic,
        },
        {
          cancelToken: source.token,
        }
      );

      changeLikeCount(response.data.length);
    } catch (error) {
      const e = new Error(error);

      if (e.message !== "Cancel") {
        window.location = "/error";
      }
    }
  };

  const history = useHistory();

  const viewPostHandler = async (event) => {
    event.preventDefault();

    history.push(`/postinfo/${props.post._id}/${props.mainUserId}`);
  };

  const deletePostHandler = async () => {
    window.alert("working on it");
  };

  useEffect(() => {
    findRandomComment();
    checkLikeCount();
  }, [props]);

  const postCardDotsClickHanlder = () => {
    postCardDotsBar.current.classList.toggle('open-post-card-dots-bar');
  };

  const postCardBarCrossClickHanlder = () => {
    postCardDotsBar.current.style.display = "none";
  };

  const savePostButtonClickHanlder = async () => {
    postCardBarCrossClickHanlder();
    try {
      const cookie = Cookies.get("x-auth-token");
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_API_URL + "savepost/?token=" + cookie,
        {
          postid: props.post._id,
        }
      );

      if (res.status === 200) {
        toast.success("Saved!", {
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
      window.location = "/error"
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

  const showuserPageHandler = () => {
    if (props) {
      if (props.mainUserId === props.post.userid) {
        history.push("/myprofile");
        return;
      }

      history.push(`/profilepage/${props.post.userid}`);
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
        theme="colored"
      />

      <div onClick={postCardDotsClickHanlder} className="post-card-dots-div">
        <BiDotsHorizontalRounded className="post-card-dots" />
      </div>

      <div ref={postCardDotsBar} className="post-card-dots-bar">
        <div
          onClick={savePostButtonClickHanlder}
          className="post-card-dots-bar-save-post-div"
        >
          <div className="post-card-dots-bar-save-post-icon-div">
            <LottieAnimation
              lotti={saveAnimation}
              height="1.7rem"
              width="1.7rem"
            />
          </div>
          <div className="post-card-dots-bar-save-post-text-div">Save post</div>
        </div>

        <Link
          style={{ textDecoration: "none" }}
          //         const postid = props.post._id;
          // const userid = props.mainUserId;
          to={`/postinfo/${props.post._id}/${props.mainUserId}`}
          className="post-card-dots-bar-save-post-div"
        >
          <div className="post-card-dots-bar-save-post-icon-div">
            <LottieAnimation
              lotti={viewPostAnimation}
              height="1.8rem"
              width="1.8rem"
            />
          </div>
          <div className="post-card-dots-bar-save-post-text-div">Read post</div>
        </Link>

        {props &&
          props.post &&
          props.post.userid &&
          props.mainUserId &&
          props.post.userid === props.mainUserId && (
            <div
              onClick={deletePostHandler}
              className="post-card-dots-bar-save-post-div"
            >
              <div className="post-card-dots-bar-save-post-icon-div">
                <LottieAnimation
                  lotti={deleteLotti}
                  height="2rem"
                  width="2rem"
                />
              </div>
              <div
                style={{ color: "red" }}
                className="post-card-dots-bar-save-post-text-div"
              >
                Delete post
              </div>
            </div>
          )}

        {/* <div
          ref={postCardDotsBarCloser}
          onClick={postCardBarCrossClickHanlder}
          className="post-card-dots-bar-save-post-div-close-cross-div"
        >
          <IoCloseOutline className="post-card-dots-bar-save-post-div-close-cross" />
        </div> */}

      </div>
      <div className="post-card-header">
        <div className="post-author-image">
          <Avatar
            height="3.5rem"
            width="3.5rem"
            borderColor="cyan"
            image={props && props.post.authorProfilePic}
            onClick={showuserPageHandler}
          />
        </div>
        <div className="post-card-author">
          <span onClick={showuserPageHandler}>{props.post.username}</span>
        </div>
        <p className="post-card-date">
          {props &&
            props.post &&
            props.post.postDate &&
            getDate(props.post.postDate)}
        </p>
      </div>
      <div
        className="post-card-underline"
        style={{ height: "1px", width: "98%" }}
      ></div>
      <div className="post-card-title-div">
        <span className="post-card-title">{props.post.heading}</span>
      </div>
      <div className="post-card-content-div">
        <p className="post-card-content">
          {props.post.postcontent.length > 410
            ? props.post.postcontent.substr(0, 410) + "...."
            : props.post.postcontent}
        </p>
        {props.post.postcontent.length > 410 && (
          <p onClick={viewPostHandler} className="post-card-readmore">
            Read more
          </p>
        )}
      </div>
      {props.post.postImage && props.post.postImage !== "false" && (
        <div ref={postCardImageDivRef} className="post-card-img-div">
          <LazyLoadImage
            afterLoad={() => {
              postCardImageDivRef.current.style.height = "unset";
              postCardImageDivRef.current.style.maxHeight = "30rem";
            }}
            placeholderSrc={process.env.PUBLIC_URL + "/logo192.png"}
            width="100%"
            height="100%"
            onClick={viewPostHandler}
            className="post-card-img"
            src={process.env.REACT_APP_BACKEND_API_URL + props.post.postImage}
          />
        </div>
      )}
      <div className="post-card-like-count-div">
        <GiFlexibleStar
          style={{
            color: "gold",
            fontSize: "1.4rem",
            marginRight: "10px",
          }}
        />
        <span style={{ color: "gold", fontFamily: "cursive" }}>
          {likeCount && likeCount}
        </span>
      </div>
      <div
        className="post-card-underline"
        style={{ width: "98%", height: "1px" }}
      ></div>

      <div className="post-card-like-div">
        <div className="post-card-like-div-like-button">
          <div
            className="post-card-like-div-like-button-lottie-container"
            ref={starReactAnimationRef}
          ></div>
          <div
            onClick={handleLikeClick}
            className="post-card-like-div-like-button-touchable-div"
          ></div>
          <span
            style={{ color: !isLiked && "#A8ABAF" }}
            onClick={handleLikeClick}
            className="post-card-like-div-like-button-text"
          >
            Star
          </span>
        </div>

        <div className="post-card-like-div-comment-button">
          <i onClick={viewPostHandler} className="fas fa-pen">
            {" Comment"}
          </i>
        </div>
      </div>
      <div
        style={{ height: "1px", width: "98%", transform: "translateY(-10px)" }}
        className="post-card-underline"
      ></div>

      {randomComment && (
        <div className="post-card-random-comment-div">
          <h3>Comments</h3>
          <div
            className="post-card-underline"
            style={{ marginBottom: "10px", height: "1px" }}
          ></div>
          <div className="post-card-random-comment">
            <div className="post-card-random-comment-avatar-div">
              <Avatar
                height="2rem"
                width="2rem"
                image={randomComment.userProfilePic}
                borderWidth="2px"
                onClick={() => {
                  if (props) {
                    if (props.mainUserId === randomComment.commentingUserId) {
                      history.push("/myprofile");
                      return;
                    }

                    history.push(
                      `/profilepage/${randomComment.commentingUserId}`
                    );
                  }
                }}
              />
            </div>
            <span
              onClick={() => {
                if (props) {
                  if (props.mainUserId === randomComment.commentingUserId) {
                    history.push("/myprofile");
                    return;
                  }

                  history.push(
                    `/profilepage/${randomComment.commentingUserId}`
                  );
                }
              }}
              className="post-card-random-comment__username"
            >
              {randomComment.username}
            </span>
            <p
              className = "post-card__random-comment__content"
              style={{
                paddingTop: randomComment.commentContent.length < 58 && "5px",
                paddingBottom:
                  randomComment.commentContent.length < 58 && "10px",
              }}
            >
              {randomComment.commentContent}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PostCard);
