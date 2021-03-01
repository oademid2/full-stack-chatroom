import { Redirect, BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import React from 'react';


import LandingPrompt from './LandingPrompt'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'

import '../Styles/root-themes.css';
import './Landing.css';


function Landing(props) {
  console.log(props.history.location.pathname )


  return (
    <div class="root">


      

      <Router>
          <Switch>

          <Route path='/joinroom' component={()=> <JoinRoom history={props.history} {...props}  />}></Route>
          <Route path='/createroom' component={()=> <CreateRoom  {...props} history={props.history}  {...props} />}></Route>
          <Route path='/' component={()=> <LandingPrompt {...props} history={props.history} />}></Route>
        </Switch>
       </Router>
 

    </div>

  );
}


export default withRouter(Landing);
