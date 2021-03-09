
//FIREBASE CONFIG//
/*import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

require("firebase/firestore");


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
const chatroomsDB= firestore.collection('chatrooms');
const messagesRef = firestore.collection('messages');



//Functional groups
class rooms  {


    static user = null;
    static room = null;
    

    static async createRoom(roomname, username, password){

        const rand=()=>Math.random(0).toString(36).substr(2);
        const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);   

        console.log(roomname, username, password)
        await chatroomsDB.add({
            name: roomname,
            admin: username,
            password: password
          })
    }

    static async joinroom(userName, roomCode){

        this.room = roomCode
        user_utils.setUser(userName)

    }

    static async getRoom(roomCode){

        return chatroomsDB.doc(roomCode).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data()
            } else {
                console.log("No such document!");
                return ""
            }
        }).catch((error) => {
            console.log("Error gettingdocument:", error);
        });

        
    }

    static async getMessages(roomCode){


        return messagesRef.doc(roomcode).orderBy('createdAt').get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data()
            } else {
                console.log("No such document!");
                return ""
            }
        }).catch((error) => {
            console.log("Error gettingdocument:", error);
        });

        
    }


}

class user_utils{
    static setUser(name, id){
        this.user = {
            name: name
        }

        localStorage.setItem("user-name",name)
    }
}

export {
    rooms,
    user_utils,
    firebase,
    firestore
}
*/