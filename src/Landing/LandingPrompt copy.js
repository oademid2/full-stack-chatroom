import React, { useState} from 'react';
import { withRouter } from "react-router";
import "antd/dist/antd.css";

// import styleSheet from '../Styles/StyleSheet'
import JoinRoom from './JoinRoom'
import CreateAccount from './CreateAccount'
//import CustomInput from './CustomInput'

import '../Styles/root-themes.css';
import './Landing.css';
import './LandingPrompts.css';


function LandingPrompt(props) {

  const [createAccountDrawerVisible, setCreateAccountDrawerVisible] = useState(false);

  const onCreateAccount = () => {
    console.log("clicked")
    setCreateAccountDrawerVisible(true);
  };

  const closeCreateAccountDrawer = () => {

    setCreateAccountDrawerVisible(false);

  };


  const pushHistory = (path) =>{
    console.log("pushing")
      props.history.push(path)
  };



  return (
      <div>
          <div class="">

          <div className="landing-header">
            <button onClick={onCreateAccount} className="root-theme-button-sm root-theme-bg-dark-blue register-button">create account</button>
          </div>

      

          <div class="login-options-view">
          <JoinRoom {...props}  history={props.history}></JoinRoom>
          <h4 className="title-create-room">Create a room instead?</h4>
            <button  
              className="root-theme-button-sm button-create-room"
              onClick= {()=> {props.history.push("/createroom")}} 
            > 
              Create Room
            </button>

            <div className="landing-footer">
            </div>

          
          </div>
       
      </div>

      <CreateAccount visible={createAccountDrawerVisible} onClose={closeCreateAccountDrawer} ></CreateAccount>



    </div>


  );
}

export default withRouter(LandingPrompt);


/*

 <button onClick= {()=> removeToken()}>remove token</button>

 */