import React, { useState,  useEffect} from 'react';
import { Modal, Button, message } from 'antd';
import { withRouter} from 'react-router-dom';

//custom imports
import {FirebaseUtil} from '../Services/FirebaseUtil';
import UserService from '../Services/UserService.js';


import styleSheet from '../Styles/StyleSheet'
import './JoinRoom.css';
import '../Styles/root-themes.css';

import CustomInput from './CustomInput'

import io from 'socket.io-client';




function JoinRoom(props) {

    const [roomCode, setRoomCode] = useState("")
    const [userName, setUserName] = useState("")
    //const [UserService, setUserService] = useState(props.UserService)
    const [preRoomModalVisible, setPreRoomModalVisible] = useState(false);

       
    useEffect(() => {
      if(props.location.state){
        console.log(props.location.state)
        if(props.location.state.room){
          console.log(props.location.state.room)
          setRoomCode(props.location.state.room.roomCode)
        }
      }
      //register user


  }, []);
  

    function setValue(setter, event){
        setter(event.target.value)
        console.log(roomCode)
    }

    const showPreRoomModal = () => {
      setPreRoomModalVisible(true);
    };

    


    async function onJoinRoom(){

     //check availability
     if(!userName){
       message.error("please enter a user name.");
       return
     }

      console.log(props.history)
      let socket = io("http://192.168.1.9:1234", { transport: ['websocket']}) ;

      //create user profile
      let userID  = "123"//await FirebaseUtil.getUserToken();
      let user = {userName: userName, userID: userID}
      UserService.login(user)
      props.data.user = user



      socket.on('connect', (connection) => {

        //see if room exists
        socket.emit('find-room', roomCode, UserService.getUserID())

        //if room does not exist
        socket.on("user-is-banned", () => {
          console.log('user-is-banned')
          message.error("You've been blocked from this room.");

          //TODO: alert
          return
        })


      

        socket.on('room-not-found', () => {
          //TODO: alert

            message.error("room does not exist or is closed.");

          return
        })


        //if room exists
        socket.on('room-found', (room) => {
          props.data.user = {userName: userName};
          props.data.room = room;
          props.history.push("/chat?room="+room.roomID)
          //props.pushHistory("/chat?code="+roomCode)

        })

      })

    }

  return (
    <div class="join-room-root">


      <div class="join-room-view">

        <h1 className="">Join A Room.</h1>



            <CustomInput
                title="Enter room code."
                placeholder="placeholder..."
                onChange={(event) => setValue(setRoomCode, event)}
                value={roomCode}
            />
            <CustomInput
                title="Create a username."
                placeholder="placeholder..."
                onChange={(event) => setValue(setUserName, event)}
                value={userName}
            />

            



      <button class="root-theme-button-sm join-room-button" onClick={()=>onJoinRoom()}>
                join
        </button>




      </div>


      
    </div>

  );
}

export default JoinRoom;
