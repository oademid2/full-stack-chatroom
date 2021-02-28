
export default class SocketManager{


    static createRoom(ref){
        ref.socket.emit('create-room', ref.state.room.roomCode, ref.state.room, ref.props.data.persistentToken)
    }
}