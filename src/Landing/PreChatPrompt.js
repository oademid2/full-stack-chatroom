import CustomInput from './CustomInput'


function PreChatPrompt(props) {
    console.log(props)
  
    return (
        <div>
            <CustomInput
                title="Enter room code."
                placeholder="placeholder..."
                onChange={(event) => setValue(setRoomCode, event)}
                value={roomCode}
            />
            <CustomInput
                title="Create a username."
                placeholder="placeholder..."
                onChange={(event) => setValue(setUserName, event)}
                value={userName}
            />

            
        </div>

  
    );
  }
  
  