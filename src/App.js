import './App.css';
import React , { Suspense , lazy, useRef } from 'react';
import { BrowserRouter as Router, Route , Switch,  Redirect} from "react-router-dom";

import SignUp from "./Pages/SignUp/SignUp"
import LogIn from "./Pages/LogIn/LogIn"

import ErrorPage from "./Pages/http-error-page/http-error";
import Contact from "./Pages/Contact/Contact"
import MyProfile from './Pages/MyProfile/MyProfile';
import AuthCheck from './Pages/authcheck';
import Loader from './component/Loader/Loader';


const HomePage =  lazy(() => import("./Pages/Home/HomePage"));
const NewPostPage = lazy(()=>import("./Pages/NewPostPage/NewPostPage"))
const PostContentPage = lazy(()=>import("./Pages/PostContentPage/PostContentPage"));
const FriendRequest = lazy(()=>import("./Pages/FrinedRequest/FriendRequest"));
const Notification = lazy(()=>import("./Pages/Notification/Notification"));
const ProfilePage = lazy(()=>import("./Pages/profilePage/profilePage"));
const SavedPostsPage = lazy(()=>import("./Pages/savedPostsPage/savedPostsPage"));
const MessagePage = lazy(()=>import("./Pages/messagePage/messagePage"));


var isShowing = false;

function App() {

  const LoaderRef = useRef();

  const showLoader = () => {

    if(isShowing === false){

      isShowing = true;
      
      LoaderRef && LoaderRef.current && LoaderRef.current.show();
    }
    
  }
  
  const hideLoder = () => {

    if(isShowing){

      isShowing = false;
      LoaderRef && LoaderRef.current && LoaderRef.current.hide();
      setTimeout(()=>{
        LoaderRef && LoaderRef.current && LoaderRef.current.reset();
      },500)
    }

  }

  return (
    <div className="App">
      <Loader
        ref = {LoaderRef}
      />
      <Router>
      <Switch>
        <Route path = "/login" exact>
          <LogIn
            showLoader = {showLoader}
            hideLoader = {hideLoder}
          />
        </Route>
        <Route path = "/signup" exact>
          <SignUp
            showLoader = {showLoader}
            hideLoader = {hideLoder}
          />
        </Route>

        <Route path="/home" exact>
          <Suspense fallback={<Loader/>}>
            <HomePage
              showLoader = {showLoader}
              hideLoader = {hideLoder}
            />
          </Suspense>
        </Route>


        <Route path="/newpost" exact>
        <Suspense fallback={<Loader/>}>
          <NewPostPage
            showLoader = {showLoader}
            hideLoader = {hideLoder}
          />
        </Suspense>
        </Route>


        <Route path="/postinfo" exact>
          <Suspense fallback={<Loader/>}>
          <PostContentPage
            showLoader = {showLoader}
            hideLoader = {hideLoder}
          />
          </Suspense>
        </Route>


        <Route path="/contact" exact>
          <Contact/>
        </Route>

        <Route path="/friendrequest" exact>
        <Suspense fallback={<Loader/>}>
          <FriendRequest
            showLoader = {showLoader}
            hideLoader = {hideLoder}
          />
        </Suspense>
        </Route>


        
        <Route path="/notification" exact>
          <Suspense fallback={<Loader/>}>
          <Notification
            showLoader = {showLoader}
            hideLoader = {hideLoder}
          />
          </Suspense>
        </Route>



        <Route path="/profilepage" exact>
          <Suspense fallback={<Loader/>}>
          <ProfilePage
            showLoader = {showLoader}
            hideLoader = {hideLoder}
          />
          </Suspense>
        </Route>


        <Route path="/myprofile" exact>
            <Suspense fallback={<Loader/>}>
              <MyProfile
                showLoader = {showLoader}
                hideLoader = {hideLoder}
              />
            </Suspense>
        </Route>



        <Route path="/savedposts" exact>
            <Suspense fallback={<Loader/>}>
          <SavedPostsPage
            showLoader = {showLoader}
            hideLoader = {hideLoder}
          />
            </Suspense>
        </Route>



        <Route path="/messagepage" exact>
            <Suspense fallback={<></>}>
              <MessagePage
                showLoader = {showLoader}
                hideLoader = {hideLoder}
              />
            </Suspense>
        </Route>


        <Route path="/authcheck/:token" exact>
          <AuthCheck/>
        </Route>


        <Route path="/error" exact>
          <ErrorPage/>
        </Route>
        <Redirect to="/signup"/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
