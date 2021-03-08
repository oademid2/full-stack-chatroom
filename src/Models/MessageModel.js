export default class Message{

    constructor(message, userName, id, tkn) { 
        this.message = message;
        this.userName = userName;
        this.id = id;
        this.userToken = tkn;
        this.reactions = {}
    }

}