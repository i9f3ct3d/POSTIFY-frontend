import './App.css';
import React , { Suspense , lazy } from 'react';
import { BrowserRouter as Router, Route , Switch,  Redirect} from "react-router-dom";

import SignUp from "./Pages/SignUp/SignUp"
import LogIn from "./Pages/LogIn/LogIn"

import ErrorPage from "./Pages/http-error-page/http-error";
import Contact from "./Pages/Contact/Contact"
// import WelcomePage from "./Pages/Welcomepage/WelcomePage"
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



function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path = "/login" exact>
          <LogIn/>
        </Route>
        <Route path = "/signup" exact>
          <SignUp/>
        </Route>

        <Route path="/home" exact>
          <Suspense fallback={<Loader/>}>
            <HomePage/>
          </Suspense>
        </Route>


        <Route path="/newpost" exact>
        <Suspense fallback={<Loader/>}>
          <NewPostPage/>
        </Suspense>
        </Route>


        <Route path="/postinfo" exact>
          <Suspense fallback={<Loader/>}>
          <PostContentPage />
          </Suspense>
        </Route>


        <Route path="/contact" exact>
          <Contact/>
        </Route>


        {/* <Route path="/welcomepage" exact>
          <WelcomePage/>
        </Route> */}


        <Route path="/friendrequest" exact>
        <Suspense fallback={<Loader/>}>
          <FriendRequest/>
        </Suspense>
        </Route>


        
        <Route path="/notification" exact>
          <Suspense fallback={<Loader/>}>
          <Notification/>
          </Suspense>
        </Route>



        <Route path="/profilepage" exact>
          <Suspense fallback={<Loader/>}>
          <ProfilePage/>
          </Suspense>
        </Route>


        <Route path="/myprofile" exact>
            <Suspense fallback={<Loader/>}>
              <MyProfile/>
            </Suspense>
        </Route>



        <Route path="/savedposts" exact>
            <Suspense fallback={<Loader/>}>
          <SavedPostsPage/>
            </Suspense>
        </Route>



        <Route path="/messagepage" exact>
            <Suspense fallback={<Loader/>}>
              <MessagePage/>
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
