<?php

namespace App\Http\Controllers\Commity;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\TeacherImport;
use App\Http\Controllers\Controller;
use DB;

class TeacherController extends Controller
{
    public function store(Request $request){
        
        $teacher=DB::table('teachers')->insert(
            ['name'=>$request->name, 'designation'=>$request->designation, 'email'=>$request->email, 'phone'=>$request->phone, 'initial'=>$request->initial, 'employee_id'=>$request->employee_id, 'off_day'=>$request->selectDay]
        );
        
        $teachers=DB::table('teachers')->get();
        $total=DB::table('teachers')->count();

        return response()->json(['total'=>$total,'teachers'=>$teachers]);
    }
    
    public function getTeacher(){
        $teachers = DB::table('teachers')
        ->get();
        return response()->json($teachers);
    }

    public function storeCSV(Request $request){
        $total=DB::table('teachers')->count();
        
        $file=$request->file('myFile');
        Excel::import(new TeacherImport, $file);
        $total1=DB::table('types')->count();
        if($total==0){
            $new=$total1;
          }else{
            $new=$total1-$total;
          }

        $teachers = DB::table('teachers')
        ->get();
        return response()->json(['teachers'=>$teachers, 'new'=>$new, 'total'=>$total1]);
    }
    
    public function getDay(){
        $days=DB::table('days')->get();
        return response()->json($days);
    }
}
