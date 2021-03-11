
import './ChatMessage.css';
import { FaGrin, FaExclamationCircle } from "react-icons/fa";
import{ useState} from 'react';



function ChatMessage(props) {

  const [showReactions, setShowReactions] = useState(false)
  const [reactions, setReactions] = useState(props.reactions)
  let reactionOptions = ['0x1F602', '&0x2764&0xFE0F', '0x2757']

  function onToggleReactions(){
    setShowReactions(!showReactions)
  }

  function readEmoji(emoji){
    if(emoji[0] != '&')return emoji
    let pair = emoji.substring(1).split('&');
    console.log(pair)
    return pair


  }


  return (
      
   
    <div className={"chat-message-view "+ (props.isUser?"user":" ")}>



            <div className="chat-message-text-view">

              <div className="header">
                <p class="username-text"  onClick={props.onClick}>{props.userName}</p> 
                {!props.isUser?<FaGrin  className="show-reaction-button" onClick={onToggleReactions} ></FaGrin>:null}

                <div class={"reaction-options "+ (showReactions?"cshow":"chide")}>
                    {   reactionOptions.map(
                          emoji =>{
                            let code = ""
                            if(emoji[0] != '&')code = String.fromCodePoint(emoji)
                            else code = String.fromCodePoint.apply(String, readEmoji(emoji))
                            return(
                              <span key={emoji} onClick={()=>{props.onAddReaction(emoji); onToggleReactions()}} className="option">{
                                code
                                }
                                </span>
                                
                            )
                        
                          }
                    )}
                  </div>



                <div class={"username-text reaction-bar "}>
                  { Object.keys(props.reactions).map((emoji)=>{
              
                      let code = ""
                      if(emoji[0] != '&')code = String.fromCodePoint(emoji)
                      else code = String.fromCodePoint.apply(String, readEmoji(emoji))
                      return(
                            <span class={"reaction-tracking"} key={emoji}>
                              <span class={"reaction-emoji"}>{props.reactions[emoji] > 0? props.reactions[emoji]: ""}</span>
                            <span class={"reaction-count"} >{code}</span>
                          </span>
                      )
                    })
                  }
              </div>
  
      
              </div>
                 
              <p className={"chat-message-text "+ (props.isUser?"user":" ")}>
                  {props.text}
              </p>
  
        </div>

        
        
      





    </div>
    );
}

export default ChatMessage;
