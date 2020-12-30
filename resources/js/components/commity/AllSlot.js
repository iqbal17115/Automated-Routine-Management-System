import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import Loading from './Loading';
import Axios from 'axios';
class AllSlot extends Component{
  
    constructor(props){

        super(props);
        
        this.state={
          schedules: [],
          levelTerms: [],
          search: '',
          loading: true
        }
       
        this.handleChangeLevelTerm=this.handleChangeLevelTerm.bind(this);
      }
      
      handleChangeLevelTerm=event=>{
     
        Axios.post('/api/commity/search/get',{
           search: event.target.value
        })
        .then(response=>{
            this.setState({
              schedules : response.data,
            })
        }).catch(err=>console.log(err));

      }

      handleChangeSearch(event){

        this.setState({
          search: event.target.value
        });


      }
    componentWillMount(){
      this.setState({
        loading: true
      })
      Axios.get('/api/commity/schedule/create')
      .then(response=>{
          this.setState({
              schedules : response.data,
              loading: false
          })
          this.props.history.push('/commity/allslot/create');
      }).catch(err=>console.log(err));
     
      Axios.get('/api/commity/levelTerm/get')
        .then(response=>{
            this.setState({
              levelTerms : response.data,
            })
        }).catch(err=>console.log(err));

    }
    render(){
      let count=1;
    return (
      <>
        <div className="wrapper">
          <div className="container">
            
          {
                this.state.loading?
                <Loading/>
                :
                null
            }

            <table className="table table-bordered table-hover table-dark mt-3" style={{ backgroundColor: '#0b2729' }}>
            
  <thead>
  <tr>
      <td colspan="7" className="text-center" style={{ background: 'linear-gradient(45deg,#00897B,#0081bf)' }}>All Slot</td>
      </tr>
  
      <tr>
               <td colSpan="4">{ this.state.search }</td>
               
                <td colSpan="3" className="">
                  
                <select className="form-control" onChange={ this.handleChangeLevelTerm } required>
                           
                        <option value="1">-- Select Level Term --</option>
                        <option value="2">-- Empty Room --</option>

                         {
                              
                              this.state.levelTerms !== null
                              ?
                              this.state.levelTerms.map(levelTerm=>(
                             

                              <option value={ levelTerm.level_term } key={levelTerm.level_term}>{ levelTerm.level_term }</option>
                              
                             
                           ))
                           : null
                          }

                        </select>    

                </td>
              </tr>

    <tr>
      <th scope="col">#</th>
      <th scope="col">Day</th>
      <th scope="col">Room</th>
      <th scope="col">Time</th>
      <th scope="col">Course</th>
      <th scope="col">Teacher</th>
      <th scope="col">Action</th>
     
    </tr>
  </thead>
  <tbody>
    
                          {
                              
                              this.state.schedules !== null
                              ?
                              this.state.schedules.map(schedule=>(
                                
                              <tr key={schedule.id}>

                              <td>{ count++ }</td>
                              <td>{ schedule.day }</td>
                              <td>{ schedule.room }</td>
                              <td>{ schedule.start_time }-{ schedule.end_time }</td>
                              <td>{ schedule.course }</td>
                              <td>{ schedule.teacher }</td>
                              <td><a className="btn btn-secondary btn-sm" href={`/commity/edit/routine/${schedule.id}`}>Edit</a></td>
                            
                              </tr>
                            
                             
                              
                           ))
                           : null
                          }

  </tbody>
</table>

          </div>
        </div>
      </>
    );
    }
}

export default AllSlot;

