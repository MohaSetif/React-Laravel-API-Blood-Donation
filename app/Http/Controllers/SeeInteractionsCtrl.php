<?php

namespace App\Http\Controllers;

use App\Models\Interaction;
use Illuminate\Support\Facades\Auth;

class SeeInteractionsCtrl extends Controller
{
    public function getInteractions()
    {
        $user = Auth::user();
        return response()->json(Interaction::query()->where('donor_id', $user->id)->get());
    }
}
