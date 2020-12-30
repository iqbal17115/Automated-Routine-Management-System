<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix'=>'commity'], function(){
    
    /* Start Manage Day */
    Route::get('/day/create','\App\Http\Controllers\Commity\DayController@getDay');
    Route::post('/day/create','\App\Http\Controllers\Commity\DayController@store');
    /* End Manage Day */

    /* Start Manage Time */
    Route::get('/time/create','\App\Http\Controllers\Commity\TimeController@getDay');
    Route::post('/time/create','\App\Http\Controllers\Commity\TimeController@store');
    /* End Manage Time */

    /* Start Manage Type */
    Route::get('/type/create','\App\Http\Controllers\Commity\TypeController@getDay');
    Route::post('/type/create','\App\Http\Controllers\Commity\TypeController@store');
    /* End Manage Type */

    /* Start Manage Course Type */

    Route::get('/coursetype/create','\App\Http\Controllers\Commity\CourseTypeController@getCourseType');
    Route::post('/coursetype/create','\App\Http\Controllers\Commity\CourseTypeController@store');
    Route::get('/coursetype/get','\App\Http\Controllers\Commity\CourseTypeController@getType');

    /* End Manage Course Type */

    /* Start Manage Course Type */

    Route::get('/schedule/create','\App\Http\Controllers\Commity\ScheduleController@getSchedule');
    Route::post('/schedule/create','\App\Http\Controllers\Commity\ScheduleController@store');
    Route::get('/schedule/get','\App\Http\Controllers\Commity\ScheduleController@getType');
    Route::get('/room/get','\App\Http\Controllers\Commity\ScheduleController@getRoom');
    Route::get('/room/getTotalRoom','\App\Http\Controllers\Commity\ScheduleController@getTotalRoom');

    /* End Manage Course Type */

    /* Start Teacher */

    Route::get('/teacher/create','\App\Http\Controllers\Commity\TeacherController@getTeacher');
    Route::post('/teacher/create','\App\Http\Controllers\Commity\TeacherController@store');
    Route::get('/teacher/getDay','\App\Http\Controllers\Commity\TeacherController@getDay');
    
    /* End Teacher */

    /* Start Corse Offer */
    
    /* End Corse Offer */

    Route::get('/courseOffer/get','\App\Http\Controllers\Commity\CourseOfferController@getOfferCourse');
    Route::get('/levelTerm/get','\App\Http\Controllers\Commity\CourseOfferController@getLevelTerm');
    Route::get('/course/get','\App\Http\Controllers\Commity\CourseOfferController@getCourse');
    Route::get('/section/get','\App\Http\Controllers\Commity\CourseOfferController@getSection');
    Route::get('/teacher/get','\App\Http\Controllers\Commity\CourseOfferController@getTeacher');
    Route::post('/search/get','\App\Http\Controllers\Commity\CourseOfferController@searchLevelTerm');
    Route::post('/edit/routine','\App\Http\Controllers\Commity\CourseOfferController@editRoutine1');
    Route::get('/edit/routine/{id}','\App\Http\Controllers\Commity\CourseOfferController@editRoutine');
      
    /* Start Add CSV */
    
    Route::post('/type/createCSV1','\App\Http\Controllers\Commity\TypeController@storeCSV');
    Route::post('/coursetype/createCSV','\App\Http\Controllers\Commity\CourseTypeController@storeCSV');
    Route::post('/schedule/createCSV','\App\Http\Controllers\Commity\ScheduleController@storeCSV');
    Route::post('/teacher/createCSV','\App\Http\Controllers\Commity\TeacherController@storeCSV');
    Route::post('/courseOffer/createCSV','\App\Http\Controllers\Commity\CourseOfferController@createRoutine');
    
    /* End Add CSV */

    /* Start Search */
      
    Route::get('/searchByCourseCode/routine','\App\Http\Controllers\Commity\TeacherController@searchByCode');

    /* End Search */

     /* Start Unassign */
      
     Route::get('/unassign/get','\App\Http\Controllers\Commity\UnassignController@getUnassign');
     Route::delete('/unassign/delete/{id}','\App\Http\Controllers\Commity\UnassignController@delete');

     /* End Unassign */

});