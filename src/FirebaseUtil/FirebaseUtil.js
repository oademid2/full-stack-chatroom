
//FIREBASE CONFIG//
import firebase from 'firebase';
import 'firebase/firestore';
import {UserService} from './UserService'


var firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
};
  
firebase.initializeApp(firebaseConfig)


//DATABASE INIT
const firestore = firebase.firestore();
var database = firebase.database();

const chatroomsDB = firestore.collection('chatrooms');
const usersDB = firestore.collection('users');
//const messagesRef = firestore.collection('messages');


//Functional groups
class FirebaseUtil  {

     static async getUserToken(){

          if(!UserService.getUserID()){
  
              let userID = await usersDB.add({
                  name: "none",
                  type: "annon"
              }).then(res =>{
                  UserService.setUserID(res.id)
                  //localStorage.setItem("user-token", res.id)
                  console.log("generating new profile: ", res.id)
                  return res.id
              })
              return userID

          }else{
                console.log("returning user: ",UserService.getUserID())
                return UserService.getUserID();
          }
    }
    
    static async findRoomById(roomID){

        let room;
        console.log(roomID)
        await chatroomsDB.doc(roomID).get().then((doc) => {

            console.log(doc)
            if(doc){
                 room =doc.data()
                 room.roomID = doc.id
            }
        })

        console.log(room)

        return room
        
    }
    static async createRoom( roomName, adminID){

        let code = stringGen(6);
        chatroomsDB.get().then((querySnapshot) => {

            let duplicatedCode = true;
            do{
                code = stringGen(6);
                //querySnapshot.docs.forEach(doc => null)
                duplicatedCode = querySnapshot.docs.find(doc => (doc.data()).code == code)
                console.log("code is: ",code)
            }while(duplicatedCode)

            console.log("code is not duplicated: ",code)

        }).catch((error) => {
                console.log("Error getting documents: ", error);
        })

        let room = {
            adminID: adminID,
            roomName: roomName,
            roomCode: code,
            type: "temporary",
            timeStamp: ""//firestore.FieldValue.serverTimestamp()
        }

        await chatroomsDB.add(room).then(doc => room.roomID = doc.id)

        return room
        //return apiCompletionPromise
          
        

      

  }



}


export {
    FirebaseUtil
}

function stringGen(len) {
    var text = "";
    
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    for (var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
    }