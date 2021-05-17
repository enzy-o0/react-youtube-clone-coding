import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './utils/NavBar/Navbar'
import Footer from './utils/Footer/Footer'
import MainPage from './views/Main/Main'
import SignInPage from './views/Login/SignIn'
import SignUpPage from './views/Login/SignUp'
import VideoUploadPage from './views/Video/VideoUpload'
import VideoDetailPage from './views/Video/VideoDetail'
import SubscribePage from './views/Subscribe/Subscribe'

import Auth from '../hoc/auth'

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Auth(MainPage, null)} />
          <Route exact path="/signIn" component={Auth(SignInPage, false)} />
          <Route exact path="/signUp" component={Auth(SignUpPage, false)} />
          <Route exact path="/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/subScribe" component={Auth(SubscribePage, true)} />

        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
