import './App.css';
import { useHistory, BrowserRouter as Route, Switch} from 'react-router-dom';

import ChatRoom from './Chatroom/ChatRoom'
import Landing from './Landing/Landing'


function App(props) {

  let history = useHistory();

  let data ={
    user: null,
    room:null,
    state: {},
  }
  
  return (
  <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css"></link>
        
      <p class="app-title">chatable.io </p>
      <div className="app-body">
        
        <Switch>
          <Route  path='/chat' component={()=><ChatRoom  data={data}   history={history}  /> }></Route>
          <Route  path='/' component={()=><Landing   data={data}  history={history}  />} ></Route>
      </Switch>
      </div>

  </div>


      

  );
}

export default App;
