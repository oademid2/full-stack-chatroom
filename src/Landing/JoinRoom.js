import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import React, { useState,  useEffect} from 'react';
import { withRouter } from "react-router";


import './CreateRoom.css';
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'



function JoinRoom(props) {

    const [roomCode, setRoomCode] = useState("")
    const [userName, setUserName] = useState("")

    function setValue(setter, event){
        setter(event.target.value)
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

          <CustomButton 
            onClick={()=>props.history.push("/chat")}
            text={"join"}
        
          />

      </div>
      
    </div>

  );
}

export default JoinRoom;
