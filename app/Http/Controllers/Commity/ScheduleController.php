<?php

namespace App\Http\Controllers\Commity;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\RoomImport;
use App\Http\Controllers\Controller;
use DB;

class ScheduleController extends Controller
{
    public function store(Request $request){
        
        $room=DB::table('rooms')->insert(
            ['room'=>$request->room, 'type'=>$request->type]
        );
        
        if(strtolower($request->type)=="electrical lab"){
           
            $days=DB::table('days')->get();
            foreach($days as $day){
              
                $schedule=DB::table('schedules')->insert([
                    ['day'=>$day->name, 'room'=>$request->room, 'start_time'=>"09:00 AM", 'end_time'=>"11:00 AM", 'type'=>$request->type],
                    ['day'=>$day->name, 'room'=>$request->room, 'start_time'=>"11:00 AM", 'end_time'=>"01:00 PM", 'type'=>$request->type],
                    ['day'=>$day->name, 'room'=>$request->room, 'start_time'=>"01:00 PM", 'end_time'=>"03:00 PM", 'type'=>$request->type],
                    ['day'=>$day->name, 'room'=>$request->room, 'start_time'=>"03:00 PM", 'end_time'=>"05:00 PM", 'type'=>$request->type],
                ]);

            }

        }else{
           
            $slots=DB::table('slots')->get();
            foreach($slots as $slot){
               
                $schedule=DB::table('schedules')->insert(
                    ['day'=>$slot->day_name, 'room'=>$request->room, 'start_time'=>$slot->start_time, 'end_time'=>$slot->end_time, 'type'=>$request->type]
                );
    
            }
        
            
        }
        $rooms=DB::table('rooms')->get();
        $total=DB::table('rooms')->count();
        return response()->json(['total'=>$total, 'rooms'=>$rooms]);
    }
    
    public function getSchedule(){

        $schedules = DB::table('schedules')
                ->get();
        return response()->json($schedules);
        
    }

    public function getSlot(){

        $slots = DB::table('slots')
                ->get();
        return response()->json($slots);
        
    }

    public function getType(){

        $types=DB::table('types')->get();
        return response()->json($types);
    }

    public function search(Requewst $request){
      $search=DB::table('schedules')->where('day','=',$request->search)->get();
      return response()->json($search);
    }
    
    public function storeCSV(Request $request){

        $total=DB::table('rooms')->count();

        $file=$request->file('myFile');
        Excel::import(new RoomImport, $file);

        $rooms=DB::table('schedules')->join('rooms','schedules.room','!=','rooms.room')->select('rooms.*')->distinct()->get();
        $slots=DB::table('slots')->get();

        foreach($rooms as $room){
          
            if(strtolower($room->type)=="electrical lab"){
              
                $days=DB::table('days')->get();
                foreach($days as $day){
                  
                    $schedule=DB::table('schedules')->insert([
                        ['day'=>$day->name, 'room'=>$room->room, 'start_time'=>"09:00 AM", 'end_time'=>"11:00 AM", 'type'=>$room->type],
                        ['day'=>$day->name, 'room'=>$room->room, 'start_time'=>"11:00 AM", 'end_time'=>"01:00 PM", 'type'=>$room->type],
                        ['day'=>$day->name, 'room'=>$room->room, 'start_time'=>"01:00 PM", 'end_time'=>"03:00 PM", 'type'=>$room->type],
                        ['day'=>$day->name, 'room'=>$room->room, 'start_time'=>"03:00 PM", 'end_time'=>"05:00 PM", 'type'=>$room->type],
                    ]);
    
                }

            }else{
          foreach($slots as $slot){
             
            $schedule=DB::table('schedules')->insert(
                ['day'=>$slot->day_name, 'room'=>$room->room, 'start_time'=>$slot->start_time, 'end_time'=>$slot->end_time, 'type'=>$room->type]
            );

          }
         }
        }

        $total1=DB::table('rooms')->count();
        if($total==0){
          $new=$total1;
        }else{
          $new=$total1-$total;
        }
        
        $rooms = DB::table('rooms')
        ->get();

        return response()->json(['new'=>$new, 'total'=>$total1, 'rooms'=>$rooms]);
    }
    
    public function getRoom(){
        $rooms = DB::table('rooms')
        ->get();
        return response()->json($rooms);
    }

    public function getTotalRoom(){
        $total=DB::table('rooms')->count();
        return response()->json($total);
    }
}
