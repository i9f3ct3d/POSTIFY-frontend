import './App.css';
import { BrowserRouter as Router, Route , Switch,  Redirect} from "react-router-dom";

import SignUp from "./Pages/SignUp/SignUp"
import LogIn from "./Pages/LogIn/LogIn"
import HomePage from "./Pages/Home/HomePage"
import ErrorPage from "./Pages/http-error-page/http-error";
import NewPostPage from "./Pages/NewPostPage/NewPostPage";
import MyPost from "./Pages/MyPosts/Mypost";
import PostContentPage from "./Pages/PostContentPage/PostContentPage";
import Contact from "./Pages/Contact/Contact"
import WelcomePage from "./Pages/Welcomepage/WelcomePage"
import FriendSuggestion from './Pages/FriendSuggestionPage/FriendSuggestion';
import FriendRequest from './Pages/FrinedRequest/FriendRequest';
import Notification from './Pages/Notification/Notification';


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
          <HomePage/>
        </Route>
        <Route path="/newpost" exact>
          <NewPostPage/>
        </Route>
        <Route path="/mypost" exact>
          <MyPost/>
        </Route>
        <Route path="/postinfo" exact>
          <PostContentPage />
        </Route>
        <Route path="/contact" exact>
          <Contact/>
        </Route>
        <Route path="/welcomepage" exact>
          <WelcomePage/>
        </Route>
        <Route path="/friendsuggestion" exact>
          <FriendSuggestion/>
        </Route>
        <Route path="/friendrequest" exact>
          <FriendRequest/>
        </Route>
        <Route path="/notification" exact>
          <Notification/>
        </Route>
        <Route path="/error" exact>
          <ErrorPage/>
        </Route>
        <Redirect to="/welcomepage"/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
