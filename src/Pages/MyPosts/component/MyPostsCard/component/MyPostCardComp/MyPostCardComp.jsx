import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./MyPostCardComp.css";
import PopUpCard from "../../../../../../component/popupcard/popUpCard";

const MyPostCardComp = (props) => {
  const [clikedDelete, setclikedDelete] = useState(false);

  const cookie = Cookies.get("x-auth-token");

  if (cookie === undefined) {
    window.location = "/login";
  }

  const deletePosthandler = async (event) => {
    event.preventDefault();
    setclikedDelete(!clikedDelete);
  };

  const viewPostHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_API_URL + "home/?token=" + cookie
      );
      if (res.status === 200) {
        const postid = props.postid;
        const userid = props.userid;
        window.location = "/postinfo/?postid=" + postid + "&userid=" + userid;
      }
    } catch (error) {
      window.location = "/error";
    }
  };

  const handlePopUpButtonClick = async (state, id) => {
    if (state) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_API_URL + "mypost/?token=" + cookie,
          {
            postid: id,
          }
        );

        if (response.status === 200) {
          props.isDeleted();
        }
      } catch (error) {
        window.location = "/error";
      }
    }
    setclikedDelete(false);
  };

  return (
    <div>
      <PopUpCard
        isPopUpOpen={clikedDelete}
        postid={props.postid}
        onButtonClick={handlePopUpButtonClick}
      />

      <li key={props.postid}>
        <div className="mypostCard-container">
          <div
            className="mypostcard-overlay"
            name="postdiv"
            onClick={viewPostHandler}
          ></div>
          <div className="mypostcard-fulldiv">
            <div className="mypostcard-topdiv">
              <div className="mypostcard-heading">
                <h1>{props.heading}</h1>
              </div>
              <div className="mypostcard-content">
                <h2>{props.postcontent}</h2>
              </div>
              <div className="mypostcard-info">
                <p>Posted On {props.date}</p>
                <button
                  className="delete-post-button"
                  value={props.postid}
                  name="btn"
                  type="submit"
                  onClick={deletePosthandler}
                >
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default MyPostCardComp;
