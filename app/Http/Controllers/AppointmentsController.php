<?php

namespace App\Http\Controllers;

use App\Models\Appointments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        return response()->json(Appointments::query()->latest()->get());
    }

 
    public function store(Request $request)
    {
        $user = Auth::user();
        $appointment = new Appointments;

        $appointment->user_id = $user->id;
        $appointment->name = $user->name;
        $appointment->surname = $user->surname;
        $appointment->gender = $user->gender;
        $appointment->birth_date = $user->birth_date;
        $appointment->adr = $user->adr;
        $appointment->tel = $user->tel;
        $appointment->hospital = $user->hospital;
        $appointment->email = $user->email;
        $appointment->usertype = $user->usertype;
        $appointment->date = $request->input('date');
        $appointment->time = $request->input('time');

        $appointment->save();

        return response()->json([
            'message' => 'Appointment created successfully',
            'appointment' => $appointment,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
