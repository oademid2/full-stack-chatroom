import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import React, { useState,  useEffect} from 'react';
import { withRouter } from "react-router";


import './CreateRoom.css';
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'


function CreateRoom(props) {


    let history = useHistory();

    const [roomName, setRoomName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [roomCode, setRoomCode] = useState("|")

    function setValue(setter, event){
        setter(event.target.value)
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



            <button onClick={()=> props.history.push("/chat")} class="btn">
                create
            </button>

      </div>
      
    </div>

  );
}

export default CreateRoom;
