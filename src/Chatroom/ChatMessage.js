
import './ChatMessage.css';


function ChatMessage(props) {

 let class_ ="chat-message-view " + props.isUser?"user":" ";
  return (
   
    <div className={"chat-message-view user "}>
        <p className={"chat-message-text user "}>
            {props.text}
        </p>
        <p class="username-text">{props.userName}</p>
    </div>
    );
}

export default ChatMessage;
