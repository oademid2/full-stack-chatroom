import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import React, { useState,  useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";


import styleSheet from '../Styles/StyleSheet'

import './Landing.css';


function LandingPrompt(props) {
  let history = useHistory();

  let style={
  
  }

  function removeToken(){
    localStorage.removeItem("persistentToken")
  }

  return (
    <div class="root">

      <div class="login-options-view">
        <button  
          style={{...styleSheet.largeButton}}  
          onClick= {()=> {props.history.push("/createroom")}} 
        > 
          Create Room
        </button>
        <button 
          onClick= {()=> props.history.push("/joinroom")}  
          style={{...styleSheet.largeButton}}>
            Join Room
        </button>
        <button onClick= {()=> removeToken()}>remove token</button>
      </div>
    </div>

  );
}

export default withRouter(LandingPrompt);
