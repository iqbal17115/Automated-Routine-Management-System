import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import AlertSuccess1 from './AlertSuccess1';
import AlertError from './AlertError';
import Loading from './Loading';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

class Room extends Component{
  
    constructor(props){

        super(props);
        
        this.state={
          
          type: '',
          room: '',
          types: [],
          rooms: [],
          coursetypes: [],
          total: '',
          message: '',
          loading: true
          
        }
       
        this.handleChangeType=this.handleChangeType.bind(this);
        this.handleChangeRoom=this.handleChangeRoom.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
       
      
      }
      
      handleChangeRoom(event){
        this.setState({
          room: event.target.value
        });
      }

      handleChangeType(event){
        this.setState({
          type: event.target.value
        });
      }

      handleFormSubmit(event){

        this.setState({
          loading: true
        })

       

        event.preventDefault();
        axios.post('/api/commity/schedule/create',{

           type: this.state.type,
           room: this.state.room

        }).then(response=>{
          this.setState({

            type: '',
            room: '',
            total: response.data.total,
            rooms: response.data.rooms,
            message: 'success',
            loading: false

          })
          
        }).catch(err=>{
          this.setState({
            message:'error'
          })
        });
        
        Axios.get('/api/commity/schedule/get')
        .then(response=>{
            this.setState({
                types : response.data
            })
        }).catch(err=>console.log(err));
        
      }
      
      componentWillMount(){
        this.setState({
          loading:true
        })

        Axios.get('/api/commity/schedule/get')
        .then(response=>{
            this.setState({
                types : response.data
            })
            this.props.history.push('/commity/room/create');
        }).catch(err=>console.log(err));

        Axios.get('/api/commity/room/get')
        .then(response=>{
            this.setState({
              rooms : response.data,
              loading: false
            })
        }).catch(err=>console.log(err));
        
      }
      
      // componentDidMount(){
      //   this.setState({
      //     message: ''
      //   })
      // }
    render(){
        let count=1;
    return (
      <>
        <div className="wrapper">
          <div className="container">

              { this.state.message=="success"? <AlertSuccess1 total={ this.state.total }/> : '' }
              { this.state.message=="error"? <AlertError/> : '' }
             
               <div className="row">
                 <div className="col-md-3"></div>
                 <div className="col-md-6 mt-5 bg-light p-3" style={{ 'boxShadow': '0 0 5px #999' }}>
                 <form onSubmit={ this.handleFormSubmit }>
                   <div className="row">
                     <div className="col-md-12">
                     
                        <select className="form-control" id="coursetype" name="coursetype" onChange={ this.handleChangeType } required>
                        <option value="">--Select Room Type--</option>
                         {
                              
                              this.state.types !== null
                              ?
                              this.state.types.map(type=>(
                             

                              <option value={ type.type } key={type.id}>{ type.type }</option>
                              
                             
                           ))
                           : null
                          }

                        </select>     

                     </div>
                     
                     <div className="col-md-12 mt-2">
                       <input className="form-control" name="room" id="room" placeholder="Room" value={ this.state.room } onChange={ this.handleChangeRoom } required/>
                     </div>

                     <div className="col-md-3"></div>
                     <div className="col-md-6 mt-2">
                         <button className="btn btn-primary btn-block">Add</button>
                     </div>
                     <div className="col-md-3"></div>
                   </div>
                   <div className="text-center">
                   <Link to={'/commity/room/createCSV'}>
                    <p className="text-info font-weight-bold underline"><FontAwesomeIcon icon={faFileCsv} className="" /> Import CSV</p>
                     </Link>
                   </div>
                 </form>
                 </div>
                 <div className="col-md-3"></div>
               </div>
                
          </div>

          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 mt-5">
            
              {
                this.state.loading?
                <Loading/>
                :
                null
              }

            <table className="table table-bordered table-hover table-dark" style={{ backgroundColor: '#0b2729' }}>
            
  <thead>
  <tr>
      <td colspan="3" className="text-center" style={{ background: 'linear-gradient(45deg,#00897B,#0081bf)' }}>Available Rooms</td>
      </tr>
    <tr>
 
      <th scope="col">#</th>
      <th scope="col">Room</th>
      <th scope="col">Room Type</th>
     
    </tr>
  </thead>
  <tbody>
    
                            {
                              
                                this.state.rooms !== null
                                ?
                                this.state.rooms.map(room=>(
                                <tr key={room.id}>

                                <td>{ count++ }</td>
                                <td>{ room.room }</td>
                                <td>{ room.type }</td>
                                
                                </tr>
                             ))
                             : null
                            }
    
  </tbody>
</table>

            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </>
    );
    }

}

export default Room;

