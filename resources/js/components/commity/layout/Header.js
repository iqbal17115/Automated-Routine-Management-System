import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faTimes, faBookmark, faBook, faUniversity, faChalkboardTeacher, faBell, faHome, faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


class Header extends Component {
    constructor(props){
       super(props);
       this.state={
           width: 0
       }
       this.openNavbar=this.openNavbar.bind(this);
       this.closeNavbar=this.closeNavbar.bind(this);
    }

    openNavbar(){
        this.setState({
            width: 350
        });
    }

    closeNavbar(){
        this.setState({
            width: 0
        });
    }
   render(){
    return (
       
        /* Start Nav */
          <>
        <nav className="navbar navbar-expand-sm bg-dark">
        <span style={{'fontSize':'30px', 'cursor':'pointer'}} onClick={ this.openNavbar }>&#9776;</span>
        <a className="navbar-brand ml-2" href="#">
    <img src="../../images/logo.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
  </a>
        
     
          <ul className="navbar-nav ml-auto">
            
          
            <li className="nav-item dropdown dropleft">
              <a className="nav-link dropdown-toggle text-light" href="#" id="login" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                LoggedIn
              </a>
              <div className="dropdown-menu" aria-labelledby="login">
                <a className="dropdown-item" href="#">Logout</a>
                <a className="dropdown-item" href="#">Change Password</a>
              </div>
            </li>

          </ul>
          
       
      </nav>

  <div id="mySidenav" className="sidenav" style={{ width: this.state.width, 'transitionDuration': '.5s' }}>
  
  <a className="closebtn text-right mr-5" style={{'cursor':'pointer'}} onClick={ this.closeNavbar }>&times;</a>
   
  <ul className="list-unstyled">    
  <li>
  <Link className="edit-link" to={'/commity/day/create'}>
  <FontAwesomeIcon icon={faCalendar} /> Manage Day
  </Link>
  </li>

  <li>
  <Link className="edit-link" to={'/commity/time/create'}>
  <FontAwesomeIcon icon={faTimes} /> Manage Time
  </Link>
  </li>

  <li>
  <Link className="edit-link" to={'/commity/type/create'}>
  <FontAwesomeIcon icon={faBookmark} /> Course Type
  </Link>
  </li>

  <li>
  <Link className="edit-link" to={'/commity/coursetype/create'}>
  <FontAwesomeIcon icon={faBook} /> Courses
  </Link>
  </li>

  <li>
  <Link className="edit-link" to={'/commity/room/create'}>
  <FontAwesomeIcon icon={faHome} /> Rooms
  </Link>
  </li>

  <li>
  <Link className="edit-link" to={'/commity/allslot/create'}>
  <FontAwesomeIcon icon={faBell} /> All Slot
  </Link>
  </li>

  <li>
  <Link className="edit-link" to={'/commity/teacher/create'}>
  <FontAwesomeIcon icon={faChalkboardTeacher} /> Teacher
  </Link>
  </li>

  <li>
  <Link className="edit-link" to={'/commity/courseOffer/createCSV'}>
  <FontAwesomeIcon icon={faPaperPlane} /> Course Offer
  </Link>
  </li>

  <li>
  <Link className="edit-link" to={'/commity/show/routine'}>
  <FontAwesomeIcon icon={faPaperPlane} /> Routine
  </Link>
  </li>

  
    </ul>
</div>


      </>
        /* End Nav */


    
    );
   }
}

export default Header;

