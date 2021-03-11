


class UserService  {



    static token(){
        return localStorage.getItem("userID")
    }

    static getUserID(){
        return localStorage.getItem("userID")
    }

    static setUserID(ID){
        localStorage.setItem("userID", ID)
    }

    static user(){
        return {userName: localStorage.getItem("userID"), userID: this.token()}
    }

    static login(userID, userName){
        localStorage.setItem("userName", userName)
        localStorage.setItem("userID", userID)
    }




}


export {
    UserService
}
