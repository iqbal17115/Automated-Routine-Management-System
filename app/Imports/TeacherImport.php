<?php

namespace App\Imports;

use App\Models\Teacher;
use Maatwebsite\Excel\Concerns\ToModel;

class TeacherImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Teacher([
            'name'=>$row[0],
            'designation'=>$row[1],
            'email'=>$row[2],
            'phone'=>$row[3],
            'initial'=>$row[4],
            'employee_id'=>$row[5],
            'off_day'=>$row[6]
        ]);
    }
}
