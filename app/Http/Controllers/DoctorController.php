<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserFile;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(User::first()->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new UserFile;

        $user->name = $request->input('name');
        $user->surname = $request->input('surname');
        $user->gender = $request->input('gender');
        $user->birth_date = $request->input('birth_date');
        $user->adr = $request->input('adr');
        $user->tel = $request->input('tel');
        $user->email = $request->input('email');
        $user->blood_type = $request->input('blood_type');
        $user->status = $request->input('status');

        $user->save();

        return response()->json([
            'message' => 'User file created successfully',
            'user' => $user
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
        return response()->json(User::whereId($id)->first());
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
        $user = User::whereId($id)->first();

        $user->update([
            'name'=>$request->name,
            'surname'=>$request->surname,
            'birth_date'=>$request->birth_date,
            'adr'=>$request->adr,
            'email'=>$request->email,
            'blood_type'=>$request->blood_type,
            'status'=>$request->status,
        ]);
        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
    }
}
