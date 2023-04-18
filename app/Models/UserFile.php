<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserFile extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'surname',
        'gender',
        'birth_date',
        'adr',
        'tel',
        'email',
        'blood_type'
    ];
}
