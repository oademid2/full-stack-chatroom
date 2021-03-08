import './chatroom.css';
import { withRouter} from 'react-router-dom';

import React from 'react';
import io from 'socket.io-client';
import autosize from "autosize";



import ChatMessage from './ChatMessage';
import SocketManager from './Socket'

import { FaTelegramPlane } from "react-icons/fa";
import { Modal, Button } from 'antd';







// "bnh5yzdirjinqaorq0ox1tf383nb3xr"

class Chat extends React.Component{


    constructor(props){

        super(props)

        this.socket = null; 
        this.MaxMessageLength = 140;


        if(!props.data.room) props.history.push("/")

        let room_ = props.data.room//new Room("25", "love isalnd ❤️", "kit")//props.data.room
        let user_ = props.data.user//{userName: props.data.user.userName} //props.data.user_
        let isAdmin_ = room_ ?  (room_.admin === user_.userName? true: false):null //==
        let token_= props.data.persistentToken? props.data.persistentToken: null;
        console.log("token is: ", token_)

        this.removeMessage =this.removeMessage.bind(this)
        this.onAddReaction = this.onAddReaction.bind(this)
        this.showMessageOptions = this.showMessageOptions.bind(this)

        this.state ={
            room: room_,
            user: user_,
            isAdmin: isAdmin_,
            newMessage: "",
            messages: [],
            status: "loading",
            messageOptionsIsVisible: false
        }

        if(!this.state.room)this.props.history.push("/")
        
    }

    
    componentDidMount(){
        if(!this.state.room)this.props.history.push("/")
        else{
            this.connectSocket()
            this.socketEvents()
        }
        this.textarea.focus();
        autosize(this.textarea);
    }

    connectSocket(){
        this.socket = io("http://192.168.1.9:3000", { transport: ['websocket']}) ;
    }


    set(field, value){
        if(field == "newMessage") 
            if(value.length >140)return
        this.setState({[field]: value})
    }

    socketEvents(){

        
        //socket functions
        this.socket.on('connect', (connection) => {
           
            if(this.state.isAdmin){
                SocketManager.createRoom(this)
            }else{
                this.socket.emit('join-room', this.state.room.roomCode,  this.props.data.persistentToken)
            }
            console.log("connected.")

            this.socket.on('generated-user-token', (tkn) => {
                this.props.data.persistentToken = tkn;
                localStorage.setItem("persistentToken", tkn)
                console.log("new token generated: ",tkn)
            });


            this.socket.on('backlog-messages', (messages_) => {
                this.set("messages",messages_ )
                this.set("status", "loaded")

            });

            this.socket.on('broadcasted-message', (message) => {
                this.set("messages", [...this.state.messages,message])
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

            this.socket.on('update-message', (messages_) => {
                this.set("messages",messages_ )
                console.log("messages updated: ", messages_)
            });

            this.socket.on('find-and-ban-user', (token) => {
                console.log("user has been banned.")
                console.log(token === this.props.data.persistentToken)
                console.log(token, this.props.data.persistentToken)

                
                if(token === this.props.data.persistentToken){
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

    onAddReaction(emoji, msg){
        this.socket.emit("add-reaction", this.state.room.roomCode, msg, emoji)
    }

    closeMessageOptions(){
        this.setState({messageOptionsIsVisible: false})
    }


    showMessageOptions(msg){
        console.log(msg)
        this.setState({messageOptionsIsVisible: true})
    }

  
    render(){

        return (
            <div class="root-2">
            {this.state.room && this.state.status !== "closed" ?
                <div class="chatroom-view">
                
                <div class="title-view">
     
                    <span class="title-text">{this.state.room.roomName}</span>
                    {/*this.state.isAdmin?
                        <p class="title-leave-btn"  onClick={this.endRoom.bind(this)}>end room</p>:
                        <p class="title-leave-btn"  onClick={this.leaveRoom.bind(this)}>leave</p>
                    */ }
                    <span class="leave-text">leave</span>

        
                </div>
              
                <div class="chatroom-messages-view">
            
                    {this.state.messages?
                    <div>
                        {this.state.messages.map(msg=> 
                        <ChatMessage 
                            onClick={()=> this.showMessageOptions(msg)} 
                            onReportMessage={this.removeMessage}
                            message ={msg}
                            key={msg.id} 
                            text={msg.message} 
                            userName={msg.userName } 
                            reactions = {msg.reactions}
                            onAddReaction={(emoji=>this.onAddReaction(emoji, msg))}
                            isUser={this.state.user.userName === msg.userName}/>)}
                    </div>
                        :null
                    }
        
                    </div>

                    <div class="typed-message-view">
                    <textarea
                        class="typed-message-input"
                        ref={c => (this.textarea = c)}
                        rows={3}
                        defaultValue=""
                        value={this.state.newMessage} 
                        onChange={(event)=> this.setValue("newMessage", event) }
                        class="typed-message-input"
                        />
       
                     
                        <i class="material-icons send-message-btn" 
                            onClick={this.sendMessage.bind(this)}
                        ><FaTelegramPlane/></i>
                        <span className="character-count">{this.state.newMessage.length}/{this.MaxMessageLength}</span>
                    </div>
        
                </div>
                :null
            }

            {this.state.status === "closed"?
            <div>
                <p class="title-leave-btn"  onClick={this.exitClosedRoom.bind(this)}>leave</p>
                <p> room is closed.</p>
            </div>:
                null
            }

            {this.state.status === "banned"?
            <div>
                <p class="title-leave-btn"  onClick={this.exitClosedRoom.bind(this)}>leave</p>
                <p> you've been removed.</p>
            </div>:
                null
            }


            <Modal  width="80%" visible={this.state.messageOptionsIsVisible}  onCancel={this.closeMessageOptions.bind(this)} footer={null}>
                <div>
                <button> Report User</button>
                 User will be removed when 3 users report or Admin bans.

                </div>
                
            </Modal>







            </div>






        );
        
    }
    
}

export default withRouter(Chat);
