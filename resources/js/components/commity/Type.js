import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import AlertSuccess1 from './AlertSuccess1';
import AlertError from './AlertError';
import Loading from './Loading';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

class Type extends Component{
  
    constructor(props){

        super(props);
        
        this.state={
          type: '',
          types: [],
          total: '',
          success: '',
          message: '',
          loading: true
        }
       
        this.handleChangeType=this.handleChangeType.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        
        

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
        
        axios.post('/api/commity/type/create',{
           type: this.state.type,
        }).then(response=>{
         console.log(response.data.total);
          this.setState({
            type: '',
            types: response.data.types,
            total: response.data.total,
            loading: false,
            message: 'success'
          })
          
        }).catch(err=>{
          this.setState({
            message:'error'
          })
        });
        
       

      }

      componentWillMount(){
       this.setState({
         loading: true
       })

        Axios.get('/api/commity/type/create')
        .then(response=>{
            this.setState({
                types : response.data,
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
              
              { this.state.message=="success"? <AlertSuccess1 total={ this.state.total }/> : '' }
              { this.state.message=="error"? <AlertError/> : '' }
              
             
               <div className="row">
                 <div className="col-md-3"></div>
                 <div className="col-md-6 mt-5 bg-light p-3" style={{ 'boxShadow': '0 0 5px #999' }}>
                 <form onSubmit={ this.handleFormSubmit }>
                   <div className="row">
                     <div className="col-md-12">
                     
                      <input className="form-control" type="text" name="type" id="type" placeholder="Enter Course Type" value={ this.state.type } onChange={ this.handleChangeType } required/>
                      
                     </div>
                     
                     <div className="col-md-3"></div>
                     <div className="col-md-6 mt-2">
                         <button className="btn btn-primary btn-block">Add</button>
                     </div>
                     <div className="col-md-3"></div>
                     

                   </div>
                   <div className="text-center">
                   <Link to={'/commity/type/createCSV'}>
                        <p className="text-info font-weight-bold underline"><FontAwesomeIcon icon={faFileCsv}/> Import CSV</p>
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
       
            <table className="table table-bordered table-dark table-hover">
            
  <thead>
  <tr >
      <td colspan="2" className="text-center" style={{ background: 'linear-gradient(45deg,#00897B,#0081bf)' }}>Course Types</td>
      </tr>
    <tr>
     
      <th scope="col">#</th>
      <th scope="col">Course Type</th>
     
    </tr>
  </thead>
  <tbody>
    
                            {
                              
                                this.state.types !== null
                                ?
                                this.state.types.map(type=>(
                                <tr key={type.id}>

                                <td>{ count++ }</td>
                                <td>{ type.type }</td>
                                
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
setTimeout(function () { 
  
  // Closing the alert 
  $('.alert').alert('close'); 
}, 2000); 
export default Type;

