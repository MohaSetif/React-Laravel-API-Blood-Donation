<?php

namespace App\Http\Controllers;

use App\Models\Interaction;
use App\Models\TemporaryUser;
use App\Models\User;
use Illuminate\Http\Request;

class InteractionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Interaction::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
{
    $interaction = new Interaction;
    $user = User::where('id', $request->input('donor_id'))->first();

    if (!$user) {
        $user = new User;
        $user->id = $request->input('donor_id');
        $user->email = $user->id.'@gmail.com';
        $user->save();
        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    $interaction->donor_id = $request->input('donor_id');
    $interaction->receiver_id = $request->input('receiver_id');
    $interaction->doctor_id = $request->input('doctor_id');
    $interaction->transfusion_type = $request->input('transfusion_type');
    $interaction->transfusion_status = $request->input('transfusion_status');

    $interaction->save();

    return response()->json([
        'message' => 'Interaction created successfully',
        'interaction' => $interaction,
    ], 201);
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
