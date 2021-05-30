import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './utils/NavBar/NavBar'
import DrawerMenu from './utils/NavBar/DrawerMenu'
import Footer from './utils/Footer/Footer'
import LandingPage from './views/LandingPage/LandingPage'
import LandingDetail from './views/LandingPage/LandingDetail'
import SignInPage from './views/Login/SignIn'
import SignUpPage from './views/Login/SignUp'
import VideoUploadPage from './views/Video/VideoUpload'
import VideoDetailPage from './views/Video/VideoDetail'
import UserVideo from './views/Video/UserVideo'
import SubscribePage from './views/Subscribe/Subscribe'
import SearchPage from './views/Search/Search'

import Auth from '../hoc/auth'

function App() {
  return (
    <Router >
      <NavBar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <div style={{ display: 'flex' }}>
              <DrawerMenu style={{ width: '20%'}} />

              <div style={{ width: '80%', height: '100%'}}>
                <Switch>
                    <Route exact path="/" component={Auth(UserVideo, null)} />
                    <Route exact path="/signIn" component={Auth(SignInPage, false)} />
                    <Route exact path="/signUp" component={Auth(SignUpPage, false)} />
                    <Route exact path="/upload" component={Auth(VideoUploadPage, true)} />
                    <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
                    <Route exact path="/youtube/:youtubeId" component={Auth(LandingDetail, null)} />
                    <Route exact path="/subScribe" component={Auth(SubscribePage, true)} />
                    <Route exact path="/youtube" component={Auth(LandingPage, null)} />
                    <Route exact path="/search/:q" component={Auth(SearchPage, null)} />
                </Switch>
              </div>
        </div>
      <Footer />
    </Router>
  );
}

export default App;
