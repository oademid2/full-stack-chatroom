import './CreateRoom.css';
import CustomInput from './CustomInput'
import Room from './RoomModel'
import React, { useState,  useEffect} from 'react';;



function CreateRoom(props) {




    const [roomName, setRoomName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [roomCode, setRoomCode] = useState("")



    function setValue(setter, event){
        setter(event.target.value)

    }

    function onCreateRoom(){


      let room = new Room(roomCode, roomName, userName)
      props.data.room = room;

      /*localStorage.setItem("create-room", true)
      localStorage.setItem("room-code", roomCode)
      localStorage.setItem("room-name", roomName)

      props.history.push("/chat?="+roomCode)*/

    }
  return (
    <div class="root">


      <div class="create-room-view">

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
            <CustomInput
                title="Create an admin password."
                placeholder="placeholder..."
                onChange={(event) => setValue(setPassword, event)}
                value={password}
            />

            <div class="share-view">
            <p class="caption">Share this code to your room.</p>
            <p class="caption-subtitle">{roomCode}</p>

            </div>



            <button onClick={onCreateRoom} class="btn">
                create
            </button>

      </div>
      
    </div>

  );
}

export default CreateRoom;
