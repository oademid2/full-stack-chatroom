import './chatroom.css';
import Room from './RoomModel'
import Message from './MessageModel'

import React, { useState,  useEffect} from 'react';
import io from 'socket.io-client';


import ChatMessage from './ChatMessage';
import SocketManager from './Socket'



// "bnh5yzdirjinqaorq0ox1tf383nb3xr"

class Chat extends React.Component{


    constructor(props){

        super(props)

        this.socket = null; 


        console.log(props.data.room)
        if(!props.data.room) props.history.push("/joinroom")

        let room_ = props.data.room//new Room("25", "love isalnd ❤️", "kit")//props.data.room
        let user_ = props.data.user//{userName: props.data.user.userName} //props.data.user_
        let isAdmin_ = room_ ?  (room_.admin == user_.userName? true: false):null
        let token_= props.data.persistentToken? props.data.persistentToken: null;
        console.log("token is: ", token_)

        this.removeMessage =this.removeMessage.bind(this)

        this.state ={
            room: room_,
            user: user_,
            isAdmin: isAdmin_,
            newMessage: "",
            messages: [],
            status: "loading"
        }

        if(!this.state.room)this.props.history.push("/joinroom")
        
    }

    
    componentDidMount(){
        if(!this.state.room)this.props.history.push("/joinroom")
        else{
            this.connectSocket()
            this.socketEvents()
        }
    }

    connectSocket(){
        this.socket = io("http://192.168.1.9:3000", { transport: ['websocket']}) ;
    }


    set(field, value){
        this.setState({[field]: value})
    }

    socketEvents(){

        
        //socket functions
        this.socket.on('connect', (connection) => {
           
            if(this.state.isAdmin){
                this.socket.emit('create-room', SocketManager.createRoom(this))
            }else{
                this.socket.emit('join-room', this.state.room.roomCode,  this.props.data.persistentToken)
            }
            console.log("connected.")

            this.socket.on('generated-user-token', (tkn) => {
                console.log("generated token: ",tkn)
                this.props.data.persistentToken = tkn;
                localStorage.setItem("persistentToken", tkn)
            });


            this.socket.on('backlog-messages', (messages_) => {
                this.set("messages",messages_ )
                console.log("messages received: ", messages_)
            });

            this.socket.on('broadcasted-message', (message) => {
                console.log("received: ",message)
                console.log([...this.state.messages,message])
                this.set("messages", [...this.state.messages,message])
                this.set("pending", "loaded")
            });

            this.socket.on('room-ended', () => {
                console.log("room ended. ")
                this.socket.close()
                this.detachFromRoom()
            });

            this.socket.on('removed-message', (messages_) => {
                this.set("messages",messages_ )
                console.log("messages updated: ", messages_)
            });

            this.socket.on('find-and-ban-user', (token) => {
                console.log("user has been banned.")
                console.log(token == this.props.data.persistentToken)
                if(token == this.props.data.persistentToken){
                    this.detachFromRoom();
                    this.set("status","banned" )

                }
            });

        });

   



    }

    setValue(setter, event){
        this.set(setter, event.target.value)
    }

    updateNewMessage(event){
        this.set("newMessage" ,event.target.value)
    }

    sendMessage(){
        this.socket.emit("broadcast-message", this.state.room.roomCode, this.state.newMessage, this.state.user.userName, this.props.data.persistentToken)
        this.set("newMessage", "")
    }

    endRoom(){
        this.socket.emit("end-room", this.state.room.roomCode)
        this.detachFromRoom()
    }

    detachFromRoom(){
        this.set("room",null)
        this.socket.close()
        this.socket = null;
        this.set("status", "closed")
    }

    leaveRoom(){
        this.socket.emit("leave-room", this.roomCode)
        this.detachFromRoom();
        this.props.history.push("/")
    }

    removeUser(msg){
       
        
    }
    
    exitClosedRoom(){
        this.props.history.push("/")
    }

    removeMessage(msg){
        alert("user will be banned")
        console.log(msg,  this.state.room.roomCode, msg)
        this.socket.emit("ban-user", this.state.room.roomCode, msg)
    }



  
    render(){

        return (
            <div class="root">
            {this.state.room && this.state.status != "closed" ?
                <div class="chatroom-view">
                
                <div class="title-view">
     
                    <p class="title-text">{this.state.room.roomName}</p>
                    {this.state.isAdmin?
                        <p class="title-leave-btn"  onClick={this.endRoom.bind(this)}>end room</p>:
                        <p class="title-leave-btn"  onClick={this.leaveRoom.bind(this)}>leave</p>
                    }

        
                </div>
              
                <div class="chatroom-messages-view">
            
                    {this.state.messages?
                    <div>
                        {this.state.messages.map(msg=> 
                        <ChatMessage 
                            onClick={()=> this.removeMessage(msg)} 
                            key={msg.id} text={msg.message} 
                            userName={msg.userName } 
                            isUser={this.state.user.userName == msg.userName}/>)}
                    </div>
                        :null
                    }
        
                    </div>

                    <div class="typed-message-view">
                        <input  type="text" value={this.state.newMessage} onChange={(event)=> this.setValue("newMessage", event) }class="typed-message-input"></input>
                        <i class="material-icons send-message-btn" onClick={this.sendMessage.bind(this)}>&#xe163;</i>
                    </div>
        
                </div>
                :null
            }

            {this.state.status == "closed"?
            <div>
                <p class="title-leave-btn"  onClick={this.exitClosedRoom.bind(this)}>leave</p>
                <p> room is closed.</p>
            </div>:
                null
            }

            {this.state.status == "banned"?
            <div>
                <p class="title-leave-btn"  onClick={this.exitClosedRoom.bind(this)}>leave</p>
                <p> you've been removed.</p>
            </div>:
                null
            }
            </div>
        );
        
    }
    
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