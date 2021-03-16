


class UserService  {


    static user = {
        userName:"",
        userID:""
    }

    static token(){
        return this.user.userID
        //return localStorage.getItem("userID")
    }

    static getUserID(){
        return this.user.userID
        //return localStorage.getItem("userID")
    }

    static setUserID(ID){
        this.user.userID = ID
        //localStorage.setItem("userID", ID)
    }

    static user(){
        
        return this.user;
        //return {userName: localStorage.getItem("userID"), userID: this.token()}
    }

    static userName(){
        
        return this.user.userName;
        //return {userName: localStorage.getItem("userID"), userID: this.token()}
    }

    static login(user){
        this.user = {...user} 
        console.log(this.user)
        //localStorage.setItem("userName", user.userName)
        //localStorage.setItem("userID", user.userID)
        console.log("user login: ", user.userID)
    }




}



export default UserService