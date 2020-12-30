<?php

namespace App\Http\Controllers\Commity;

use App\Models\Unassign;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use DB;

class UnassignController extends Controller
{
    public function getUnassign(){
        $unassigns=DB::table('unassigns')->get();
        return response()->json([ 'unassigns'=>$unassigns ]);
    }

    public function delete(Request $request){
        $message= 'error';
        $item=DB::table('unassigns')->where('id','=', $request->id)->first();
        if($item->unassign_number=="Lab"){
          $check=DB::table('schedules')->where('level_term', '=', $item->level_term)->where('section','=', $item->section)->where('course','=',$item->course_code)->where('teacher','=',$item->teacher)->count();
          if($check > 0){
            $delete=DB::table('unassigns')->where('id',$request->id)->delete();
            $message= 'success';
          }

        }else if($item->unassign_number=="Theory(1)"){
          
            $check=DB::table('schedules')->where('level_term', '=', $item->level_term)->where('section','=', $item->section)->where('course','=',$item->course_code)->where('teacher','=',$item->teacher)->count();
            if($check == 1){
                $delete=DB::table('unassigns')->where('id',$request->id)->delete();
                $message= 'success';
            }

        }else if($item->unassign_number=="Theory(2)"){
            $check=DB::table('schedules')->where('level_term', '=', $item->level_term)->where('section','=', $item->section)->where('course','=',$item->course_code)->where('teacher','=',$item->teacher)->count();
            if($check == 2){
                 $delete=DB::table('unassigns')->where('id',$request->id)->delete();
                 $message= 'success';
            }
        }
        
        
        $unassigns=DB::table('unassigns')->get();
        return response()->json([ 'unassigns'=>$unassigns, 'message'=>$message ]);
    }
}
