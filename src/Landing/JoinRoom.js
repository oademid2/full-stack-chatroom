import React, { useState,  useEffect} from 'react';

import styleSheet from '../Styles/StyleSheet'
import './CreateRoom.css';
import '../Styles/root-themes.css';

import CustomInput from './CustomInput'

import io from 'socket.io-client';




function JoinRoom(props) {

    const [roomCode, setRoomCode] = useState("")
    const [userName, setUserName] = useState("")

    function setValue(setter, event){
        setter(event.target.value)
        console.log(roomCode)
    }


    function joinRoom(){

     
      let socket = io("http://192.168.1.9:3000", { transport: ['websocket']}) ;

      socket.on('connect', (connection) => {

        //see if room exists
        socket.emit('find-room', roomCode)

        //if room does not exist
        socket.on('room-not-found', () => {
          //TODO: alert
          return
        })

        //if room exists
        socket.on('room-found', (room) => {

          props.data.user = {userName: userName};
          props.data.room = room;
          props.history.push("/chat?code="+roomCode)
          
        })

      })

    }

  return (
    <div class="root">


      <div class="create-room-view">

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


        <button class="root-theme-button-sm" onClick={()=>joinRoom()}>
                join
        </button>


      </div>
      
    </div>

  );
}

export default JoinRoom;
