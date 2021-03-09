
//FIREBASE CONFIG//
import firebase from 'firebase';
import 'firebase/firestore';


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
const chatroomsDB = firestore.collection('chatrooms');
const usersDB = firestore.collection('users');
//const messagesRef = firestore.collection('messages');


//Functional groups
class FirebaseUtil  {

     static async userCheckIn(userName){

          if(!localStorage.getItem("user-token")){
  
              const apiCompletionPromise = usersDB.add({
                  name: userName
              })
  
              return apiCompletionPromise
          }
    }

    static async createRoom(userName, adminId, roomName){

        const apiCompletionPromise = chatroomsDB.add({
            admin: userName,
            adminId: adminId,
            roomName: roomName
        })

        return apiCompletionPromise

  }



}


export {
    FirebaseUtil
}

