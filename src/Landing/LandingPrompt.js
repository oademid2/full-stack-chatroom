import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import React, { useState,  useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";


import styleSheet from './StyleSheet'

import './Landing.css';


function LandingPrompt(props) {
  let history = useHistory();

  let style={
  
  }

  return (
    <div class="root">

      <div class="login-options-view">
        <button  style={{...styleSheet.blockButton}}  onClick= {()=> {
          props.history.push("/createroom")
          console.log('test')
          
        }} > 
          Create Room
        </button>
        <button onClick= {()=> props.history.push("/joinroom")}  style={{...styleSheet.blockButton}}  >Join Room</button>
      </div>
    </div>

  );
}

export default withRouter(LandingPrompt);
