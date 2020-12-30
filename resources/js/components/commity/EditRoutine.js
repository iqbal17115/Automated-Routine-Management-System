import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import AlertSuccess1 from './AlertSuccess1';
import AlertError from './AlertError';
import Loading from './Loading';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

class EditRoutine extends Component{
  
    constructor(props){

        super(props);
        
        this.state={
          
          level_term: '',
          course: '',
          teacher: '',
          section: '',
          editId: '',
          levelTerms: [],
          courses: [],
          teachers: [],
          sections: [],
          loading: true    

        }
       
        this.handleChangeTerm=this.handleChangeTerm.bind(this);
        this.handleChangeCourse=this.handleChangeCourse.bind(this);
        this.handleChangeTeacher=this.handleChangeTeacher.bind(this);
        this.handleChangeSection=this.handleChangeSection.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        
        const id=this.props.match.params.id;

        Axios.get(`/api/commity/edit/routine/${id}`)
        .then(response=>{
            this.setState({
                level_term : response.data.level_term,
                course : response.data.course,
                teacher : response.data.teacher,
                section : response.data.section,
                editId : response.data.editId
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

        Axios.get('/api/commity/teacher/get')
        .then(response=>{
            this.setState({
              teachers : response.data,
            })
        }).catch(err=>console.log(err));

        Axios.get('/api/commity/section/get')
        .then(response=>{
            this.setState({
              sections : response.data,
            })
        }).catch(err=>console.log(err));

      }
      
    
      handleChangeTerm(event){
          this.setState({
              level_term: event.target.value
          })
      }

      handleChangeCourse(event){
        this.setState({
            course: event.target.value
        })
      }

      handleChangeTeacher(event){
        this.setState({
            teacher: event.target.value
        })
      }

      handleChangeSection(event){
        this.setState({
            section: event.target.value
        })
      }
    
      handleFormSubmit(event){
        this.setState({
          loading: true
        })
        event.preventDefault();
        axios.post('/api/commity/edit/routine',{

           level_term: this.state.level_term,
           course: this.state.course,
           teacher: this.state.teacher,
           section: this.state.section,
           editId: this.state.editId

        }).then(response=>{
          this.setState({

            level_term: this.state.level_term,
            course: this.state.course,
            teacher: this.state.teacher,
            section: this.state.section,
            editId: this.state.editId,
           message: 'success'

          })
        }).catch(err=>{
          this.setState({
            message:'error'
          })
        });
        
        Axios.get('/api/commity/coursetype/get')
        .then(response=>{
            this.setState({
                types : response.data
            })
            
        }).catch(err=>console.log(err));
      }
      
    render(){
        let count=1;
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
                     
                        <select className="form-control" id="level_term" name="level_term" onChange={ this.handleChangeTerm } required>
                         
                         {
                              
                              this.state.levelTerms !== null
                              ?
                              this.state.levelTerms.map(levelTerm=>(
                             

                              <option value={ levelTerm.level_term } key={levelTerm.level_term} selected={ this.state.level_term==levelTerm.level_term? "selected": "" }>{ levelTerm.level_term }</option>
                              
                             
                           ))
                           : null
                          }

                        </select>     

                     </div>
                    
                    
                     
                     </div>
                    
                    <div className="row mt-2">
                      <div className="col-md-12">
                      
                      <select className="form-control" id="course" name="course" onChange={ this.handleChangeCourse } required>
                         
                         {
                              
                              this.state.courses !== null
                              ?
                              this.state.courses.map(course=>(
                             

                              <option value={ course.level_term } key={course.course} selected={ this.state.course==course.course? "selected": "" }>{ course.course }</option>
                              
                             
                           ))
                           : null
                          }

                        </select>   

                      </div>
                    </div>
            
                     
                     <div className="row mt-2">
                     <div className="col-md-12">
                     <select className="form-control" id="teacher" name="teacher" onChange={ this.handleChangeTeacher } required>
                         
                         {
                              
                              this.state.teachers !== null
                              ?
                              this.state.teachers.map(teacher=>(
                             

                              <option value={ teacher.teacher } key={teacher.teacher} selected={ this.state.teacher==teacher.teacher? "selected": "" }>{ teacher.teacher }</option>
                              
                             
                           ))
                           : null
                          }

                        </select>   
                     </div>
                     </div>

                     <div className="row mt-2">
                     <div className="col-md-12">
                     <select className="form-control" id="section" name="section" onChange={ this.handleChangeSection } required>
                          
                         {
                              
                              this.state.sections !== null
                              ?
                              this.state.sections.map(section=>(
                             

                              <option value={ section.section } key={section.section} selected={ this.state.section==section.section? "selected": "" }>{ section.section }</option>
                              
                             
                           ))
                           : null
                          }

                        </select>   
                     </div>
                     </div>

                     <div className="row">

                     <div className="col-md-3"></div> 
                     <div className="col-md-6 mt-2">
                         <button className="btn btn-primary btn-block">Update</button>
                     </div>
                     <div className="col-md-3"></div>

                     
                   </div>
                   
                  

                 </form>
                 </div>
                 <div className="col-md-3"></div>
               </div>
                
          </div>
        </div>
      </>
    );
    }
}

export default EditRoutine;

