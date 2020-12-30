import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import Axios from 'axios';
class AlertDeleteError extends Component{
  
    render(){
        return(
            <div className="alert alert-warning text-center" role="alert">
                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Alert!!</strong> This schedule is not added to the routine! 
            </div>
        )
    }
}

export default AlertDeleteError;

