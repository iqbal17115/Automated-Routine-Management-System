import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import AlertSuccess2 from './AlertSuccess2';
import AlertError from './AlertError';
import AlertDeleteSuccess from './AlertDeleteSuccess';
import AlertDeleteError from './AlertDeleteError';
import Loading from './Loading';
import Axios from 'axios';
class CourseOffer extends Component{
  
    constructor(props){

        super(props);
        
        this.state={
          type: '',
          selectedFile: null,
          types: [],
          schedules: [],
          levelTerms: [],
          id: '',
          search: '',
          unassigns: [],
          loading: true,
          message: '',
          message1: ''
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
        axios.post("/api/commity/courseOffer/createCSV", formData).then(response=>{
         
          this.setState({
            loading:false,
            unassigns: response.data.unassigns,
            message:'success'
          })

        }); 
        
       

      }
      deleteUnassign(id){
        this.setState({
          loading: true
        })
        Axios.delete(`/api/commity/unassign/delete/${id}`)
        .then(response=>{
            this.setState({
            loading:false,
            unassigns: response.data.unassigns,
            message1:response.data.message
            })
        }).catch(err=>{
          message: 'error'
        });
      }
      componentWillMount(){
        this.setState({
          loading: true
        })
        Axios.get('/api/commity/unassign/get')
        .then(response=>{
            this.setState({
              unassigns : response.data.unassigns,
              loading: false,
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
            { this.state.message=="success"? <AlertSuccess2/> : '' }
            { this.state.message=="error"? <AlertError/> : '' }

            { this.state.message1=="success"? <AlertDeleteSuccess/> : '' }
            { this.state.message1=="error"? <AlertDeleteError/> : '' }

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

               {/* Start table */}

                <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-10 mt-2">
                   
                  <div className="collapse mb-2" id="collapseExample">
  <div className="card card-body">
  <div style={{ overflow: 'auto' }}>
    <img src="../../images/offerCourse.png"/>
  </div>
  </div>
</div>

              {
                this.state.loading ?
                 <Loading/>
                 :
                 null
              }

                  <table className="table table-bordered table-hover table-dark" style={{ backgroundColor: '#0b2729' }}>
                  
  <thead>
    <tr>
      <td colSpan="7" className="text-center" style={{ background: 'linear-gradient(45deg,#00897B,#0081bf)' }}>Un-assign Classes</td>
      </tr>
    <tr>
     
      <th scope="col">#</th>
      <th scope="col">Semester</th>
      <th scope="col">Course</th>
      <th scope="col">Section</th>
      <th scope="col">Teacher</th>
      <th scope="col">Un-assign Class</th>
      <th scope="col">Action</th>
     
    </tr>
  </thead>
  <tbody>
    
                            {
                              
                                this.state.unassigns !== null
                                ?
                                this.state.unassigns.map(unassign=>(
                                <tr key={unassign.id}>

                                <td>{ count++ }</td>
                                <td>{ unassign.level_term }</td>
                                <td>{ unassign.course_code }</td>
                                <td>{ unassign.section }</td>
                                <td>{ unassign.teacher }</td>
                                <td>{ unassign.unassign_number }</td>
                                <td><a className="btn btn-danger btn-sm" onClick={()=>this.deleteUnassign(unassign.id)} >Delete</a></td>
                                
                                </tr>
                             ))
                             : null
                            }
    
  </tbody>
</table>

                  </div>
                  <div className="col-md-1"></div>
                </div>

               {/* End table */}
                
          </div>

        
        </div>
      </>
    );
    }
}

export default CourseOffer;

