<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'name',
        'surname',
        'gender',
        'birth_date',
        'adr',
        'tel',
        'hospital',
        'blood_type',
        'status'
    ];

    public function interaction(): hasMany{
        return $this->hasMany(Interaction::class);
    }
}
