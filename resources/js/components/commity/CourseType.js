import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import AlertSuccess1 from './AlertSuccess1';
import AlertError from './AlertError';
import Loading from './Loading';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

class CourseType extends Component{
  
    constructor(props){

        super(props);
        
        this.state={
          
          type: '',
          coursecode: '',
          coursetitle: '',
          credit: '',
          types: [],
          coursetypes: [],
          total: '',
          message: '',
          loading: true          
        }
       
        this.handleChangeType=this.handleChangeType.bind(this);
        this.handleChangeCourseCode=this.handleChangeCourseCode.bind(this);
        this.handleChangeCourseTitle=this.handleChangeCourseTitle.bind(this);
        this.handleChangeCourseCredit=this.handleChangeCourseCredit.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        
        Axios.get('/api/commity/coursetype/get')
        .then(response=>{
            this.setState({
                types : response.data
            })
        }).catch(err=>console.log(err));

        Axios.get('/api/commity/coursetype/create')
        .then(response=>{
            this.setState({
              coursetypes : response.data,
              loading: false
            })
        }).catch(err=>console.log(err));

      
      }
      
      handleChangeCourseCode(event){
        this.setState({
          coursecode: event.target.value
        });
      }

      handleChangeCourseTitle(event){
        this.setState({
          coursetitle: event.target.value
        });
      }

      handleChangeCourseCredit(event){
        this.setState({
          credit: event.target.value
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
        axios.post('/api/commity/coursetype/create',{
           type: this.state.type,
           coursecode: this.state.coursecode,
           coursetitle: this.state.coursetitle,
           credit: this.state.credit
        }).then(response=>{
          this.setState({
            type: '',
            coursecode: '',
            coursetitle: '',
            credit: '',
            loading: false,
            total: response.data.total,
            coursetypes: response.data.coursetypes,
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
                     <div className="col-md-6">
                     
                        <select className="form-control" id="coursetype" name="coursetype" onChange={ this.handleChangeType } required>
                          <option value="">--Select Course Type--</option>
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
                    
                     <div className="col-md-6">
                       <input type="text" className="form-control" name="coursecode" id="coursecode" placeholder="Course Code" value={ this.state.coursecode } onChange={ this.handleChangeCourseCode } required/>
                     </div>
                     
                     </div>
                     
                     <div className="row mt-2">
                     <div className="col-md-12">
                       <input type="text" className="form-control" name="coursetitle" id="coursetitle" placeholder="Course Title" value={ this.state.coursetitle } onChange={ this.handleChangeCourseTitle } required/>
                     </div>
                     </div>

                     <div className="row mt-2">
                     <div className="col-md-12">
                       <input type="number" className="form-control" name="credit" id="credit" placeholder="Credit" value={ this.state.credit } onChange={ this.handleChangeCourseCredit } required/>
                     </div>
                     </div>

                     <div className="row">

                     <div className="col-md-3"></div> 
                     <div className="col-md-6 mt-2">
                         <button className="btn btn-primary btn-block">Add</button>
                     </div>
                     <div className="col-md-3"></div>

                     
                   </div>
                   
                   <div className="text-center">
                   <Link to={'/commity/coursetype/createCSV'}>
                        <p className="text-info font-weight-bold underline"><FontAwesomeIcon icon={faFileCsv}/> Import CSV</p>
                     </Link>
                   </div>

                 </form>
                 </div>
                 <div className="col-md-3"></div>
               </div>
                
          </div>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-9 mt-5">
            <div>
              {
                this.state.loading ?
                 <Loading/>
                 :
                 null
              }
            </div>
            <table className="table table-bordered table-hover table-dark" style={{ backgroundColor: '#0b2729' }}>
            
  <thead>
  <tr>
      <td colspan="5" className="text-center" style={{ background: 'linear-gradient(45deg,#00897B,#0081bf)' }}>Course Types</td>
      </tr>
    <tr>
     
      <th scope="col">#</th>
      <th scope="col">Course Code</th>
      <th scope="col">Course Title</th>
      <th scope="col">Course Credit</th>
      <th scope="col">Course Type</th>
     
    </tr>
  </thead>
  <tbody>
    
                            {
                              
                                this.state.coursetypes !== null
                                ?
                                this.state.coursetypes.map(type=>(
                                <tr key={type.id}>

                                <td>{ count++ }</td>
                                <td>{ type.course_code }</td>
                                <td>{ type.course_title }</td>
                                <td>{ type.credit }</td>
                                <td>{ type.type }</td>
                                
                                </tr>
                             ))
                             : null
                            }
    
  </tbody>
</table>

            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </>
    );
    }
}

export default CourseType;

