
import { UserService } from '../FirebaseUtil/UserService';

export default class SocketManager{


    static createRoom(ref){
        ref.socket.emit('create-room', ref.room.roomCode, ref.room, UserService.getUserID())
    }

    static joinRoom(ref){
        
    }
}