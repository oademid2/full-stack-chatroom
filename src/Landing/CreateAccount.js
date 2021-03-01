import React, { useState} from 'react';

import '../Styles/root-themes.css';

import { Drawer, message} from 'antd';
import CustomInput from './CustomInput'



function CreateRoom(props) {

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [accessCode, setAccessCode] = useState("");



    function set(setter, value){
        setter(value)
    }

    function onCreateAccount(){

    }

    const error = (msg) => {
        message.error(msg);
      };


  return (
    <div>

<Drawer 
        closable={true} 
        onClose={props.onClose}
        title="" 
        footer={null} 
        visible={props.visible}
        getContainer={true}
        style={{ position: 'absolute' }}
        placement="bottom"
        height="700"

        >
          <h1>Create account.</h1>
          
          <CustomInput
                title="Username."
                placeholder="enter username"
                onChange={(event)=>setUsername(event.target.value)}
                value={null}
            />
            <CustomInput
                title="Password."
                placeholder="enter password."
                onChange={(event)=>setPassword(event.target.value)}
                value={null}
            />
            <CustomInput
                title="Number."
                placeholder="enter number."
                onChange={(event)=>setNumber(event.target.value)}
                value={null}
            />
            <CustomInput
                title="Access Code."
                placeholder="access code.."
                onChange={(event)=>setAccessCode(event.target.value)}
                value={null}
            />
            <button 
                className="root-theme-push-top" 
                onClick={onCreateAccount}
            >
              Create account.
            </button>
      </Drawer>


      

 

    </div>

  );
}


export default CreateRoom;
