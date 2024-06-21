<?php

namespace App\Http\Controllers;

use App\Models\Appointments;
use Illuminate\Support\Facades\Auth;

class SeeAppointmentsCtrl extends Controller
{
    public function getAppointments()
    {
        $user = Auth::user();
        return response()->json(Appointments::query()->where('user_id', $user->id)->get());
    }
}
