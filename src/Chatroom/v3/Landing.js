import { Redirect, BrowserRouter as Router, Route, Switch, withRouter, useLocation, Link} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import{ useState} from 'react';

import React from 'react';


import LandingPrompt from './LandingPrompt'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'

import '../Styles/root-themes.css';
import './Landing.css';
import '../transitions.css';

function Landing(props) {
  console.log(props.history.location )


  let location = useLocation();
  const [tr, setTr] = useState("slide");
  console.log(location.key)

  return (
    <div class="landing-root">


    <div className="landing-root-header">
    <Link to="/createroom">Red</Link>
        <Link to="/joinroom">Green</Link>

    </div>
      


       
      <TransitionGroup component="div" >

          <CSSTransition
                key={location.key}
                in={true}
                appear={true}
                classNames={tr}
                timeout={900}
              >

              <Switch>

                <Route path='/joinroom' component={()=> <JoinRoom history={props.history} {...props}  />}></Route>
                <Route path='/createroom' component={()=> <CreateRoom  {...props} history={props.history}  {...props} />}></Route>
                <Route exact path='/' component={()=> <LandingPrompt {...props} history={props.history} />}></Route>
                <Route path='*' component={()=> <LandingPrompt {...props} history={props.history} />}></Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>


 

    </div>

  );
}


export default withRouter(Landing);
