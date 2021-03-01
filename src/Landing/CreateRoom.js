import './CreateRoom.css';
import '../Styles/root-themes.css';
import styleSheet from '../Styles/StyleSheet'


import CustomInput from './CustomInput'
import Room from '../Models/RoomModel'
import React, { useState,  useEffect} from 'react';
import io from 'socket.io-client';




function CreateRoom(props) {

    const [roomName, setRoomName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [roomCode, setRoomCode] = useState("")
    const [socket, setSocket] = useState("")


    
    useEffect(() => {

      let socket_ = io("http://192.168.1.9:3000", { transport: ['websocket']}) ;

      setSocket(socket_)
      socket_.on('connect', (connection) => {

        console.log("connected.")
        //see if room exists
        socket_.emit('generate-code')


        //if room does not exist
        socket_.on('generated-code', (code) => {
          setRoomCode(code)
        })

      })

    }, []);

    function setValue(setter, event){
        setter(event.target.value)

    }

    function onCreateRoom(){

      //Create room object //create user object
      let room = new Room(roomCode, roomName, userName)
      let user = {userName: userName}
      //update props
      props.data.user = user
      props.data.room = room;
      
      //change pages
      console.log(props.data.room)
      props.history.push("/chat?="+roomCode)


    }
  return (
    <div className="root">


      <div className="create-room-view">

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

            <div className="share-view">
            <p className="caption">Share this code to your room.</p>
            <p className="caption-subtitle">{roomCode}</p><br/>
            <p className="caption">Share this url to your room.</p>
            <p className="caption-subtitle">{roomCode}</p>
            

            </div>



            <button 
              onClick={onCreateRoom} 
              style={styleSheet.smallbutton}
            >
                create
            </button>

      </div>
      
    </div>

  );
}

export default CreateRoom;
