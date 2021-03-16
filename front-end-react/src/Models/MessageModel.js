export default class Message{

    constructor(roomCode, message, userName, tkn, id) { 
        this.roomCode = roomCode;
        this.message = message;
        this.userName = userName;
        this.messageID = id;
        this.userToken = tkn;
        this.reactions = []
        this.reactors = {}
    }

}