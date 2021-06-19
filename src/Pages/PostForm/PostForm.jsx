import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./PostForm.css";
import Navbar from "../../component/navbar/navbar";
const PostForm = (props) => {
  const [isValidPost, setisValidPost] = useState(true);
  const [emptyTitle, setemptyTitle] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [emptyContent, setEmptyContent] = useState(false);

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    let allcondition = true;

    var newPostContent = document.getElementById("post-content-span").innerText;
    if (!newPostContent.trim()) {
      setisValidPost(false);
      allcondition = false;
      setEmptyContent(true);
    }
    if (
      !event.target.heading.value.trim() ||
      event.target.heading.value.length > 15
    ) {
      if (event.target.heading.value.length > 17) {
        setInvalidTitle(true);
      } else if (!event.target.heading.value.trim()) {
        setemptyTitle(true);
      }
      setisValidPost(false);
      allcondition = false;
    }
    if (
      newPostContent.trim() &&
      event.target.heading.value.trim() &&
      event.target.heading.value.length <= 17
    ) {
      setisValidPost(true);
      allcondition = true;
    }

    if (allcondition) {
      try {
        let time = new Date().toLocaleTimeString();
        let date = new Date().toLocaleDateString();
       
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_API_URL + "newpost",
          {
            heading: event.target.heading.value,
            userid: props.userid,
            username: props.username,
            postContent: newPostContent,
            postTime: time,
            postDate: date,
          }
        );

        if (response.data.credentials === "valid") {
          Cookies.set("x-auth-token", response.data.token);
          window.location = "/home";
        }
      } catch (error) {
        window.location = "/error";
      }
    }
  };

  return (
    <div>
      <Navbar />
      <form autoComplete="off" onSubmit={onsubmitHandler}>
        <input
          maxLength="19"
          autoComplete="off"
          className="title-input-area"
          onClick={() => {
            setInvalidTitle(false);
            setemptyTitle(false);
          }}
          type="text"
          name="heading"
          placeholder="Give a title"
        />
        <br />
        {emptyTitle && <p style={{ color: "red" }}>Post must have a title</p>}
        {invalidTitle && (
          <p style={{ color: "red" }}>Title Can't be more than 19 characters</p>
        )}
        <h2 className="content-tagline">Say something about your day</h2>
        <h1 className="content-tagline-h1">so-far</h1>
        <br/>
        <span
          onClick={() => {
            setEmptyContent(false);
          }}
          id="post-content-span"
          contentEditable="true"
        ></span>
        <br />
        {emptyContent && (
          <p style={{ color: "red" }}>Post Area Cannot be left empty</p>
        )}
        <button className="new-post-submit-button" type="submit"><i className="fas fa-feather-alt fa-5x"></i></button>
      </form>
    </div>
  );
};

export default PostForm;
