import './App.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

import Chat from './Chatroom/Chat'
import Landing from './Landing/Landing'


function App() {
  let history = useHistory();
  return (
    <div className="App">
        <p class="app-title">
          chatable.io 💬
        </p>
        <div class="app-body">
        <Router>
          <Switch>
            <Route history={history} path='/chat' component={Chat}></Route>
            <Route history={history}  path='/' component={Landing}></Route>
        </Switch>
       </Router>

        </div>

      
    </div>
  );
}

export default App;
