<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['notification_text', 'hospital', 'current_hospital', 'mark_as_read'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'current_hospital', 'hospital');
    }
}
