class Message{

    constructor(roomCode, message, userName, userID, messageID) { 
        this.roomCode = roomCode;
        this.message = message;
        this.userName = userName;
        this.userToken = userID;
        this.messageID = messageID;
        this.reactions = []
    }

}
module.exports = Message;