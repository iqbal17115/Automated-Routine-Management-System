import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import Axios from 'axios';
class AlertError extends Component{
  
    render(){
        return(
            <div className="alert alert-warning font-weight-bold" role="alert">
                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
              Something went wrong!!
            </div>
        )
    }
}

export default AlertError;

