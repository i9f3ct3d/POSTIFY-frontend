import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PostCardPage from "../PostCardPage/PostCardPage";
import ActiveUsers from "../ActiveUsers/ActiveUsers";
import Logo from "../../component/logo/logo";

import Navbar from "../../component/navbar/navbar";
import BackImg from "../../images/icon.svg";
import Footer from "../../component/footer/footer"

import "./HomePage.css";

const HomePage = (props) => {


  const mediaQueryOfMaxWidth = window.matchMedia("(max-width:35rem)");
  const mediaQueryOfMinWidth = window.matchMedia("(min-width:35rem)");
  
  const [username, changeUsername] = useState("");
  const [userEmail, setuserEmail] = useState([]);
  const [posts, setposts] = useState([]);
  const [userid, setuserid] = useState();

  useEffect(() => {
    rotatePostIcon();

    function handleSizeDecrease(e) {
      if (e.matches) {
        var iconFeather=document.getElementById("icon-feather");
        iconFeather.classList.remove("fa-6x");
        iconFeather.classList.add("fa-3x");
      }
    }

    function handleSizeIncrease(e) {
        if (e.matches) {
        var iconFeather=document.getElementById("icon-feather");
          iconFeather.classList.remove("fa-3x");
          iconFeather.classList.add("fa-6x");
        }
      }

    mediaQueryOfMaxWidth.addListener(handleSizeDecrease);
    mediaQueryOfMinWidth.addListener(handleSizeIncrease);

    handleSizeDecrease(mediaQueryOfMaxWidth);
    handleSizeIncrease(mediaQueryOfMinWidth);



    const cookie = Cookies.get("x-auth-token");
    ////////////fixed when cookie is undefined/////////specifically when user does not have cookie at all////////////
    if (cookie === undefined) {
      window.location = "/login";
    } 
    else {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_API_URL + "home/?token=" + cookie
          );

          if(res.status===200)
          {
            if(res.data.credentials === "not logged in" || res.data.credentials === "invalid")
            {
              window.location="/login";
            }
            else if(res.data.credentials==="valid")
            {
              setuserEmail(res.data.useremail);
              setposts(res.data.Posts);
              setuserid(res.data.userid);
              changeUsername(res.data.username);
            }
          }

        } catch (error) {
          window.location = "/error";
        }
      };
      fetchData();
    }
  }, []);


  const rotatePostIcon = () => {
    var icon = document.getElementById("new-post-icon");
    icon.style.transform = "rotate(-20deg)";
    setTimeout(() => {
      icon.style.transform = "rotate(0)";
      setTimeout(() => {
        icon.style.transform = "rotate(-20deg)";
        setTimeout(() => {
          icon.style.transform = "rotate(0)";
          setTimeout(() => {
            icon.style.transform = "rotate(-20deg)";
            setTimeout(() => {
              icon.style.transform = "rotate(0)";
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  };

  setInterval(rotatePostIcon, 5000);

  return (
    <div className="home-page-container">
    <div className="background-div"></div>
      <div className="background-image-container">
        <img src={BackImg} />
      </div>
      <Navbar />
      <h1>POSTBOOK HOME</h1>
      <div className="logo-div">
        <Logo scale="1" />
      </div>
      <div className="mypost-icon-container">
        <a href="/mypost"><i className="fas fa-mail-bulk fa-2x">My Posts</i></a>
      </div>
      {username && <h2 className="top-username">Welcome <span>{username.toUpperCase()}</span></h2>}
      

      <div className="post-card">
        {posts && <PostCardPage posts={posts} username={username} userEmail={userEmail} userId={userid} />}
      </div>
      <div className="postIt-container">
        <a id="new-post-icon" href="/newpost">
          <i id="icon-feather" className="fas fa-feather-alt fa-6x"></i>
        </a>
      </div>
      <div className="footer-container">
        <Footer/>
      </div>
    </div>
  );
};

export default HomePage;
