
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

  function numOfReaction(emoji){

      /*let new_ = reactions
      if(new_[emoji])setReactions(new_[emoji]++)
      else setReactions(new_[emoji] = 1)
      console.log(new_[emoji])
      
      props.message.reactions = new_;
      setReactions(new_)*/
      let reaction = props.reactions[emoji];
      if(reaction)return ++reaction
      else return 1

  }

  return (
      
   
    <div className={"chat-message-view "+ (props.isUser?"user":" ")}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <div className="message-text-view">
                <p class="username-text">{props.userName}</p> 

                <span class={"username-text reaction-bar" + (props.isUser?"user":" ")}>
                { Object.keys(props.reactions).map((emoji)=>{
                 
                 let code = ""
                 if(emoji[0] != '&')code = String.fromCodePoint(emoji)
                 else code = String.fromCodePoint.apply(String, readEmoji(emoji))
                 return(
                      <span class={"reaction-tracking"} key={emoji}>
                        <span class={"reaction-emoji"}>{props.reactions[emoji] > 1? props.reactions[emoji]: ""}</span>
                      <span class={"reaction-count"} >{code}</span>
                     </span>
                 )
                }
                )}
                </span>
         
               
       
       
          
        <p onClick={props.onClick} className={"chat-message-text "+ (props.isUser?"user":" ")}>
            {props.text}
        </p>

        </div>


    <div className="message-options-view">
    <span onClick={onToggleReactions} className="show show-emojis-btn"><FaGrin/></span>

      <div class={"reaction-options "+ (showReactions?"show":"hide")}>
               {   reactionOptions.map(
                     emoji =>{
                      let code = ""
                      if(emoji[0] != '&')code = String.fromCodePoint(emoji)
                      else code = String.fromCodePoint.apply(String, readEmoji(emoji))
                      return(
                        <span key={emoji} onClick={()=>props.onAddReaction(emoji)} className="reaction-option">{
                          code
                          }
                          </span>
                          
                      )
                   
                    }
               )}
            </div>

            <span  onClick={()=>props.onReportMessage(props.message)} className="show show-emojis-btn report-user-button">  <FaExclamationCircle/></span>

      </div>

    </div>
    );
}

export default ChatMessage;
