<?php

namespace App\Http\Controllers\Commity;

use App\Models\Type;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\TypeImport;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use DB;

class TypeController extends Controller
{
    
    public function store(Request $request){

        $type=DB::table('types')->insert(
            ['type'=>$request->type]
        );
        
        $total=DB::table('types')->count();
        $type=DB::table('types')->get();

        return response()->json(['types'=>$type, 'total'=>$total]);

    }

    public function getDay(){

        $types=DB::table('types')->get();

        return response()->json($types);
        
    }
    
    public function storeCSV(Request $request){

        $total=DB::table('types')->count();

        $file=$request->file('myFile');
        Excel::import(new TypeImport, $file);

        $types=DB::table('types')->get();

        $total1=DB::table('types')->count();
        if($total==0){
          $new=$total1;
        }else{
          $new=$total1-$total;
        }

        return response()->json(['new'=>$new, 'total'=>$total1, 'types'=>$types]);
    }
}
