import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import AlertSuccess1 from './AlertSuccess1';
import AlertError from './AlertError';
import Loading from './Loading';
import Axios from 'axios';
class Day extends Component{
  
    constructor(props){

        super(props);
        
        this.state={
          days: [],
          name: '',
          start_time: '',
          end_time: '',
          total: '',
          message: '',
          loading: true
        }
       
        this.handleChangeDay=this.handleChangeDay.bind(this);
        this.handleChangeStartTime=this.handleChangeStartTime.bind(this);
        this.handleChangeEndTime=this.handleChangeEndTime.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);

        Axios.get('/api/commity/day/create')
        .then(response=>{
            this.setState({
                days : response.data
            })
            this.props.history.push('/commity/day/create');
        }).catch(err=>console.log(err));
      }
      
      handleChangeDay(event){
        this.setState({
          name: event.target.value
        });
      }

      handleChangeStartTime(event){
        this.setState({
          start_time: event.target.value
        });
      }

      handleChangeEndTime(event){
        this.setState({
          end_time: event.target.value
        });
      }

      handleFormSubmit(event){
        this.setState({
          loading: true
        })
        event.preventDefault();
        axios.post('/api/commity/day/create',{
           name: this.state.name,
           start_time: this.state.start_time,
           end_time: this.state.end_time
        }).then(response=>{
          this.setState({
            name: '',
            start_time: '',
            end_time: '',
            total: response.data.total,
            days: response.data.days,
            loading: false,
            message: 'success'
          })
          
        }).catch(err=>{
          this.setState({
            message: 'error'
          })
        });
        
      }

      componentWillMount(){
        this.setState({
          loading: true
        })

        Axios.get('/api/commity/day/create')
        .then(response=>{
            this.setState({
                days : response.data,
                loading:false
            })
        }).catch(err=>console.log(err));
      }
      
    render(){
    return (
      <>
        <div className="wrapper">
          <div className="container">
              <hr/>
              { this.state.message=="success"? <AlertSuccess1 total={ this.state.total } /> : '' }
              { this.state.message=="error"? <AlertError/> : '' }

               <div className="row">
                 <div className="col-md-3"></div>
                 <div className="col-md-6 mt-5 bg-light p-3" style={{ 'boxShadow': '0 0 5px #999' }}>
                 <form onSubmit={ this.handleFormSubmit }>
                   <div className="row">
                     <div className="col-md-12">
                       <select name="name" id="name" className="form-control" value={ this.state.name } onChange={ this.handleChangeDay } required>

                         <option value="">--Select Day--</option>
                         <option value="Saturday">Saturday</option>
                         <option value="Sunday">Sunday</option>
                         <option value="Monday">Monday</option>
                         <option value="Tuesday">Tuesday</option>
                         <option value="Wednesday">Wednesday</option>
                         <option value="Thursday">Thursday</option>
                         <option value="Friday">Friday</option>

                       </select>
                      
                     </div>

                     <div className="col-md-6 mt-2">
                       <div className="form-group">
                         <label id="start_time">Start Time</label>  
                         <input type="time" className="form-control" name="start_time" id="start_time" value={ this.state.start_time } onChange={ this.handleChangeStartTime } required/>  
                       </div>
                     </div>

                     <div className="col-md-6  mt-2">
                       <div className="form-group">
                         <label id="start_time">End Time</label>  
                         <input type="time" className="form-control" name="end_time" id="end_time" value={ this.state.end_time } onChange={ this.handleChangeEndTime } required/>  
                       </div>
                     </div>
                     
                     <div className="col-md-3"></div>
                     <div className="col-md-6">
                         <button className="btn btn-primary btn-block">Add</button>
                     </div>
                     <div className="col-md-3"></div>
                   </div>
                 </form>
                 </div>
                 <div className="col-md-3"></div>
               </div>
                
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 mt-5">
            
            {
                this.state.loading?
                <Loading/>
                :
                null
            }

            <table className="table table-bordered table-hover table-dark" style={{ backgroundColor: '#0b2729' }}>
            
  <thead>
  <tr>
      <td colspan="3" className="text-center" style={{ background: 'linear-gradient(45deg,#00897B,#0081bf)' }}>Allocated Days</td>
      </tr>
    <tr>
     
      <th scope="col">Day</th>
      <th scope="col">Start</th>
      <th scope="col">End</th>
    </tr>
  </thead>
  <tbody>
    
                            {
                              
                                this.state.days !== null
                                ?
                                this.state.days.map(day=>(
                                <tr key={day.id}>
                                <td>{ day.name }</td>
                                <td>{ day.start_time }</td>
                                <td>{ day.end_time }</td>
                                </tr>
                             ))
                             : null
                            }
    
  </tbody>
</table>

            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </>
    );
    }
}

export default Day;

