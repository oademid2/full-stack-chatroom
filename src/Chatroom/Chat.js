import './chatroom.css';
import ChatMessage from './ChatMessage';


function Chat() {
  return (
    <div class="root">
    <div class="chatroom-view">
        <div class="title-view">
            <p class="title-text">Love Island Canada ❤️</p>
        </div>
        <div class="chatroom-messages-view">
            <ChatMessage
                text={"Hi, Sweet! So, what do you wanna do today?Sweet! "}
                userName="name"
                isUser={true}
            ></ChatMessage>
            <div class="chat-message-view user">
                <p class="chat-message-text user">Hi, Sweet! So, what do you wanna do today?Sweet! 
                    So, what do you wanna do today?Sweet! So, what do you wanna do today?Sweet! So, what do you wanna do today?Sweet! 
                    So, what do you wanna do today?Sweet! So, what do you wanna do today?Sweet! So, what do you wanna do today?
                </p>
                <p class="username-text">name</p>
            </div>
            <div class="chat-message-view">
                <p class="chat-message-text">Hi, Sweet! So, what do you wanna do today?Sweet! 
                    So, what do you wanna do today?Sweet! So, what do you wanna do today?Sweet! So, what do you wanna do today?Sweet! 
                    So, what do you wanna do today?Sweet! So, what do you wanna do today?Sweet! So, what do you wanna do today?
                </p>
                <p class="username-text">name</p>
            </div>
            <div class="chat-message-view">
                <p class="chat-message-text">Hi, Sweet! So, what do you wanna do today?Sweet! 
                    So, what do you wanna do today?Sweet! So, what do you wanna do today?Sweet! So, what do you wanna do today?Sweet! 
                    So, what do you wanna do today?Sweet! So, what do you wanna do today?Sweet! So, what do you wanna do today?
                </p>
                <p class="username-text">name</p>
            </div>
     
        </div>
        <div class="typed-message-view">
            <input class="typed-message-input"></input><i class="material-icons send-message-btn">&#xe163;</i>


        </div>

    </div>
    </div>
  );
}

export default Chat;
