import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import AlertSuccess from './AlertSuccess';
import AlertError from './AlertError';

class Time extends Component{
  
  constructor(props){

    super(props);
    
    this.state={
      type: 1,
      start_time: '',
      end_time: '',
      after_n_class: '',
      break_duration: '',
      class_duration: '',
      msg: 2
    }
   
    this.changeStartTime=this.changeStartTime.bind(this);
    this.changeEndTime=this.changeEndTime.bind(this);
    this.changeClassDuration=this.changeClassDuration.bind(this);
    this.changeNClass=this.changeNClass.bind(this);
    this.changeBreakDuration=this.changeBreakDuration.bind(this);
    this.changeBreakType=this.changeBreakType.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
    this.handleFormSubmit1=this.handleFormSubmit1.bind(this);
    this.handleFormSubmit2=this.handleFormSubmit2.bind(this);
   

  }

  changeBreakType(event){

    this.setState({
      type: event.target.value
    });
    
  }

  changeStartTime(event){

    this.setState({
      start_time: event.target.value
    });
    
  }

  changeEndTime(event){

    this.setState({
      end_time: event.target.value
    });
    
  }

  changeClassDuration(event){

    this.setState({
      class_duration: event.target.value
    });
    
  }

  changeNClass(event){

    this.setState({
      after_n_class: event.target.value
    });
    
  }

  changeBreakDuration(event){

    this.setState({
      break_duration: event.target.value
    });
    
  }
  
  handleFormSubmit(event){

    event.preventDefault();
    axios.post('/api/commity/time/create',{
       type: this.state.type,
       start_time: this.state.start_time,
       end_time: this.state.end_time,
       class_duration: this.state.class_duration
    }).then(response=>{
      this.setState({
        type: 1,
        start_time: '',
        end_time: '',
        class_duration: '',
        msg: response.data
      })
      
    }).catch(err=>console.log(err));
    
   

  }

  handleFormSubmit1(event){
    event.preventDefault();
    axios.post('/api/commity/time/create',{
       type: this.state.type,
       after_n_class: this.state.after_n_class,
       break_duration: this.state.break_duration,
       class_duration: this.state.class_duration
    }).then(response=>{
      this.setState({
        type: 1,
        after_n_class: '',
        break_duration: '',
        class_duration: '',
        msg: response.data
      })
      
    }).catch(err=>console.log(err));
    
  }

  handleFormSubmit2(event){
    event.preventDefault();
    axios.post('/api/commity/time/create',{
       type: this.state.type,
       class_duration: this.state.class_duration
    }).then(response=>{
      this.setState({
        type: 1,
        class_duration: '',
        msg: response.data
      })
      
    }).catch(err=>console.log(err));
    
  }


