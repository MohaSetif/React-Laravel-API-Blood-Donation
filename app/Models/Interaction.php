<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Interaction extends Model
{
    use HasFactory;
    protected $fillable = ['donor_id', 'receiver_id', 'doctor_id', 'transfusion_type', 'transfusion_status'];

    public function donor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'donor_id', 'id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(Patient::class, 'receiver_id', 'id');
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'doctor_id', 'id');
    }
}
