import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import AlertSuccess from './AlertSuccess';
import AlertError from './AlertError';
import Loading from './Loading';
import Axios from 'axios';
class TeacherCSV extends Component{
  
  constructor(props){

    super(props);
    
    this.state={
      type: '',
      selectedFile: null,
      teachers: [],
      new: '',
      total: '',
      loading: false,
      message: ''
    }
   
    this.handleChangeType=this.handleChangeType.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
    
  }
  
  handleChangeType=event=>{
    
    this.setState({ selectedFile: event.target.files[0] }); 

  }

  handleFormSubmit(event){
    this.setState({
      loading: true
    })
    event.preventDefault();
   
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
      "myFile", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 
   
    // Details of the uploaded file 
    console.log(this.state.selectedFile); 
   
    // Request made to the backend api 
    // Send formData object 
    axios.post("/api/commity/teacher/createCSV", formData).then(response=>{
      this.setState({
        loading: false,
        teachers: response.data.teachers,
        new: response.data.new,
        total: response.data.total,
        message:'success'
      })
    });  
    

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
           
            <hr/>
            { this.state.message=="success"? <AlertSuccess new={ this.state.new } total={ this.state.total } /> : '' }
            { this.state.message=="error"? <AlertError/> : '' }

           <div className="row">
<div className="col-md-3"></div>
             <div className="col-md-6 mt-5 bg-light p-3" style={{ 'boxShadow': '0 0 5px #999' }}>
             <form onSubmit={ this.handleFormSubmit } encType="multipart/form-data">
               <div className="row">
                 <div className="col-md-12">
                 
                  <input className="form-control" type="file" onChange={ this.handleChangeType } accept=".csv" required/>
                  
                 </div>
                 
                 <div className="col-md-3"></div>
                 <div className="col-md-6 mt-2">
                     <button className="btn btn-primary btn-block">Add</button>
                 </div>
                 <div className="col-md-3"></div>
                 

               </div>
               
               <div className="row">

                     <div className="col-md-4">
                     
                     </div>
                     <div className="col-md-4">
                       
                     <button className="btn btn-outline-secondary btn-block mt-2" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                       Sample CSV
                     </button>
                  


                    </div>

                    <div className="col-md-4">

                    </div>

                   </div>

               </form>
             </div>
             <div className="col-md-3"></div>
           </div>

           <div className="collapse mb-2" id="collapseExample" style={{ 'transitionDuration': '.5s' }}>
  <div className="card card-body">
    <div style={{ overflow: 'auto' }}>
    <img src="../../images/teachers.png"/>
    </div>
  </div>
</div>
            
{
                this.state.loading?
                <Loading/>
                :
                null
              }
            <table className="table table-bordered table-hover table-dark mt-2" style={{ backgroundColor: '#0b2729' }}>
           
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

    
    </div>
  </>
);
}  

}

export default TeacherCSV;

