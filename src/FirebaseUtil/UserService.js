


class UserService  {


    static user = {
        userName:"",
        userID:""
    }

    static token(){
        return localStorage.getItem("userID")
    }

    static getUserID(){
        console.log(localStorage.getItem("userID"))
        return localStorage.getItem("userID")
    }

    static setUserID(ID){
        this.user.userID = ID
        localStorage.setItem("userID", ID)
    }

    static user(){
        
        return {userName: localStorage.getItem("userID"), userID: this.token()}
    }

    static login(user){
        this.user = {...user} 
        console.log(this.user)
        localStorage.setItem("userName", user.userName)
        localStorage.setItem("userID", user.userID)
        console.log("user login: ", user.userID)
    }




}


export {
    UserService
}