    render(){
      
      if(this.state.type==1){
    return (
      <>

<div className="wrapper">
           
           <div className="container">
           {
       
       this.state.msg ==1 ?(
       <div className="alert alert-danger alert-dismissible mt-2">
       <button type="button" className="close" data-dismiss="alert">&times;</button>

        <h4 className="text-center">Something went wrong!!</h4>
       
     </div>)
     :
     ''
       }

</div>
</div>
      <form onSubmit={ this.handleFormSubmit }>
        <div className="wrapper">
           
        <div className="container">
       
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 mt-5 bg-light" style={{ 'boxShadow': 'rgb(12 0 0) 0px 0px 5px' }}>
                     <div className="row">
                        <div className="col-md-6 p-2" style={{ 'background': 'rgb(231 239 231)' }}>
                          
                         <div>
                         <input type="radio" value="1" name="break" checked={ this.state.type == 1 } onChange={ this.changeBreakType }/> One Time &nbsp;
                         <input type="radio" value="2" name="break" checked={ this.state.type == 2 } onChange={ this.changeBreakType }/> After n class &nbsp;
                         <input type="radio" value="3" name="break" checked={ this.state.type == 3 } onChange={ this.changeBreakType }/> No
                         <hr />
                         </div>
                       
                        <div>
    <h3 className="text-center my-2 bg-info">One Time Break</h3>
                        <br/>
                        <div className="form-group">
                          <label htmlFor="start_time">Start Time</label> 
                          <input type="time" className="form-control" id="start_time" name="start_time" value={ this.state.start_time } onChange={ this.changeStartTime }/>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="end_time">Start Time</label> 
                          <input type="time" className="form-control" id="end_time" name="end_time" value={ this.state.end_time } onChange={ this.changeEndTime } />
                        </div>

                        </div>

                        </div>
                        <div className="col-md-6 p-2" style={{ 'background': '#e4dbdb' }}>
                        <div className="text-center">Duration Of Class</div>
                        <hr/>
                        <div className="form-group">
                           <label htmlFor="classDuration">Class Duration</label>
                           <input type="number" className="form-control" placeholder="Duration in minutes" name="class_duration" id="class_duration" value={ this.state.class_duration } onChange={ this.changeClassDuration } required/>
                          </div>
                          <button className="btn btn-outline-primary float-right">Submit</button>
                        </div>
                     </div>
              </div>
              <div className="col-md-3"></div>
            </div>
             
         </div>
        </div>
        </form>



      </>
    );
  }else if(this.state.type==2){


    return (
      <>

<div className="wrapper">
           
           <div className="container">
           {
       
       this.state.msg ==1 ?
       <div className="alert alert-danger alert-dismissible mt-2">
       <button type="button" className="close" data-dismiss="alert">&times;</button>

        <h4 className="text-center">Something went wrong!!</h4>
       
     </div>
     :
    ''
       }

</div>
</div>

       <form onSubmit={ this.handleFormSubmit1 }>
        <div className="wrapper">
           
        <div className="container">
        {this.state.msg}
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 mt-5 bg-light" style={{ 'boxShadow': 'rgb(12 0 0) 0px 0px 5px' }}>
                     <div className="row">
                        <div className="col-md-6 p-2" style={{ 'background': 'rgb(231 239 231)' }}>
                          
                         <div>
                         <input type="radio" value="1" name="break" checked={ this.state.type == 1 } onChange={ this.changeBreakType }/> One Time &nbsp;
                         <input type="radio" value="2" name="break" checked={ this.state.type == 2 } onChange={ this.changeBreakType }/> After n class &nbsp;
                         <input type="radio" value="3" name="break" checked={ this.state.type == 3 } onChange={ this.changeBreakType }/> No
                         <hr />
                         </div>
                       
                        <div>
                        <h3 className="text-center my-2 bg-info">After N Class Break { this.state.type } </h3>
                        <br/>
                        <div className="form-group">
                          <label htmlFor="nClass">Number Of Class</label> 
                          <input type="number" className="form-control" id="nClass" name="nClass" placeholder="Break After Number Of Class" min="1" step="10" value={ this.state.after_n_class } onChange={ this.changeNClass }/>
                        </div>

                        <div className="form-group">
                          <label htmlFor="breakDuration">Break Duration</label> 
                          <input type="number" className="form-control" id="breakDuration" name="breakDuration" placeholder="Break Duration In Minutes" value={ this.state.break_duration } onChange={ this.changeBreakDuration }/>
                        </div>
                        
                        

                        </div>

                        </div>
                        <div className="col-md-6 p-2" style={{ 'background': '#e4dbdb' }}>
                        <div className="text-center">Duration Of Class</div>
                        <hr/>
                          <div className="form-group">
                           <label htmlFor="classDuration">Class Duration</label>
                           <input type="number" className="form-control" placeholder="Duration in minutes" name="class_duration" id="class_duration" value={ this.state.class_duration } onChange={ this.changeClassDuration } required/>
                          </div>
                          <button className="btn btn-outline-primary float-right">Submit</button>
                        </div>
                     </div>
              </div>
              <div className="col-md-3"></div>
            </div>
             
         </div>
        </div>
        </form>
       
      </>
    );

  }else{

    return (
      <>
      
      <div className="wrapper">
           
           <div className="container">
      {
       
       this.state.msg ==1 ?
       <div className="alert alert-danger alert-dismissible mt-2">
       <button type="button" className="close" data-dismiss="alert">&times;</button>

        <h4 className="text-center">Something went wrong!!</h4>
       
     </div>
     :
    ''
       }

     

</div>
</div>

       <form onSubmit={ this.handleFormSubmit2 }>
        <div className="wrapper">
           
        <div className="container">
            {this.state.msg}
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 mt-5 bg-light" style={{ 'boxShadow': 'rgb(12 0 0) 0px 0px 5px' }}>
                     <div className="row">
                        <div className="col-md-6 p-2" style={{ 'background': 'rgb(231 239 231)' }}>
                          
                         <div>
                         <input type="radio" value="1" name="break" checked={ this.state.type == 1 } onChange={ this.changeBreakType }/> One Time &nbsp;
                         <input type="radio" value="2" name="break" checked={ this.state.type == 2 } onChange={ this.changeBreakType }/> After n class &nbsp;
                         <input type="radio" value="3" name="break" checked={ this.state.type == 3 } onChange={ this.changeBreakType }/> No
                         <hr />
                         </div>

                        </div>
                        <div className="col-md-6 p-2" style={{ 'background': '#e4dbdb' }}>
                        <div className="text-center">Duration Of Class</div>
                        <hr/>
                          <div className="form-group">
                           <label htmlFor="classDuration">Class Duration</label>
                           <input type="number" className="form-control" placeholder="Duration in minutes" name="class_duration" id="class_duration" value={ this.state.class_duration } onChange={ this.changeClassDuration } required/>
                          </div>
                          <button className="btn btn-outline-primary float-right">Submit</button>
                        </div>
                     </div>
              </div>
              <div className="col-md-3"></div>
            </div>
             
         </div>
        </div>
        </form>


      </>
    );    

  }
    }
}

export default Time;

