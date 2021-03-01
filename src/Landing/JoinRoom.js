import React, { useState,  useEffect} from 'react';
import { Modal, Button } from 'antd';
import { withRouter} from 'react-router-dom';


import styleSheet from '../Styles/StyleSheet'
import './JoinRoom.css';
import '../Styles/root-themes.css';

import CustomInput from './CustomInput'

import io from 'socket.io-client';




function JoinRoom(props) {

    const [roomCode, setRoomCode] = useState("")
    const [userName, setUserName] = useState("")
    const [preRoomModalVisible, setPreRoomModalVisible] = useState(false);


    function setValue(setter, event){
        setter(event.target.value)
        console.log(roomCode)
    }

    const showPreRoomModal = () => {
      setPreRoomModalVisible(true);
    };



    function onJoinRoom(){

     
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

      })

    }

  return (
    <div >


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
