import { Redirect, BrowserRouter as Router, Route, Switch, withRouter, useLocation, Link} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import{ useState} from 'react';

import React from 'react';


import LandingPrompt from './LandingPrompt'
import CreateRoom from './CreateRoom/CreateRoom'
import JoinRoom from './JoinRoom'

import '../Styles/root-themes.css';
import './Landing.css';

function Landing(props) {
  console.log(props.history.location )


  //const [UserService, setUserService] = useState(props.UserService)

  let location = useLocation();

  console.log(location)

  return (
    <div class="landing-root">


          <div className="landing-root-header">
            <Link className={"nav "+(location.pathname =="/joinroom"? "active":"")} to="/joinroom" >Join </Link>
            <Link className={"nav "+(location.pathname =="/createroom"? "active":"")} to="/createroom">Create</Link>
          </div>
      
  

            <div className="landing-content">

            <Switch >

                <Route path='/joinroom' component={()=> <JoinRoom history={props.history} {...props}  />}></Route>
                <Route path='/createroom' component={()=> <CreateRoom  {...props} history={props.history}  {...props} />}></Route>
                <Route path='*' component={()=> <JoinRoom history={props.history} {...props}  />}></Route>
                {/*<Route exact path='/' component={()=> <LandingPrompt {...props} history={props.history} />}></Route>
                <Route path='*' component={()=> <LandingPrompt {...props} history={props.history} />}></Route>*/}
            </Switch>
            </div>



 

    </div>

  );
}


export default withRouter(Landing);
