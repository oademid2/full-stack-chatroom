import React, { useEffect, useState} from 'react';
import { withRouter } from "react-router";
import "antd/dist/antd.css";

// import styleSheet from '../Styles/StyleSheet'
import JoinRoom from './JoinRoom'
import CreateAccount from './CreateAccount'
//import CustomInput from './CustomInput'

import Room from '../Models/RoomModel'
import io from 'socket.io-client';

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



  function onCreateRoom(){

    props.history.push("/createroom")
    /*//Create room object //create user object
    let room = new Room(25, "roomName", "admin")
    let user = {userName: "admin"}
    //update props
    props.data.user = user
    props.data.room = room;
    
    //change pages
    console.log(props.data.room)
    props.history.push("/chat?="+"25")
    //props.history.push("/createroom")*/


  }

  function onJoinRoom(){

    props.history.push("/joinroom")

   /* let roomCode ="25"
    let userName ="user"
     
    console.log(props.history)
    let socket = io("http://192.168.1.9:3000", { transport: ['websocket']}) ;

    socket.on('connect', (connection) => {

      //see if room exists
      socket.emit('find-room', roomCode)

      //if room does not exist
      socket.on('user-is-banned', () => {
        console.log('user-is-banned')
        //TODO: alert
        return
      })

      socket.on('room-not-found', () => {
        //TODO: alert
        return
      })


      //if room exists
      socket.on('room-found', (room) => {
        props.data.user = {userName: userName};
        props.data.room = room;
        props.history.push("/chat?code="+roomCode)
        //props.pushHistory("/chat?code="+roomCode)

      })

    })*/

  }


  return (
      <div className="landing-prompts-root">
          <div class="login-options-view">

          <div className="landing-header">
            <button onClick={onCreateAccount} className="root-theme-button-sm root-theme-bg-dark-blue register-button">create account</button>
          </div>

      

          <div class="login-options-view">
          <button  
              className="root-theme-button-med prompt-btn"
              onClick= {onJoinRoom} 
            > 
              Join Room
            </button>
            <button  
              className="root-theme-button-med prompt-btn"
              onClick= {onCreateRoom} 
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