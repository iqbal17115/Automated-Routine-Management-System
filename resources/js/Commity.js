import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Header from './components/commity/layout/Header';
import Day from './components/commity/Day';
import Time from './components/commity/Time';
import Type from './components/commity/Type';
import TypeCSV from './components/commity/TypeCSV';
import CourseType from './components/commity/CourseType';
import CourseOffer from './components/commity/CourseOffer';
import CourseCSV from './components/commity/CourseCSV';
import Room from './components/commity/Room';
import RoomCSV from './components/commity/RoomCSV';
import AllSlot from './components/commity/AllSlot';
import Teacher from './components/commity/Teacher';
import TeacherCSV from './components/commity/TeacherCSV';
import Routine from './components/commity/Routine';
import EditRoutine from './components/commity/EditRoutine';


class Commity extends Component{
    render(){
    return (
       <BrowserRouter>
            <Header/>
            <Switch>

            <Route exact path="/commity/day/create" component={Day}/>
            <Route path="/commity/time/create" component={Time}/>

            <Route path="/commity/type/create" component={Type}/>
            <Route path="/commity/type/createCSV" component={TypeCSV}/>
            <Route path="/commity/courseOffer/createCSV" component={CourseOffer}/>

            <Route path="/commity/coursetype/create" component={CourseType}/>
            <Route path="/commity/coursetype/createCSV" component={CourseCSV}/>
            <Route path="/commity/room/create" component={Room}/>
            <Route path="/commity/room/createCSV" component={RoomCSV}/>
            <Route path="/commity/allslot/create" component={AllSlot}/>

            <Route path="/commity/teacher/create" component={Teacher}/>
            <Route path="/commity/teacher/createCSV" component={TeacherCSV}/>

            <Route path="/commity/show/routine" component={Routine}/>
            <Route path="/commity/edit/routine/:id" component={EditRoutine}/>


           </Switch>
       </BrowserRouter>
    );
    }
}

export default Commity;

if (document.getElementById('commity')) {
    ReactDOM.render(<Commity />, document.getElementById('commity'));
}
