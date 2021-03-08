import { Redirect, BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import React from 'react';
import {connect} from 'redux'




function Counter(props) {
  

function increment(){

}
function decrement(){
    
}


  return (
    <div>


 

    </div>

  );
}

const mapStateToProps = state => ({
    count: state.count

});

export default connect()(Counter);
