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

function rand () {
  return Math.random().toString(36).substr(2); // remove `0.`
};

function newToken() {
  let tkn = rand() + rand(); // to make it longer
  while(tokens[tkn]){
    tkn = rand() + rand();
  }

  return tkn;
};

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
let messageId ={}

// The event will be called when a client is connected.
io.on('connection', (socket) => {

    console.log("connection with: ")
    io.clients((error, clients) => {
      if (error) throw error;
      console.log("connection...")
    });

  socket.on('create-room', (roomCode, room, token) => {

    if(!token)socket.emit('generated-user-token', newToken()) //TODO: eventually replace with database tokens/uuid
    console.log("token is: ", token)
    //join room -- creates room
    socket.join(roomCode)
    //add room to dictionary
    rooms[roomCode] = room;
    //initialize messages
    messages[roomCode] = []
    bannedUsers[roomCode] = {}
    messageId[roomCode] = 0
    messages[roomCode].push(new Message("hey", "admin", messageId[roomCode]++, token))
    messages[roomCode].push(new Message("hi!", "user", messageId[roomCode]++, token))

    socket.emit("backlog-messages",messages[roomCode])


    //TODO: delete
    //messages[roomCode] = [{message:"test", userName: "usr", id: messageId++}]

    console.log(roomCode, " created.")
    
  })

  socket.on('find-room', (roomCode, token) => {

    //check if token needs to be generated
    if(!token)socket.emit('generated-user-token', newToken()) //TODO: eventually replace with database tokens/uuid
    //check if user is banned
    else if(bannedUsers[roomCode][tkn]) socket.emit('user-is-banned')
    //check if room exists
    if(!rooms[roomCode]) socket.emit("room-not-found")
    //send existing messages
    else socket.emit("room-found", rooms[roomCode])
    //console-log
    console.log(roomCode, " foud.")


  })

  socket.on('generate-code', () => {

    let code = newCode();
    socket.emit('generated-code', code) //TODO: eventually replace with database tokens/uuid

  })

  socket.on('join-room', (roomCode) => {
    
    console.log(socket.rooms)
    //join room
    socket.join(roomCode)
    //send existing messages
    socket.emit("backlog-messages",messages[roomCode])
    //console-log
    console.log(roomCode, " joined.")

  })

  socket.on('broadcast-message', (roomCode , msg, usr, usrTkn) => {

    //create the message
    let message = new Message(msg, usr, messageId[roomCode]++, usrTkn)
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

  socket.on('add-reaction', (roomCode, message, emoji) => {

    let count = messages[roomCode][message.id].reactions[emoji]
    if(count) ++count;
    else  count = 1;
    console.log(count)
    


    messages[roomCode][message.id].reactions = {
      ...messages[roomCode][message.id].reactions, 
      [emoji]: count
    }
    console.log(messages[roomCode])


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
    messages[roomCode][message.id] = {...message, message: "[message removed]"}
    //tell clients to remove message
    socket.to(roomCode).emit("removed-message",  messages[roomCode])
    //remove message for admin
    socket.emit("removed-message", messages[roomCode])
    //broadcast message to find user we want to ban
    //tell clients to remove message
    socket.to(roomCode).emit("find-and-ban-user",  message.userToken)

    //console-log
    console.log("message removed ", message.id)

  })



  socket.on('disconnect', () => {
    // console.log(`Connection ${socket.id} has left the building`)
  })

});

server.listen(1234, (res, err) => {
  console.log(`Mixing it up on port 3000`);
});




