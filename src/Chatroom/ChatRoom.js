import './chatroom.css';
import { withRouter} from 'react-router-dom';

import React from 'react';
import io from 'socket.io-client';
import autosize from "autosize";



import ChatMessage from './ChatMessage';
import SocketManager from './Socket'
import Message from '../Models/MessageModel'

import { FaTelegramPlane } from "react-icons/fa";
import { Modal, Button } from 'antd';
import { UserService } from '../FirebaseUtil/UserService';
import { FirebaseUtil } from '../FirebaseUtil/FirebaseUtil';
import User from '../Models/UserModel';


class Chat extends React.Component{


    constructor(props){

        super(props)

        this.state = {
            room: null,
            user: null,
            isAdmin: "",
            newMessage: "",
            messages: [],
            status: "",
            messageOptionsIsVisible: false,
            render:false
        }

        ////bind functions
        this.textarea = <textarea/>
        this.messagesEnd = <div/>
        this.showModal = this.showModal.bind(this)
        this.removeMessage =this.removeMessage.bind(this)
        this.onAddReaction = this.onAddReaction.bind(this)
        this.showMessageOptions = this.showMessageOptions.bind(this)

        //other variables
        this.MaxMessageLength = 140;
        this.socket = null; 
        this.room = null;
        
    }


    componentDidMount(){

        //query parameters
        let queryParams = {}
        try{
            let searchString = this.props.history.location.search.substring(1).split('&')
            let pair = []
            for(var i=0;i<searchString.length;i++){
                pair = searchString[i].split('=')
                queryParams[pair[0]] = pair[1]
            }
            //if no room in parameters status 404
            if(!queryParams.room)  return this.setState({status: "404"})
        }catch(err){
            //if paramaters not complete status 404
            console.log("query paramater err: ", err)
            this.setState({render: true})
            this.setState({status: "404"})
            return
            
        }


        ( async() => {
        /////find room
        let room ;
        if(this.props.location.state) room = this.props.location.state.room
        else room = await FirebaseUtil.findRoomById(queryParams.room)

        //if room not found then render a ror page
        if(!room){
            this.setState({status: "404"})
            this.setState({render: true})
            return
        }

        this.room = room;
        //set state
        this.setState({
            room: room,
            user: {userName:"anon", userID: UserService.token() },
            isAdmin: room.adminID == UserService.token(),
            newMessage: "",
            messages: [],
            status: "200",
            messageOptionsIsVisible: false,
            modalVisible: false,
            modal:{state:""},
            render:true
        })

        console.log("this room is: ", room)

        //connect sockets
        this.connectSocket()
        this.socketEvents()

        autosize(this.textarea);


    })()

    }

    queryParameters(){
        let queryParams = {}
        let searchString = this.props.history.location.search.substring(1).split('&')
        let pair = []

        for(var i=0;i<searchString.length;i++){
            pair = searchString[i].split('=')
            queryParams[pair[0]] = pair[1]
        }
    }

    connectSocket(){
        this.socket = io("http://192.168.1.9:1234", { transport: ['websocket']}) ;
    }


    set(field, value){
        this.setState({[field]: value})
    }

