import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar'
import Home from './pages/home/Home';
import './App.css';
import TitleBar from 'frameless-titlebar';
import AudioPlayer from './components/audio-player/AudioPlayer';
import Online from './pages/online/Online';
import Favorites from './pages/favorites/Favorites';
import Settings from './pages/settings/Settings';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <div className="window-bar">
      <TitleBar
        app="Code"
        theme={{
          barTheme: 'dark',
          barBackgroundColor: '#1b2039',
          barColor: 'rgb(230, 230, 230)',
          menuHighlightColor: '#373277',
          menuDimItems: false,
          showIconDarwin: false,
        }}
      />
      </div>
      <Router>
      <Sidebar/>
      <div className="content-wrap">
        <Topbar/>
        <AudioPlayer/>
        <Switch>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/online">
            <Online />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      </Router>
    </div>
  );
}

export default App;
