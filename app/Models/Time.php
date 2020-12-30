<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Time extends Model
{
    use HasFactory;
    protected $fillable = [
        'break_type', 'start_time', 'end_time', 'after_n_class', 'break_duration', 'class_duration',
    ];
}
