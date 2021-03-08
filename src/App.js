import './App.css';
import { useHistory, BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';

import ChatRoom from './Chatroom/ChatRoom'
import Landing from './Landing/Landing'

import * as util from './util'

/*
import {createStore} from 'redux'
import TestRedux from './Landing/TestRedux';


function reducer(state = {}, action){
  return state;

}
const store = createStore(reducer);*/


function App(props) {
  let history = useHistory();
  let data ={
    user: null,
    room:null,
    persistentToken: localStorage.getItem("persistentToken")
  }

  
  return (
    <div className="App">
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css"></link>
        <p class="app-title">
          chatable.io 
        </p>
        <div class="app-body">

          <Switch>
            <Route  path='/chat' component={()=><ChatRoom data={data} util={util} history={history}  /> }></Route>
            <Route  path='/' component={()=><Landing data={data} util={util} history={history}  />} ></Route>
        </Switch>


        </div>

      
    </div>
  );
}

export default App;
