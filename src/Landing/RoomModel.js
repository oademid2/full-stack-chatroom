export default class Room{

    constructor(roomCode, roomName, admin) { 
        this.roomCode = roomCode;
        this.roomName = roomName;
        this.admin = admin;
    }

    setRoom(room_){
        this.roomCode = room_.roomCode;
        this.roomName = room_.roomName;
        this.admin = room_.admin;
        return new Room(room_.roomCode, room_.roomName, room_.admin)
    }

}