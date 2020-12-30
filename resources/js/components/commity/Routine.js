import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import Loading from './Loading';
import Axios from 'axios';
let ch;
class Routine extends Component{
    
    constructor(props){

        super(props);
        
        this.state={
          type: '',
          selectedFile: null,
          types: [],
          schedules: [],
          levelTerms: [],
          courses: [],
          sections: [],
          teachers: [],
          search: '',
          invalidOperation: '',
          editId: '',
          editLevelTerm: '',
          editCourse: '',
          editSection: '',
          editTeacher: '',
          selected: '',
          loading: true,
          message: ''
        }
       
        this.handleChangeTerm=this.handleChangeTerm.bind(this);
        this.handleChangeCourse=this.handleChangeCourse.bind(this);
        this.handleChangeTeacher=this.handleChangeTeacher.bind(this);
        this.handleChangeSection=this.handleChangeSection.bind(this);
        this.handleChangeLevelTerm=this.handleChangeLevelTerm.bind(this);
        
      }
      
      handleChangeTerm(event){
        this.setState({
          editLevelTerm: event.target.value
        })
      }

      handleChangeCourse(event){
        this.setState({
          editCourse: event.target.value
        })
      }
      
      
      handleChangeTeacher(event){
        this.setState({
          editTeacher: event.target.value
        })
      }

      handleChangeSection(event){
        this.setState({
          editSection: event.target.value
        })
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
      
      componentWillMount(){

        Axios.get('/api/commity/courseOffer/get')
        .then(response=>{
            this.setState({
              schedules : response.data,
              loading: false,
            })
        }).catch(err=>console.log(err));

        Axios.get('/api/commity/levelTerm/get')
        .then(response=>{
            this.setState({
              levelTerms : response.data,
            })
        }).catch(err=>console.log(err));

        Axios.get('/api/commity/course/get')
        .then(response=>{
            this.setState({
              courses : response.data,
            })
        }).catch(err=>console.log(err));

        Axios.get('/api/commity/section/get')
        .then(response=>{
            this.setState({
              sections : response.data,
            })
        }).catch(err=>console.log(err));

        Axios.get('/api/commity/teacher/get')
        .then(response=>{
            this.setState({
              teachers : response.data,
            })
        }).catch(err=>console.log(err));

      }
    render(){
      
        let count=1;
    return (
      <>
        <div className="wrapper">
          <div className="container">

               {/* Start table */}

                <div className="row">
                  
                  <div className="col-md-12 mt-2">
            

              {
                this.state.loading ?
                 <Loading/>
                 :
                 null
              }

                  <table className="table table-bordered table-hover table-dark" style={{ backgroundColor: '#0b2729' }}>
                 
  <thead>
  <tr>
      <td colSpan="10" className="text-center" style={{ background: 'linear-gradient(45deg,#00897B,#0081bf)' }}>Routine</td>
      </tr>
    <tr>
               <td colSpan="7">{ this.state.search }</td>
               
                <td colSpan="3" className="">
                  
                <select className="form-control" onChange={ this.handleChangeLevelTerm } required>
                           
                        <option value="0">-- Select Level Term --</option>

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
      <th scope="col">Start Time</th>
      <th scope="col">End Time</th>
      <th scope="col">Course</th>
      <th scope="col">Teacher</th>
      <th scope="col">Level Term</th>
      <th scope="col">Section</th>
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
                                <td>{ schedule.start_time }</td>
                                <td>{ schedule.end_time }</td>
                                <td>{ schedule.course }</td>
                                <td>{ schedule.teacher }</td>
                                <td>{ schedule.level_term }</td>
                                <td>{ schedule.section }</td>
                                <td><a className="btn btn-secondary btn-sm" href={`/commity/edit/routine/${schedule.id}`}>Edit</a></td>
                                
                                </tr>
                             ))
                             : null
                            }
    
  </tbody>
</table>

                  </div>
                  
                </div>

               {/* End table */}

               {/* Start Modal */}
               {/* {
      this.state.schedules.map(schedule=>(
<div key={schedule.id} className="modal fade" id={`exampleModalLong${schedule.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Edit Routine { this.state.editLevelTerm }</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form onSubmit={ this.handleFormSubmit }>
        <div className="row">
          <div className="col-md-6">
          <select className="form-control" onChange={ this.handleChangeTerm } required>
                          
                            {
                                 
                                 this.state.levelTerms !== null
                                 ?
                                 this.state.levelTerms.map(levelTerm=>(
                                
                                 
                                 <option value={ levelTerm.level_term } key={levelTerm.level_term} selectoption={ levelTerm.level_term==schedule.level_term ? "selected": "" } >{ levelTerm.level_term }</option>
                                 
                                
                              ))
                              : null
                             }
                           
                           </select>   
          </div>
          <div className="col-md-6">
          <select className="form-control" onChange={ this.handleChangeCourse } required>
                           
                           {
                                
                                this.state.courses !== null
                                ?
                                this.state.courses.map(course=>(
                               
                                
                                <option value={ course.course } key={course.course} selectoption1={course.course==schedule.course ? "selected": ''} >{ course.course }</option>
                                
                               
                             ))
                             : null
                            }
  
                          </select> 
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
          <select className="form-control" onChange={ this.handleChangeCourse } required>
                           
                           {
                                
                                this.state.sections !== null
                                ?
                                this.state.sections.map(section=>(
                               
                                
                                <option value={ section.section } key={section.section} selectoption1={section.section==schedule.section ? "selected": ''} >{ section.section }</option>
                                
                               
                             ))
                             : null
                            }
  
                          </select>
          </div>
          <div className="col-md-6">
          <select className="form-control" onChange={ this.handleChangeCourse } required>
                           
                           {
                                
                                this.state.teachers !== null
                                ?
                                this.state.teachers.map(teacher=>(
                               
                                
                                <option value={ teacher.teacher } key={teacher.teacher} selectoption1={teacher.teacher==schedule.teacher ? "selected": ''} >{ teacher.teacher }</option>
                                
                               
                             ))
                             : null
                            }
  
                          </select>
          </div>
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
      ))
    } */}
               {/* End Modal */}
                
          </div>

        
        </div>
      </>
    );
    }
}

export default Routine;

