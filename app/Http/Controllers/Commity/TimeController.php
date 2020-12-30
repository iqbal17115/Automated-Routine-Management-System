<?php

namespace App\Http\Controllers\Commity;

use App\Models\Time;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class TimeController extends Controller
{
   public function store(Request $request){
   
   $access=DB::table('times')->count();
   
    $flag=0;
    if($request->type==2){
        $days=DB::table('days')->get();
         foreach($days as $day){
           
            $starttimestamp = strtotime($day->start_time);
 	        $endtimestamp = strtotime($day->end_time);
 	        $difference = abs($endtimestamp - $starttimestamp)/3600;
            $minutes=$difference*60;
            
            $total=$request->after_n_class * $request->class_duration + $request->break_duration;
            $remaining=$minutes % $total;
            
                 if($remaining == 0){
                   $flag=1;
                 }else if(($remaining % $request->class_duration) != 0){
                   $flag=1;
                 }        
             }
   if($flag==0){
    $time=DB::table('times')->insert(
        ['break_type'=>$request->type, 'after_n_class'=>$request->after_n_class, 'break_duration'=>$request->break_duration, 'class_duration'=>$request->class_duration]
      );
      
     
      $days=DB::table('days')->get();
      foreach($days as $day){
      $count=0;
      while(strtotime($day->start_time) < strtotime($day->end_time)){
          // $slot=DB::table('slots')->insert(
          //   ['day_name'=>$day->name, 'start_time'=>$day->start_time, 'end_time'=>date('H:i A','+'.$request->class_duration.' minutes',strtotime($day->start_time))]
          // );
              
          
          $temp=date('g:i A',strtotime($request->class_duration.' minutes',strtotime($day->start_time)));   

          $slot=DB::table('slots')->insert(
            ['day_name'=>$day->name, 'start_time'=>$day->start_time, 'end_time'=>$temp]
          );
          
          $day->start_time=date('g:i A',strtotime($request->class_duration.' minutes',strtotime($day->start_time)));          $count++;
          if($count==$request->after_n_class){
            $count=0;
            $day->start_time=date('g:i A',strtotime($request->break_duration.' minutes',strtotime($day->start_time)));  
          }
          
      }

    }
    }
    
   }else if($request->type==1){
     
    $days=DB::table('days')->get();
    foreach($days as $day){
        
       /* Start Before Break */
         
       $starttimestamp = strtotime($day->start_time);
       $endtimestamp = strtotime($request->start_time);
       $difference = abs($endtimestamp - $starttimestamp)/3600;
       $minutes=$difference*60;
       
       $ramaining1=$minutes % $request->class_duration;
       

       /* End Before Break */


       /* Start After Break */
       
       $starttimestamp1 = strtotime($request->end_time);
       $endtimestamp1 = strtotime($day->end_time);
       $difference1 = abs($endtimestamp1 - $starttimestamp1)/3600;
       $minutes1=$difference1*60;
       
       $ramaining2=$minutes1 % $request->class_duration;

       /* End After Break */
      if($ramaining2 != 0 || $ramaining1 != 0){
        $flag=1;
      }
    }
    if($flag==0){
     
      $time=DB::table('times')->insert(
         ['break_type'=>$minutes1, 'start_time'=>date("g:i A",strtotime($request->start_time)), 'end_time'=>date("g:i A", strtotime($request->end_time)), 'class_duration'=>$request->class_duration]
      );

      $days=DB::table('days')->get();
      foreach($days as $day){

        $break=DB::table('times')->first();
        while(strtotime($day->start_time) < strtotime($break->start_time)){
          
          $temp=date('g:i A',strtotime($request->class_duration.' minutes',strtotime($day->start_time)));   

          $slot=DB::table('slots')->insert(
            ['day_name'=>$day->name, 'start_time'=>$day->start_time, 'end_time'=>$temp]
          );

          $day->start_time=date('g:i A',strtotime($request->class_duration.' minutes',strtotime($day->start_time)));  
        }

        $break=DB::table('times')->first();
        while(strtotime($break->end_time) < strtotime($day->end_time)){
          
          $temp=date('g:i A',strtotime($request->class_duration.' minutes',strtotime($break->end_time)));   

          $slot=DB::table('slots')->insert(
            ['day_name'=>$day->name, 'start_time'=>$break->end_time, 'end_time'=>$temp]
          );

          $break->end_time=date('g:i A',strtotime($request->class_duration.' minutes',strtotime($break->end_time)));  

        }

      }
      
      }
     }else if($request->type == 3){
        
      $days=DB::table('days')->get();
      foreach($days as $day){
       
       $starttimestamp = strtotime($day->start_time);
       $endtimestamp = strtotime($day->end_time);
       $difference = abs($endtimestamp - $starttimestamp)/3600;
       $minutes=$difference*60;
       
       $ramaining=$minutes % $request->class_duration;

       if($ramaining != 0){
        $flag=1;
       }
      
      }
       
      if($flag==0){
        
        $days=DB::table('days')->get();
        foreach($days as $day){
        while(strtotime($day->start_time) < strtotime($day->end_time)){
          
          $temp=date('g:i A',strtotime($request->class_duration.' minutes',strtotime($day->start_time)));   

          $slot=DB::table('slots')->insert(
            ['day_name'=>$day->name, 'start_time'=>$day->start_time, 'end_time'=>$temp]
          );

          $day->start_time=date('g:i A',strtotime($request->class_duration.' minutes',strtotime($day->start_time)));  
        }
      }
      }

     }
     
     return response()->json($flag);

  }

 }