    socketEvents(){

        
        //socket functions
        this.socket.on('connect', (connection) => {
           
            if(this.state.isAdmin){
                console.log(UserService.getUserID())
                SocketManager.createRoom(this)
            }else{
                this.socket.emit('join-room', this.room.roomCode,  UserService.getUserID())
            }
            console.log("connected.")

            this.socket.on('generated-user-token', (tkn) => {
                this.props.data.persistentToken = tkn;
                localStorage.setItem("persistentToken", tkn)
                console.log("new token generated: ",tkn)
            });


            this.socket.on('backlog-messages', (messages_) => {
                this.set("messages",messages_ )
                this.set("status", "200")
                console.log("backlog: ", messages_)

                


            });

            this.socket.on('broadcasted-message', (message) => {
                console.log("received")
                this.set("messages", [...this.state.messages,message])
            });

            this.socket.on('room-ended', () => {
                console.log("room ended. ")
                this.detachFromRoom()
                this.set("status", "exit")
            });

            this.socket.on('removed-message', (messages_, userID) => {
                this.set("messages",messages_ )
                if(userID == UserService.getUserID()) this.setState({status:"303"})
                console.log(userID)
                console.log(UserService.getUserID())
                console.log(userID == UserService.getUserID())
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

        console.log(event.target.value, event.target.value.length, event.target.value.substring(0,this.MaxMessageLength))
        if(event.target.value.length>this.MaxMessageLength)return this.set("newMessage" ,event.target.value.substring(0,this.MaxMessageLength))
        this.set("newMessage" ,event.target.value)
    }

    sendMessage(){
        let msg = new Message(this.state.room.roomCode, this.state.newMessage, this.state.user.userName, UserService.token())
        //this.socket.emit("broadcast-message", this.state.room.roomCode, this.state.newMessage, this.state.user.userName, this.props.data.persistentToken)
        this.socket.emit("broadcast-message", this.state.room.roomCode, msg)
        this.set("newMessage", "")
    }

    endRoom(){
        console.log('end')
        this.socket.emit("end-room", this.state.room.roomCode)
        this.detachFromRoom()
        this.setState({status: "exit"})
    }

    detachFromRoom(){
        //this.set("room",null)
        this.socket.close()
        delete this.socket;
        //this.set("status", "exit")
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
        console.log("removing: ", msg,  this.state.room.roomCode, msg)
        this.socket.emit("ban-user", this.state.room.roomCode, msg)
    }

    onAddReaction(emoji, msg){
        this.socket.emit("add-reaction", this.state.room.roomCode, msg, emoji)
    }

    closeMessageOptions(){
        this.setState({modalVisible: false})
        this.setState({modal: {state:""}})
        this.setState({messageOptionsIsVisible: false})
    }


    showMessageOptions(msg){
        this.setState({messageOptionsIsVisible: true})
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
    componentDidUpdate(prevState, currState) {
        //console.log(prevState, currState)
        if(this.state.render && this.state.status =="200")this.scrollToBottom();
      }

      showModal(state,data=null){
          console.log(state)
          this.setState({modal: {state:state, data:data}})
          this.setState({modalVisible: true})
          
      }
  
    render(){

        return (
            
            <div class="page-root chatroom-root">
                {!this.state.render? <div>Loading</div>:null}
                {(this.state.render && this.state.status=="404")? <div>STATUS 404</div>:null}
                {(this.state.render && this.state.status=="exit")? <div>room ended by admin.</div>:null}
                {(this.state.render && this.state.status=="303")? <div>you've been removed from this room.</div>:null}

                {(this.state.render && this.state.status =="200" )?
                    <div> {this.state.room && this.state.status != "closed" ?
                        <div class="chatroom-view">
                        
                        <div class="title-view">
            
                            <span class="title-text">{this.state.room.roomName}</span>
                            {/*this.state.isAdmin?
                                <p class="title-leave-btn"  onClick={this.endRoom.bind(this)}>end room</p>:
                                <p class="title-leave-btn"  onClick={this.leaveRoom.bind(this)}>leave</p>
                            */ }
                        {this.state.isAdmin?
                                <span onClick={()=>this.showModal("end-room")}class="leave-text">end</span>:
                                <span onClick={this.leaveRoom.bind(this)} class="leave-text">leave</span>
                        }

                
                        </div>
                    
                        <div class="chatroom-messages-view">
                    
                            {this.state.messages?
                            <div>
                                {this.state.messages.map(msg=> 
                                <ChatMessage 
                                    onClick={()=> this.showModal("ban-user",msg)} 
                                    onReportMessage={this.removeMessage}
                                    message ={msg}
                                    key={msg.messageID} 
                                    text={msg.message} 
                                    userName={msg.userName } 
                                    reactions = {msg.reactions}
                                    onAddReaction={(emoji=>this.onAddReaction(emoji, msg))}
                                    isUser={UserService.token()=== msg.userToken }/>)}
                                       <div style={{ float:"left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                            </div>
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
                                onChange={this.updateNewMessage.bind(this) }
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


                    <Modal  width="80%" visible={this.state.modalVisible}  onCancel={this.closeMessageOptions.bind(this)} footer={null}>
                    <div className="message-info-modal">
                        {this.state.modal.state == "end-room"?
                            <div>
                                Are you sure you want to end room? All members will be kicked out.
                                <button onClick={this.endRoom.bind(this)}> End Room</button>

                            </div>:null
                        }

                        {this.state.modal.state == "ban-user"?
                            <div>
                            <button onClick={()=>this.removeMessage(this.state.modal.data)}> Remove User</button>
                            </div>:null
                        }
                    </div>
                        
                        
                        
                    </Modal>





                    </div>

                    :null
                }

            </div>






        );

        
    }
    
}

export default withRouter(Chat);
