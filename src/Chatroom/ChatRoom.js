import './chatroom.css';
import Room from './RoomModel'
import Message from './MessageModel'

import React, { useState,  useEffect} from 'react';
import io from 'socket.io-client';


import ChatMessage from './ChatMessage';

let mesages = [];

function Chat(props) {

    const [room, setRoom] = useState(true)
    const [user, setUser] = useState(true)
    const [newMessage, setNewMessage] = useState("")
    //const [messages, setMessages] = useState([])

    const [isAdmin, setIsAdmin] = useState(false)

    const [roomSocket, setRoomSocket] = useState(null)
    //const socket = props.socket;
    

    useEffect(() => {

        let room_ = new Room("25", "love isalnd ❤️", "kit")//props.data.room
        let user_ = {userName:"kit"} //props.data.user_
        let isAdmin_ = room_.admin == user.userName? true: false;

        setRoom(room_)
        setUser(user_)
        setIsAdmin(isAdmin_)

        //TODO: enter by url
        //let roomCode_ = query_params(window.location.href)

        const socket = io("http://192.168.1.9:3000", { transport: ['websocket']}) ;

        /*
        //url info
        //set states
        if(isAdmin_)setIsAdmin(true)
        setRoomCode(roomCode_)
        */


        //socket functions
        socket.on('connect', (connection) => {

            console.log(isAdmin_)
            setRoomSocket(socket)
            
            if(isAdmin_)socket.emit('create-room', room_.roomCode)
            else socket.emit('join-room', room_.roomCode)



            socket.on('backlog-messages', (messages_) => {
                //setMessages(messages_)
                messages = messages_;

            });

            socket.on('broadcasted-message', (message) => {

                console.log("received: ",message)
                console.log(messages)
                let msg = [...messages]
                msg.push(message)
                console.log(msg)
                setMessages([...msg])

            });

      });

        
    }, []);


    function setValue(setter, event){
        setter(event.target.value)

    }

    function sendMessage(){
        roomSocket.emit("broadcast-message", room.roomCode, newMessage, user.userName)
        setNewMessage("")
    }
    



    function query_params(queryString){
        
        var queryParts = queryString.split('?')
        var pairsString;
        var query = {}

        console.log(queryParts)
        if(queryParts.length > 1) pairsString = queryParts[1].split('=');
        console.log(pairsString)

        let i=0;
        while(i <pairsString.length){
            query[pairsString[i]] = pairsString[i+1]
            i+=2;
        }
        console.log(query)

        return query
    }

    




  

  return (
    <div class="root">
    {room?

        <div class="chatroom-view">
        <div class="title-view">
            <p class="title-text">{room.roomName}</p>
        </div>
        <div class="chatroom-messages-view">
    
            {messages?
            <div>
                {messages.map(msg=> <ChatMessage key={msg.id} text={msg.message} userName={""} isUser={false}/>)}
                </div>
                :null
            }

            </div>
            <div class="typed-message-view">
            
                <input  type="text" value={newMessage} onChange={(event)=> setValue(setNewMessage, event) }class="typed-message-input"></input>
                <i class="material-icons send-message-btn" onClick={sendMessage}>&#xe163;</i>


            </div>

        </div>
        :null
    }
    </div>
  );
}

export default Chat;



/*


      //let roomCode_ = localStorage.getItem("room-code")
        let isAdmin_ = localStorage.getItem('create-room')
        let roomName_ = localStorage.getItem("room-name")
        let userName_ = localStorage.getItem("user-name")
        let room_ = {
            name:roomName_,
            admin: userName_,
            password:"xxx",
            code: roomCode_
        }


                <ChatMessage
                text={"Hi, Sweet! So, what do you wanna do today?Sweet! "}
                userName="name"
                isUser={true}
            ></ChatMessage>
            <ChatMessage
                text={"Hi, Sweet! So, what do you wanna do today?Sweet! "}
                userName="name"
                isUser={false}
            ></ChatMessage>
                    <ChatMessage
                text={"Hi, Sweet! So, what do you wanna do today?Sweet! "}
                userName="name"
                isUser={true}
            ></ChatMessage>
            <ChatMessage
                text={"Hi, Sweet! So, what do you wanna do today?Sweet! "}
                userName="name"
                isUser={false}
            ></ChatMessage>
                                <ChatMessage
                text={"Hi, Sweet! So, what do you wanna do today?Sweet! "}
                userName="name"
                isUser={true}
            ></ChatMessage>
*/