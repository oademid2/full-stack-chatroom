
//STYLE SHEETS
import './CreateRoom.css';
import '../Styles/root-themes.css';
import styleSheet from '../Styles/StyleSheet'

//Third-party imports
import React, { useState,  useEffect} from 'react';
import { message} from 'antd';
import { withRouter } from "react-router";


//custom imports
import {FirebaseUtil} from '../FirebaseUtil/FirebaseUtil';
import {UserService} from '../FirebaseUtil/UserService';

import CustomInput from './CustomInput'
import User from '../Models/UserModel'
import Room from '../Models/RoomModel'


function CreateRoom(props) {

    //info for user sign up
    const [roomName, setRoomName] = useState("")
    const [userName, setUserName] = useState("")
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
      let room = await FirebaseUtil.createRoom( roomName, UserService.token())

      //go to chatroom
      props.history.push({
        pathname: '/chat',
        search: "?room="+room.id,
        state: { create:true, room: room, user: user }
      })
        //Create room object //create user object
        //update props// TODO: change to redux
        //FirebaseUtil.createRoom(userName, UserService.token(), roomName).then(room=>{
            //console.log(doc.data())
            //let room = new Room(doc.id, roomName, UserService.token())
            //let user = {userName: userName, userID: UserService.token()}
            //props.data.user = user
            //props.data.room = room;
            /*props.history.push({
              pathname: '/chat',
              search: "?room="+doc.id,
              state: { create:true, room: room, user: user }
            })*/
            //change pages

           // props.history.push("/chat?room="+doc.id)

        //})
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

export default withRouter(CreateRoom);


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