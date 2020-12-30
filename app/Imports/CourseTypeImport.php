<?php

namespace App\Imports;

use App\Models\CourseType;
use Maatwebsite\Excel\Concerns\ToModel;

class CourseTypeImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new CourseType([
            'course_code'=>$row[0],
            'course_title'=>$row[1],
            'credit'=>$row[2],
            'type'=>$row[3]
        ]);
        return $row;
    }
}
