<?php

namespace App\Http\Controllers\Commity;

use App\Models\Day;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use DB;

class DayController extends Controller
{
    public function store(Request $request){

        $day=DB::table('days')->insert(
            ['name'=>$request->name, 'start_time'=>date("g:i A", strtotime($request->start_time)), 'end_time'=>date("g:i A", strtotime($request->end_time))]
        );
        
        $total=DB::table('days')->count();
        $days=DB::table('days')->get();
        return response()->json(['total'=>$total, 'days'=>$days]);

    }

    public function getDay(){

        $days=DB::table('days')->get();

        return response()->json($days);
        
    }
}
