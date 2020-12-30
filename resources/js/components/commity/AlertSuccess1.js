import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import Axios from 'axios';
class AlertSuccess1 extends Component{
  
    render(){
        return(
            <div className="alert alert-success text-center" role="alert">
                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Success!!</strong> Data has been added. 
                <div><span className="badge badge-warning">Total: { this.props.total }</span></div>
            </div>
        )
    }
}

export default AlertSuccess1;

