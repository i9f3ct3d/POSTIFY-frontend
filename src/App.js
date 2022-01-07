import "./App.css";
import { Suspense, lazy, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import Loader from "./component/Loader/Loader";
import LoadingBar from "react-top-loading-bar";
import useAuth from "./Pages/Hooks/useAuth";

import PrivateRoutes from "./Pages/PrivateRoute/PrivateRoutes";
const RightOnlineUsersBar = lazy(() =>import("./component/rightOnlineUsersBar/rightOnlineUsersBar"));
const BackgroundAnimation = lazy(() =>import("./component/BackgroundAnimation/BackgroundAnimation"));
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

  const [progress, setProgress] = useState(0);
  const [onlineUsersIdArray, setOnlineUserIdArray] = useState([]);
  const leftNavbarRef = useRef();
  const sendMessageSocketRef = useRef();
  const updateArrivalMessageRef = useRef();

  const showLeftNavbar = async () => {
    leftNavbarRef && leftNavbarRef.current && leftNavbarRef.current.showLeftNavbar();
  };
  
  const hideLeftNavbar = () => {
    leftNavbarRef && leftNavbarRef.current && leftNavbarRef.current.hideLeftNavbar();
  };

  const callSendMessageSocket = (data) => {
    sendMessageSocketRef &&
      sendMessageSocketRef.current &&
      sendMessageSocketRef.current.sendMessageSocket(data);
  };

  const callUpdateArrivalMessage = (data) => {
    updateArrivalMessageRef &&
      updateArrivalMessageRef.current &&
      updateArrivalMessageRef.current.updateArrivalMessage(data);
  };

  const callSeenMessages = (data) => {
    sendMessageSocketRef && sendMessageSocketRef.current && sendMessageSocketRef.current.seenMessages && sendMessageSocketRef.current.seenMessages(data);
  }

  const { isAuth , isLoading ,user, login , signup } = useAuth(false);

  return (
    <div className="App">
      <Router>
        <LoadingBar
          color="cyan"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        {window.location.pathname !== "/signup" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/contact" &&
          window.location.pathname !== "/error" &&
          !isLoading &&
          isAuth && (
            <Suspense fallback={<></>}>
              <RightOnlineUsersBar
                user = {user}
                ref={sendMessageSocketRef}
                callUpdateArrivalMessage={callUpdateArrivalMessage}
                setOnlineUserIdArray={(data) => {
                  setOnlineUserIdArray(data);
                }}
              />
            </Suspense>
          )}
        <Suspense fallback={<></>}>
          <BackgroundAnimation />
        </Suspense>
        <Suspense fallback={<></>}>
          {window.location.pathname !== "/contact" &&
            window.location.pathname !== "/error" &&
            window.location.pathname !== "/signup" &&
            window.location.pathname !== "/login" &&
            !isLoading &&
            isAuth && <LeftNavbar ref = {leftNavbarRef} isAuth={isAuth} user={user} />}
        </Suspense>

        <Suspense fallback={<></>}>
          {window.location.pathname !== "/contact" &&
            window.location.pathname !== "/error" && (
              <Navbar
                isAuth={isAuth}
                user={user}
                showLeftNavbar={showLeftNavbar}
                hideLeftNavbar={hideLeftNavbar}
              />
            )}
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/login"
              element={<LogIn hideLeftNavbar={hideLeftNavbar} login={(data) => {return login(data)}} />}
            />

            <Route
              path="/signup"
              element={
                <SignUp hideLeftNavbar={hideLeftNavbar} signup={ (data) => {return signup(data)}} />
              }
            />
            <Route
              element={<PrivateRoutes isLoading={isLoading} isAuth={isAuth} />}
            >
              <Route
                path="/home"
                element={
                  <HomePage
                    user = {user}
                    showLeftNavbar={showLeftNavbar}
                    hideLeftNavbar={hideLeftNavbar}
                    setProgress={(givenProgress) => {
                      setProgress(givenProgress);
                    }}
                  />
                }
              />

              <Route
                path="/newpost"
                element={
                  <NewPostPage
                    user = {user && user}
                    showLeftNavbar={showLeftNavbar}
                    hideLeftNavbar={hideLeftNavbar}
                    setProgress={(givenProgress) => {
                      setProgress(givenProgress);
                    }}
                  />
                }
              />
            
            <Route
              path="/postinfo/:postid/:userid"
              element={
                <PostContentPage
                  user = {user && user}
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              }
            />


            <Route
              path="/friendrequest"
              element={
                <FriendRequest
                  user = {user && user}
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              }
            />

            <Route
              path="/notification"
              element={
                <Notification
                  user = {user && user}
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              }
            />

            <Route
              path="/profilepage/:searcheduserid"
              element={
                <ProfilePage
                  user = {user && user}
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              }
            />

            <Route
              path="/myprofile"
              element={
                <MyProfile
                  user = {user && user}
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              }
            />

            <Route
              path="/savedposts"
              element={
                <SavedPostsPage
                  user = {user && user}
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                />
              }
            />

            <Route
              
              path="/messagepage/:myuserid/:searcheduserid"
              element={
                <MessagePage
                  ref={updateArrivalMessageRef}
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                  callSeenMessages = {callSeenMessages}
                  setProgress={(givenProgress) => {
                    setProgress(givenProgress);
                  }}
                  callSendMessageSocket={callSendMessageSocket}
                  onlineUsersIdArray={onlineUsersIdArray}
                />
              }
            />
            </Route>
            <Route path="/authcheck/:token" element={<AuthCheck />} />
            <Route path="/error" element={<ErrorPage />} />
            
            <Route
              path="/contact"
              element={
                <Contact
                  showLeftNavbar={showLeftNavbar}
                  hideLeftNavbar={hideLeftNavbar}
                />
              }
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
