<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unassign extends Model
{
    use HasFactory;
    protected $fillable = [
        'level_term', 'course_code', 'section', 'teacher', 'unassign_number',
    ];
}
