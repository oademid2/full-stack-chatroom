import './App.css';
import { useHistory, BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import ChatRoom from './Chatroom/ChatRoom'
import Landing from './Landing/Landing'

import * as util from './util'


function App() {
  let history = useHistory();
  
  return (
    <div className="App">
        <p class="app-title">
          chatable.io 💬
        </p>
        <div class="app-body">

          <Switch>
            <Route  path='/chat' component={()=><ChatRoom util={util} history={history}  /> }></Route>
            <Route  path='/' component={()=><Landing util={util} history={history}  />} ></Route>
        </Switch>


        </div>

      
    </div>
  );
}

export default App;
