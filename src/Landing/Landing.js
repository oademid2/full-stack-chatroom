import { BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import React, { useState,  useEffect} from 'react';

import './Landing.css';

import LandingPrompt from './LandingPrompt'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'


function Landing(props) {
  console.log(props)

  return (
    <div class="root">
      
      <Router>
          <Switch>
          <Route path='/joinroom' component={()=> <JoinRoom {...props} history={props.history} />}></Route>
          <Route path='/createroom' component={()=> <CreateRoom  {...props} history={props.history}  {...props} />}></Route>
          <Route path='/' component={()=> <LandingPrompt {...props} history={props.history} />}></Route>
        </Switch>
       </Router>
      
    </div>

  );
}


export default Landing;
