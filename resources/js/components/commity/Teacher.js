import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import AlertSuccess1 from './AlertSuccess1';
import AlertError from './AlertError';
import Loading from './Loading';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

class Teacher extends Component{
  
    constructor(props){

        super(props);
        
        this.state={
          name: '',
          designation: '',
          email: '',
          phone: '',
          initial: '',
          employee_id: '',
          teachers: [],
          total: '',
          message: '',
          days: [],
          selectDay: '',
          loading: true
          
        }
       
        this.handleChangeName=this.handleChangeName.bind(this);
        this.handleChangeDesignation=this.handleChangeDesignation.bind(this);
        this.handleChangeEmail=this.handleChangeEmail.bind(this);
        this.handleChangePhone=this.handleChangePhone.bind(this);
        this.handleChangeInitial=this.handleChangeInitial.bind(this);
        this.handleChangeEmployeeId=this.handleChangeEmployeeId.bind(this);
        this.handleChangeDay=this.handleChangeDay.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
       
        Axios.get('/api/commity/teacher/getDay')
        .then(response=>{
            this.setState({
                days : response.data
            })
        }).catch(err=>console.log(err));

      }
      
      handleChangeName(event){
        this.setState({
          name: event.target.value
        });
      }

      handleChangeDesignation(event){
        this.setState({
          designation: event.target.value
        });
      }

      handleChangeEmail(event){
        this.setState({
          email: event.target.value
        });
      }

      handleChangePhone(event){
        this.setState({
          phone: event.target.value
        });
      }

      handleChangeInitial(event){
        this.setState({
          initial: event.target.value
        });
      }

      handleChangeEmployeeId(event){
        this.setState({
          employee_id: event.target.value
        });
      }

      handleChangeDay(event){
        this.setState({
          selectDay: event.target.value
        });
      }

    

      handleFormSubmit(event){
        this.setState({
          loading: true
        })
        event.preventDefault();
        axios.post('/api/commity/teacher/create',{
           name: this.state.name,
           designation: this.state.designation,
           email: this.state.email,
           phone: this.state.phone,
           initial: this.state.initial,
           employee_id: this.state.employee_id,
           selectDay: this.state.selectDay
        }).then(response=>{
          this.setState({
            name: '',
            designation: '',
            email: '',
            phone: '',
            initial: '',
            employee_id: '',
            selectDay: '',
            total: response.data.total,
            teachers: response.data.teachers,
            message: 'success',
            loading: false
          })
        }).catch(err=>({
          message: 'error'
        }));
        
      }
      
      componentWillMount(){
        Axios.get('/api/commity/teacher/create')
        .then(response=>{
            this.setState({
              teachers : response.data,
              loading: false
            })
        }).catch(err=>console.log(err));
      }

    render(){
        let count=1;
    return (
      <>
        <div className="wrapper">
          <div className="container">
              
          { this.state.message=="success"? <AlertSuccess1 total={ this.state.total } /> : '' }
          { this.state.message=="error"? <AlertError/> : '' }

               <div className="row">
                <div className="col-md-2"></div>
                 <div className="col-md-8 mt-5 bg-light p-3" style={{ 'boxShadow': '0 0 5px #999' }}>
                 <form onSubmit={ this.handleFormSubmit }>
                   <div className="row">
                     <div className="col-md-6">
                     
                        <input className="form-control" name="name" id="name" type="text" value={ this.state.name } onChange={ this.handleChangeName } placeholder="Name"/>  

                     </div>
                    
                     <div className="col-md-6">
                     <input className="form-control" name="designation" id="designation" type="text" value={ this.state.designation } onChange={ this.handleChangeDesignation } placeholder="Designation"/>                       </div>
                     
                     </div>

                     <div className="row mt-2">

                     <div className="col-md-6">
                     
                     <input className="form-control" name="email" id="email" type="email" value={ this.state.email } onChange={ this.handleChangeEmail } placeholder="Email"/>  

                     </div>
                 
                     <div className="col-md-6">
                     
                     <input className="form-control" name="phone" id="phone" type="text" value={ this.state.phone } onChange={ this.handleChangePhone } placeholder="Phone"/>  

                     </div>

                     
                   </div>

                   <div className="row mt-2">

                   <div className="col-md-6">

                   <input className="form-control" name="initial" id="initial" type="initial" value={ this.state.initial } onChange={ this.handleChangeInitial } placeholder="Teacher Initial"/>  

                   </div>

                   <div className="col-md-6">

                   <input className="form-control" name="employee_id" id="employee_id" type="text" value={ this.state.employee_id } onChange={ this.handleChangeEmployeeId } placeholder="Employee Id"/>  

                   </div>


                   </div>
                   
                   <div className="row">

                   <div className="col-md-3"></div> 
                    <div className="col-md-6 mt-2">

                    <select className="form-control" id="offDay" name="offDay" onChange={ this.handleChangeDay }>
                      <option>---Select Off Day---</option> 

                      {
                              
                              this.state.days !== null
                              ?
                              this.state.days.map(day=>(
                             

                              <option value={ day.name } key={day.id}>{ day.name }</option>
                              
                             
                           ))
                           : null
                          }


                    </select>  

                    </div>
                    <div className="col-md-3"></div>


                     </div>

                     <div className="row">

                     <div className="col-md-3"></div> 
                     <div className="col-md-6 mt-2">
                         <button className="btn btn-primary btn-block">Add</button>
                     </div>
                     <div className="col-md-3"></div>

                     
                   </div>
                   
                   <div className="text-center">
                   <Link to={'/commity/teacher/createCSV'}>
                        <p className="text-info font-weight-bold underline"><FontAwesomeIcon icon={faFileCsv}/> Import CSV</p>
                     </Link>
                   </div>

                 </form>
                 </div>
                 <div className="col-md-2"></div>
               </div>
                
          </div>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-9 mt-5">
            {
                this.state.loading?
                <Loading/>
                :
                null
              }
            <table className="table table-bordered table-hover table-dark" style={{ backgroundColor: '#0b2729' }}>
            
  <thead>
  <tr>
      <td colspan="8" className="text-center" style={{ background: 'linear-gradient(45deg,#00897B,#0081bf)' }}>Available Teacher</td>
      </tr>
    <tr>
     
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Initial</th>
      <th scope="col">Employee Id</th>
      <th scope="col">Designation</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Off Day</th>
     
    </tr>
  </thead>
  <tbody>
    
                            {
                              
                                this.state.teachers !== null
                                ?
                                this.state.teachers.map(teacher=>(
                                <tr key={teacher.id}>

                                <td>{ count++ }</td>
                                <td>{ teacher.name }</td>
                                <td>{ teacher.initial }</td>
                                <td>{ teacher.employee_id }</td>
                                <td>{ teacher.designation }</td>
                                <td>{ teacher.email }</td>
                                <td>{ teacher.phone }</td>
                                <td>{ teacher.off_day }</td>
                                
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

export default Teacher;

