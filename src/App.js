import "./App.css";
import { Suspense, lazy, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Loader from "./component/Loader/Loader";
import LoadingBar from "react-top-loading-bar";
import Cookies from "js-cookie";

const BackgroundAnimation = lazy(() => import('./component/BackgroundAnimation/BackgroundAnimation'))
const Navbar = lazy(() => import("./component/navbar/navbar"));
const LeftNavbar = lazy(() => import("./component/leftNavbar/leftNavbar"));
const AuthCheck = lazy(() => import("./Pages/authcheck"));
const ErrorPage = lazy(() => import("./Pages/http-error-page/http-error"));
const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const LogIn = lazy(() => import("./Pages/LogIn/LogIn"));
const HomePage = lazy(() => import("./Pages/Home/HomePage"));
const NewPostPage = lazy(() => import("./Pages/NewPostPage/NewPostPage"));
const PostContentPage = lazy(() => import("./Pages/PostContentPage/PostContentPage"));
const FriendRequest = lazy(() => import("./Pages/FrinedRequest/FriendRequest"));
const Notification = lazy(() => import("./Pages/Notification/Notification"));
const ProfilePage = lazy(() => import("./Pages/profilePage/profilePage"));
const SavedPostsPage = lazy(() => import("./Pages/savedPostsPage/savedPostsPage"));
const MessagePage = lazy(() => import("./Pages/messagePage/messagePage"));
const MyProfile = lazy(() => import("./Pages/MyProfile/MyProfile"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));


function App() {

  async function isPostInfoPage() {
    const pageLocation = window.location.pathname;
    const postinfoPageRoute = "/postinfo";

    let pageI = 0;

    for await (const i of postinfoPageRoute) {
      if (i !== pageLocation[pageI]) {
        return false;
      }

      pageI++;
    }

    return true;
  }

  const showLeftNavbar = async () => {
    const leftNavbar = document.getElementById("#left-navbar-full-div");

    if (leftNavbar) {
      leftNavbar.style.display = "block";

      if (
        window.innerWidth <= 900 ||
        window.location.pathname === "/newpost" ||
        (await isPostInfoPage())
      ) {
        leftNavbar.style.backgroundColor = "#121212";
        leftNavbar.style.height = "100vh";
        leftNavbar.style.transform = "translateX(0) translateZ(0)";
        leftNavbar.style.boxShadow = "8px -4px 10px rgba(0 , 0 , 0 , 0.5)";
      } else {
        leftNavbar.style.backgroundColor = "transparent";
        leftNavbar.style.height = "unset";
        leftNavbar.style.transform = "translateX(0) translateZ(0)";
        leftNavbar.style.boxShadow = "none";
      }
    }
  };

  const hideLeftNavbar = () => {
    const leftNavbar = document.getElementById("#left-navbar-full-div");

    if (leftNavbar) {
      leftNavbar.style.display = "none";

      leftNavbar.style.backgroundColor = "#242527";
      leftNavbar.style.height = "100vh";
      leftNavbar.style.transform = "translateX(-101%) translateZ(0)";
      leftNavbar.style.boxShadow = "8px -4px 10px rgba(0 , 0 , 0 , 0.5)";
    }
  };

  const [progress, setProgress] = useState(0);
  const cookie = Cookies.get("x-auth-token");

  return (
    <div className="App">
      <Router>
        <LoadingBar
          color="cyan"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Suspense fallback={<span></span>}>
          <BackgroundAnimation />
        </Suspense>
        <Suspense fallback={<span></span>}>
          {window.location.pathname !== "/contact" &&
            window.location.pathname !== "/error" && <LeftNavbar />}
        </Suspense>

        <Suspense fallback={<span></span>}>
          {window.location.pathname !== "/contact" &&
            window.location.pathname !== "/error" && (
              <Navbar
                showLeftNavbar={showLeftNavbar}
                hideLeftNavbar={hideLeftNavbar}
              />
            )}
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/login" exact>
              <LogIn
                hideLeftNavbar={hideLeftNavbar}
              />
            </Route>
            <Route path="/signup" exact>
              <SignUp
                hideLeftNavbar={hideLeftNavbar}
              />
            </Route>

            <Route path="/home" exact>
              {cookie ? (
                <HomePage
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              ) : (
                <div>
                  <Redirect to="/login" />
                </div>
              )}
            </Route>

            <Route path="/newpost" exact>
              {cookie ? (
                <NewPostPage
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              ) : (
                <div>
                  <Redirect to="/login" />
                </div>
              )}
            </Route>

            <Route path="/postinfo/:postid/:userid" exact>
              {cookie ? (
                <PostContentPage
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              ) : (
                <div>
                  <Redirect to="/login" />
                </div>
              )}
            </Route>

            <Route path="/contact" exact>
              <Contact
                showLeftNavbar={showLeftNavbar}
                hideLeftNavbar={hideLeftNavbar}
              />
              {/* <div>Contact Me</div> */}
            </Route>

            <Route path="/friendrequest" exact>
              {cookie ? (
                <FriendRequest
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              ) : (
                <div>
                  <Redirect to="/login" />
                </div>
              )}
            </Route>

            <Route path="/notification" exact>
              {cookie ? (
                <Notification
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              ) : (
                <div>
                  <Redirect to="/login" />
                </div>
              )}
            </Route>

            <Route path="/profilepage/:searcheduserid" exact>
              {cookie ? (
                <ProfilePage
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              ) : (
                <div>
                  <Redirect to="/login" />
                </div>
              )}
            </Route>

            <Route path="/myprofile" exact>
              {cookie ? (
                <MyProfile
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              ) : (
                <div>
                  <Redirect to="/login" />
                </div>
              )}
            </Route>

            <Route path="/savedposts" exact>
              {cookie ? (
                <SavedPostsPage
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              ) : (
                <div>
                  <Redirect to="/login" />
                </div>
              )}
            </Route>

            <Route path="/messagepage/:myuserid/:searcheduserid" exact>
              {cookie ? (
                <MessagePage
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              ) : (
                <div>
                  <Redirect to="/login" />
                </div>
              )}
            </Route>

            <Route path="/authcheck/:token" exact>
              <AuthCheck />
            </Route>

            <Route path="/error" exact>
              <ErrorPage />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
