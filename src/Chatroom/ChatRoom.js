import './chatroom.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import React, { useState,  useEffect} from 'react';


import ChatMessage from './ChatMessage';



function Chat(props) {

    const [roomCode, setRoomCode] = useState("")
    const [room, setRoom] = useState("")
    
    let code_ = query_params(window.location.href).roomcode
    const firestore = props.util.firebase.firestore();
    const messagesRef = firestore.collection('messages');
    //const queryMessages = messagesRef.whereArrayContains("code", code_).orderBy('createdAt')
    //const [messages] = useCollectionData(queryMessages, { idField: 'id' });
    let messages;


    useEffect(() => {
        
        let room_;
        props.util.rooms.getRoom(code_).then(data => {
            room_ = data;
            setRoomCode(code_)
            setRoom(room_);
        })

        
    }, []);
    



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
    {messages && room?
        <div class="chatroom-view">
        <div class="title-view">
            <p class="title-text">{room.room_name}</p>
        </div>
        <div class="chatroom-messages-view">
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
            {messages && messages.map(msg => <ChatMessage key={msg.id} text={msg.message} userName={msg.userID} />)}

         
           
     
        </div>
        <div class="typed-message-view">
            <input class="typed-message-input"></input><i class="material-icons send-message-btn">&#xe163;</i>


        </div>

    </div>:null
}
    </div>
  );
}

export default Chat;
