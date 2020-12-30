<?php

namespace App\Http\Controllers\Commity;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;
use DB;

class CourseOfferController extends Controller
{
    public function createRoutine(Request $request){
        
        $file=$request->file('myFile');
        $section=array();
        $initial=array();
        $invalidOperation = array();
        $iterator=0;
        $row = 1;

        if (($handle = fopen($file, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
    
                $p=0;
                $num = count($data);

                // echo "<p> $num fields in line $row: <br /></p>\n";
                // $row++;
                if(strtolower($data[0])=="code"){
                    for ($c=0; $c < $num; $c++) {
                        $section[$p++]=$data[$c];
                    }
                }
                   
                if(strtolower($data[0])!="code" && strtolower($data[0])!=""){
                    for ($c=2; $c < $num; $c++) {
                        if($data[$c]!=null){
                        $type=DB::table('course_types')->where('course_code', $data[0])->first();
                        if($type){
                          $invalid=0;
                          $theory=0;
                         if(strtolower($type->type)=="theory"){
                            
                           /* Start For credit 3 */
                             
                           $rooms=DB::table('schedules')->where('type', '=', $type->type)->where('teacher','=',NULL)->get();
                           foreach($rooms as $room){
                               $flag4=0;
                             $checkDay=DB::table('teachers')->where('initial','=',$data[$c])->first();
                             if($checkDay){
                               $check_day=$checkDay->off_day;
                             }else{
                                 $check_day=NULL;
                             }
                             if($check_day!=$room->day){
                             $check=DB::table('schedules')
                             ->where('course', '=', $data[0])
                             ->where('teacher', '=', $data[$c])
                             ->where('level_term', '=' ,$section[1])
                             ->where('section', '=' ,$section[$c])
                             ->count();
                          if($check==0){
                           $checkTeacher=DB::table('schedules')->where('day','=',$room->day)->where('start_time','=',$room->start_time)->where('end_time','=',$room->end_time)->where('start_time','>=',$room->start_time)->where('start_time','<',$room->end_time)->where('teacher','=',$data[$c])->first();
                           if(!$checkTeacher){

                             /* Start Manage Time */
                             $m=1.5;
                             $time_manage=DB::table('schedules')->where('day','=',$room->day)->where('teacher','=',$data[$c])->get();
                             foreach($time_manage as $time_manage){
                                 if(strtolower($time_manage->type)=="electrical lab"){
                                   $m += 2;
                                 }else{
                                  $m += 1.5;
                                 }
                             }
                             /* End Manage Time */
                            
                             if($m<=5){
                            $update= DB::table('schedules')
                            ->where('id', '=', $room->id)
                            ->update(['course'=>$data[0] ,'teacher' => $data[$c], 'level_term'=>$section[1], 'section'=>$section[$c] ]);
                            $theory++;
                             }
                           }
                          }
                           $count=DB::table('schedules')
                           ->where('course', '=', $data[0])
                           ->where('teacher', '=', $data[$c])
                           ->where('level_term', '=' ,$section[1])
                           ->where('section', '=' ,$section[$c])
                           ->count();
                           
                           $flag=0;
                           if($count==1){
                             /* Start Insert Double Class */

                             $day=DB::table('schedules')
                             ->where('course', '=', $data[0])
                             ->where('teacher', '=', $data[$c])
                             ->where('level_term', '=' ,$section[1])
                             ->where('section', '=' ,$section[$c])
                             ->first();

                             $rs=DB::table('schedules')->where('type', '=', $type->type)->where('teacher','=',NULL)->where('day', '!=', $day->day)->where('day','!=',$check_day)->get();

                             foreach($rs as $r){
                               
                              $flag4=0;
                              $checkDay=DB::table('teachers')->where('initial','=',$data[$c])->first();
                              if($checkDay){
                                $check_day=$checkDay->off_day;
                              }else{
                                  $check_day=NULL;
                              }

                              if($check_day != $r->day){

                             $checkTeacher=DB::table('schedules')->where('day','=',$r->day)->where('start_time','=',$r->start_time)->where('end_time','=',$r->end_time)->where('start_time','>=',$r->start_time)->where('start_time','<',$r->end_time)->where('teacher','=',$data[$c])->first();
                             if(!$checkTeacher){

                              /* Start Manage Time */
                             $m1=1.5;
                             $time_manage=DB::table('schedules')->where('day','=',$r->day)->where('teacher','=',$data[$c])->get();
                             foreach($time_manage as $time_manage){
                                 if(strtolower($time_manage->type)=="electrical lab"){
                                   $m1 += 2;
                                 }else{
                                  $m1 += 1.5;
                                 }
                             }
                             /* End Manage Time */
                                
                             if($m1<=5){

                             $update= DB::table('schedules')
                             ->where('id', '=', $r->id)
                             ->update(['course'=>$data[0] ,'teacher' => $data[$c], 'level_term'=>$section[1], 'section'=>$section[$c] ]);
                             
                             if($update){
                                 $theory++;
                                 $invalid=1;
                                 $flag4=1;
                                break;
                              }
                            }
                             }
                            }
                          }
                             /* End Insert Double Class */
                            }
                           }

                           if($flag4==1){
                           break;
                           }

                         }
                          /* End For credit 3 */

                           

                         }else{
                            
                             /* Start For credit 1 */
                             if(strtolower($type->type)=="electrical lab"){
                              /* Start Electrical Lab */
                                
                              $rooms=DB::table('schedules')->where('type', '=', $type->type)->where('teacher', '=', NULL)->get();
                              foreach($rooms as $room){
                                
                                /* Start Manage Time */

                                $m2=2;
                                $time_manage=DB::table('schedules')->where('day','=',$room->day)->where('teacher','=',$data[$c])->get();
                                foreach($time_manage as $time_manage){
                                    if(strtolower($time_manage->type)=="electrical lab"){
                                      $m2 += 2;
                                    }else{
                                     $m2 += 1.5;
                                    }
                                }

                                /* End Manage Time */
                                
                                if($m2<=5){
                                 $flag6=0;
                                 $checkDay=DB::table('teachers')->where('initial','=',$data[$c])->first();
                                 if($checkDay){
                                   $check_day=$checkDay->off_day;
                                 }else{
                                     $check_day=NULL;
                                 }
                                 if($check_day!=$room->day){
                               
                                $update= DB::table('schedules')
                               ->where('id', '=', $room->id)
                               ->update(['course'=>$data[0] ,'teacher' => $data[$c], 'level_term'=>$section[1], 'section'=>$section[$c] ]);
                               if($update){
                                $invalid=1;
                                 $flag6=1;
                               }
                               }
                               
                               if($flag6==1){
                                 break;
                               }

                              }                              
                            }
                              /* End Electrical Lab */
                             }else{
                             $rooms=DB::table('schedules')->where('type', '=', $type->type)->where('teacher', '=', NULL)->get();
                             foreach($rooms as $room){

                                $flag3=0;
                                $checkDay=DB::table('teachers')->where('initial','=',$data[$c])->first();
                                if($checkDay){
                                  $check_day=$checkDay->off_day;
                                }else{
                                    $check_day=NULL;
                                }
                                if($check_day!=$room->day){
                                $id=($room->id)+1;
                                $r=DB::table('schedules')->where('type', '=', $type->type)->where('teacher', '=', NULL)->where('day', '=', $room->day)->where('id', '=', $id)->first();
                                
                                if($r){
                                  
                                  $s1=DB::table('schedules')->where('id','=',$r->id)->first();
                                  $s2=DB::table('schedules')->where('id','=',$room->id)->first();
                                  $checkTeacher1=DB::table('schedules')->where('day','=' ,$room->day)->where('start_time','=',$s1->start_time)->where('start_time','=',$s2->start_time)->where('start_time','>=',$s1->start_time)->where('start_time','<',$s2->end_time)->where('teacher', '=', $data[$c])->count();
                                  if($checkTeacher1==0){
                                     
                                    /* Start Manage Time */

                               $m4=3;
                               $time_manage=DB::table('schedules')->where('day','=',$room->day)->where('teacher','=',$data[$c])->get();
                               foreach($time_manage as $time_manage){
                                   if(strtolower($time_manage->type)=="electrical lab"){
                                     $m4 += 2;
                                   }else{
                                    $m4 += 1.5;
                                   }
                               }

                               /* End Manage Time */
                                 if($m4<=5){
                                  $update= DB::table('schedules')
                                  ->where('id', '=', $room->id)
                                  ->orWhere('id', '=', $r->id)
                                  ->update(['course'=>$data[0] ,'teacher' => $data[$c], 'level_term'=>$section[1], 'section'=>$section[$c] ]);
                                  if($update){
                                    $invalid=1;
                                      $flag3=1;
                                  break;
                                  }
                                 }
                                  }
                                }

                             }
                               if($flag3==1){
                                 break;
                               }
                             }
                            }
                             /* End For credit 1 */

                         }
                        }

                        if($invalid==0){

                          if($theory==1){

                          $unassigns=DB::table('unassigns')->insert(
                            [ 'level_term'=>$section[1], 'course_code'=>$data[0], 'section'=>$section[$c], 'teacher'=>$data[$c], 'unassign_number'=>"Theory(1)" ]
                          );

                          }else if($theory==2){

                            $unassigns=DB::table('unassigns')->insert(
                              [ 'level_term'=>$section[1], 'course_code'=>$data[0], 'section'=>$section[$c], 'teacher'=>$data[$c], 'unassign_number'=>"Theory(2)" ]
                            );

                          }else{

                            $unassigns=DB::table('unassigns')->insert(
                              [ 'level_term'=>$section[1], 'course_code'=>$data[0], 'section'=>$section[$c], 'teacher'=>$data[$c], 'unassign_number'=>"Lab" ]
                            );

                          }

                      
                        }

                        }
                       
                        
                    }
                }
                
            }
            fclose($handle);
        }

        $unassigns=DB::table('unassigns')->get();
        return response()->json(['unassigns'=>$unassigns]);

    }



    public function getOfferCourse(){
      
      $courses=DB::table('schedules')->where('teacher', '!=', NULL)->get();
      return response()->json($courses);

    }

    public function getLevelTerm(){

      $levelTerm=DB::table('schedules')->where('teacher', '!=', NULL)->select('level_term')->orderBy('level_term', 'ASC')->distinct()->get();
      return response()->json($levelTerm);

    }

    public function getCourse(){

      $courses=DB::table('schedules')->where('teacher', '!=', NULL)->select('course')->orderBy('course', 'ASC')->distinct()->get();
      return response()->json($courses);

    }

    public function getSection(){

      $sections=DB::table('schedules')->where('teacher', '!=', NULL)->select('section')->orderBy('section', 'ASC')->distinct()->get();
      return response()->json($sections);

    }

    public function getTeacher(){

      $teachers=DB::table('schedules')->where('teacher', '!=', NULL)->select('teacher')->orderBy('teacher', 'ASC')->distinct()->get();
      return response()->json($teachers);

    }

    public function searchLevelTerm(Request $request){

      if($request->search=="0"){
        $res=DB::table('schedules')->where('teacher', '!=', NULL)->get();
      }else if($request->search=="1"){
        $res=DB::table('schedules')->get();
      }else if($request->search=="2"){
        $res=DB::table('schedules')->where('teacher', '=', NULL)->get();
      }else{
        $res=DB::table('schedules')->where('teacher', '!=', NULL)->where('level_term','=',$request->search)->get();
      }
      return response()->json($res);

    }

    public function editRoutine($id){
      $schedule=DB::table('schedules')->where('id','=',$id)->first();

      $level_term=$schedule->level_term;
      $course=$schedule->course;
      $teacher=$schedule->teacher;
      $section=$schedule->section;
      $editId=$schedule->id;

      return response()->json(['level_term'=>$level_term, 'course'=>$course, 'teacher'=>$teacher, 'section'=>$section, 'editId'=>$editId]);
    }

    public function editRoutine1(Request $request){
      $update= DB::table('schedules')
      ->where('id', '=', $request->editId)
      ->update(['course'=>$request->course ,'teacher' =>$request->teacher , 'level_term'=>$request->level_term, 'section'=>$request->section ]);

      return response()->json($update);
    }
}
