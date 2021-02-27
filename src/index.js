import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { useHistory, BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-firestore.js"></script>

            <Router>
    <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
