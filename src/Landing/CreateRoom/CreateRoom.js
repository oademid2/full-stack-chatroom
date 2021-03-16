
//STYLE SHEETS
import './CreateRoom.css';
import '../../Styles/root-themes.css';
import styleSheet from '../../Styles/StyleSheet'

//Third-party imports
import React, { useState,  useEffect} from 'react';
import { message} from 'antd';
import { withRouter } from "react-router";


//custom imports
import {FirebaseUtil} from '../../Services/FirebaseUtil';
import UserService from '../../Services/UserService.js';

import CustomInput from '../CustomInput'
import User from '../../Models/UserModel'
import Room from '../../Models/RoomModel'


function CreateRoom(props) {

    //info for user sign up
    const [roomName, setRoomName] = useState("")
    const [userName, setUserName] = useState("")
    //const [UserService, setUserService] = useState(props.UserService)

    //const [roomCode, setRoomCode] = useState("")

    
    useEffect( async () => {

        //register user


    }, []);


    ////FUNCTIONS////
    ////////////////
    function setValue(setter, event){
        setter(event.target.value)
    }

    async function onCreateRoom(){


      //validate user form
      if(!userName){
        message.error("please enter a user name.");
        return
      }

      //create user profile
      let userID  = await FirebaseUtil.getUserToken();
      let user = {userName: userName, userID: userID}

      UserService.login(user)
      props.data.user = user
      
      //create a room
      let room = await FirebaseUtil.createRoom( roomName, UserService.getUserID())

      //go to chatroom
      props.history.push({
        pathname: '/chat',
        search: "?room="+room.roomID,
        state: { create:true, room: room, user: user }
      })
    
    }
  return (
    <div className="create-room-root">


      <div className="create-room-view">
      <h1 className="">Create A Room.</h1>

            <CustomInput
                title="Name Your Room"
                placeholder="placeholder..."
                onChange={(event) => setValue(setRoomName, event)}
                value={roomName}
            />

            <CustomInput
                title="Create a username."
                placeholder="placeholder..."
                onChange={(event) => setValue(setUserName, event)}
                value={userName}
            />

            <button 
              onClick={onCreateRoom} 
              className="root-theme-button-sm join-room-button"
            > create
            </button>

      </div>
      
    </div>

  );
}

export default CreateRoom;


/*

  //open up connection to set up room
      let socket_ = io("http://192.168.1.9:3000", { transport: ['websocket']}) ;

      //save connection
      setSocket(socket_)

      //once connected....
      socket_.on('connect', (connection) => {
        console.log("connected.")
        //get a code for the room
        socket_.emit('generate-code')
        socket_.on('generated-code', (code) => {
          setRoomCode(code)
        })

      })


         <CustomInput
                title="Create an admin password."
                placeholder="placeholder..."
                onChange={(event) => setValue(setPassword, event)}
                value={password}
            />



      */