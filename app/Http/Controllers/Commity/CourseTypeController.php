<?php

namespace App\Http\Controllers\Commity;

use App\Models\CourseType;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\CourseTypeImport;
use App\Http\Controllers\Controller;
use DB;

class CourseTypeController extends Controller
{
    
    public function store(Request $request){

        $type=DB::table('course_types')->insert(
            ['course_code'=>$request->coursecode, 'course_title'=>$request->coursetitle, 'credit'=>$request->credit, 'type'=>$request->type]
        );
        
        $total=DB::table('course_types')->count();
        $coursetypes=DB::table('course_types')->get();
        
        return response()->json(['total'=>$total, 'coursetypes'=> $coursetypes]);

    }

    public function getCourseType(){

        $types=DB::table('course_types')->get();
        
        return response()->json($types);
        
    }

    public function getType(){
        $types=DB::table('types')->get();
        return response()->json($types);
    }

    public function storeCSV(Request $request){
        
        $total=DB::table('course_types')->count();

        $file=$request->file('myFile');
        Excel::import(new CourseTypeImport, $file);

        $total1=DB::table('course_types')->count();
        
        if($total==0){
          $new=$total1;
        }else{
          $new=$total1-$total;
        }

        $course_types=DB::table('course_types')->get();
        return response()->json(['new'=>$new, 'total'=>$total1, 'course_types'=>$course_types]);

    }

}
