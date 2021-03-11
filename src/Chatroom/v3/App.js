import './App.css';
import { useHistory, BrowserRouter as Router, Route, Switch, Link, withRouter, useLocation} from 'react-router-dom';

import ChatRoom from './Chatroom/ChatRoom'
import Landing from './Landing/Landing'

import { TransitionGroup, CSSTransition } from "react-transition-group";
import{ useState} from 'react';
import CreateRoom from './Landing/CreateAccount';



//import * as util from './util'

var util = null;


/*
import {createStore} from 'redux'
import TestRedux from './Landing/TestRedux';


function reducer(state = {}, action){
  return state;

}
const store = createStore(reducer);*/


function App(props) {

  let location = useLocation();
  const [tr, setTr] = useState("slide");
  let history = useHistory();
  let data ={
    user: null,
    room:null,
    state: {},
    persistentToken: localStorage.getItem("persistentToken")
  }
  console.log(location.key)
  
  return (
    <div className="App">
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css"></link>
        
       {/* <p class="app-title">
          chatable.io 
  </p>*/}
        <Link to="/">create</Link>
        <Link to="/chat">join</Link>

        <TransitionGroup component="div" className="app-body" >
        <CSSTransition
                  key={location.key}
                  in={true}
                  appear={true}
                  classNames={tr}
                  timeout={900}
                >
                <Switch>
                  <Route  path='/chat' component={()=><ChatRoom data={data}  util={util} history={history}  /> }></Route>
                  <Route  path='/' component={()=><Landing  data={data} util={util} history={history}  />} ></Route>
              </Switch>

        </CSSTransition>
        </TransitionGroup>
        </div>

      

  );
}

export default App;
