//app.js

//express to run the app
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
const  Room = require('./RoomModel');
const  Message = require('./MessageModel');
dotenv.config();

//initialize app
const app = express();
const server = require('http').Server(app);
const io = require('socket.io', {cors:{origin:'*'}})(server);

//set up app to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const corsOptions = { origin: true, credentials: true}
app.options('*', cors(corsOptions));
app.use(cors());

//start app to listen
/*app.listen(1234, () => {
    console.log('app is up and running on port numner ' + process.env.PORTNUM);
});*/


function newCode() {
  let code = Math.floor((Math.random()*1000000)+1);; // to make it longer
  while(rooms[code]){
    code = Math.floor((Math.random()*1000000)+1);
  }

  return code;
};

let rooms = {}
let messages = {}
let bannedUsers = {}
let tokens = {}
let messageID ={}

// The event will be called when a client is connected.
io.on('connection', (socket) => {

   console.log("connection with: ")
    /*io.clients((error, clients) => {
      if (error) throw error;
      console.log("connection...")
    });*/

  socket.on('create-room', (roomCode, room, token) => {

    console.log(roomCode, room, token)
    //if(!token)socket.emit('generated-user-token', newToken()) //TODO: eventually replace with database tokens/uuid
   // console.log("token is: ", token)
   
   //join room -- creates room
    socket.join(roomCode)
    //add room to dictionary
    rooms[roomCode] = room;
    //initialize messages
    messages[roomCode] = []
    bannedUsers[roomCode] = {}
    messageID[roomCode] = 0
    messages[roomCode].push(new Message(roomCode, "Chatroom started.", "welcome bot 🦾", "122", messageID[roomCode]++ ))
    //messages[roomCode].push(new Message(roomCode, "hi!", "user", "122", messageID[roomCode]++))

    socket.emit("backlog-messages",messages[roomCode])


    //TODO: delete
    //messages[roomCode] = [{message:"test", userName: "usr", id: messageId++}]

    console.log(room, " created.")
    
  })

  socket.on('find-room', (roomCode, token) => {

    //check if token needs to be generated
    //if(!token)socket.emit('generated-user-token', newToken()) //TODO: eventually replace with database tokens/uuid
    //check if user is banned
        //check if room exists
    if(!rooms[roomCode]) socket.emit("room-not-found")
    else if(bannedUsers[roomCode][token]) socket.emit('user-is-banned')
    //send existing messages
    else socket.emit("room-found", rooms[roomCode])
    //console-log
    console.log(roomCode, " found.")


  })

  socket.on('generate-code', () => {

    let code = newCode();
    socket.emit('generated-code', code) //TODO: eventually replace with database tokens/uuid

  })

  socket.on('join-room', (roomCode, userID) => {
    
    if(bannedUsers[roomCode][userID]){
      socket.emit("303")
      return
    }
    console.log(socket.rooms)
    //join room
    socket.join(roomCode)
    //send existing messages
    socket.emit("backlog-messages",messages[roomCode])
    //console-log
    console.log(roomCode, " joined.")

  })

  socket.on('broadcast-message', (roomCode , msg) => {

    //create the message
    let message = {...msg, messageID: messageID[roomCode]++}
    messages[roomCode].push(message)

    //broadcast message
    socket.to(roomCode).emit("broadcasted-message", message)

    //send message to original
    socket.emit("broadcasted-message", message)

    //console-log
    console.log("broadcasted ", message,  " to ", roomCode )

  })

  socket.on('end-room', (roomCode) => {

    //broadcast message
    socket.to(roomCode).emit("room-ended")

    delete rooms[roomCode]
    //console-log
    console.log("room ended ", roomCode )

  })

  socket.on('add-reaction', (roomCode, message, emoji, tkn) => {

    messages[roomCode][message.messageID].reactions.push({emoji: emoji, by: tkn})

    //broadcast message
    socket.to(roomCode).emit("update-message", messages[roomCode])
    socket.emit("update-message", messages[roomCode])

    //console-log
    console.log("updating message ", roomCode )

  })

  socket.on('ban-user', (roomCode, message) => {

    //send banned to client with token
    bannedUsers[roomCode][message.userToken] = true;

    console.log('*****', roomCode, messages, messages[roomCode])
    //remove message
    messages[roomCode][message.messageID] = {...message, message: "[message removed]", flagged: true}
    //tell clients to remove message
    socket.to(roomCode).emit("removed-message",  messages[roomCode], message.userToken)
    //remove message for admin
    socket.emit("removed-message", messages[roomCode], message.userToken)
    //broadcast message to find user we want to ban
    //tell clients to remove message
    socket.to(roomCode).emit("find-and-ban-user",  message.userToken)

    //console-log
    console.log("message removed ", message.messageID, " sent by ", message.userToken)

  })



  socket.on('disconnect', () => {
    // console.log(`Connection ${socket.id} has left the building`)
  })

});

server.listen(1234, (res, err) => {
  console.log(`Mixing it up on port 3000`);
});




