import './CreateRoom.css';
import '../Styles/root-themes.css';
import styleSheet from '../Styles/StyleSheet'

//FIREBASE CONFIG//
import firebase from 'firebase';
import 'firebase/firestore';



import CustomInput from './CustomInput'
import Room from '../Models/RoomModel'
import React, { useState,  useEffect} from 'react';
import { message} from 'antd';
import {FirebaseUtil} from '../FirebaseUtil/FirebaseUtil';
import io from 'socket.io-client';


//const FB = new FirebaseUtil();




function CreateRoom(props) {

    //info for user sign up
    const [roomName, setRoomName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [roomCode, setRoomCode] = useState("")
    const [socket, setSocket] = useState("")



    
    useEffect( () => {

     

      FirebaseUtil.userCheckIn("name").then(res=>{
        console.log("RES: ", res)
      })
    

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

    }, []);

    function setValue(setter, event){
        setter(event.target.value)

    }

    function onCreateRoom(){

      //validate user form
      if(!userName){
        message.error("please enter a user name.");
        return
      }

      //Create room object //create user object
      let room = new Room(roomCode, roomName, userName)
      let user = {userName: userName}
      //update props// TODO: change to redux
      props.data.user = user
      props.data.room = room;
      //change pages
      props.history.push("/chat?="+roomCode)


    }
  return (
    <div className="page-root create-room-root">


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
  
            {/*
            <div className="share-view">
              <p className="caption">Share this code to your room.</p>
              <p className="caption-subtitle">{roomCode}</p><br/>
              <p className="caption">Share this url to your room.</p>
              <p className="caption-subtitle">{"websitename.com/chat?="+roomCode}</p>
            </div>
            */}

            <button 
              onClick={onCreateRoom} 
              style={styleSheet.smallbutton}
            > create
            </button>

      </div>
      
    </div>

  );
}

export default CreateRoom;


/*


         <CustomInput
                title="Create an admin password."
                placeholder="placeholder..."
                onChange={(event) => setValue(setPassword, event)}
                value={password}
            />



      */