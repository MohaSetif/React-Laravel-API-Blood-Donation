<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $user = new User;

        $user->id = $request->input('id');
        $user->name = $request->input('name');
        $user->surname = $request->input('surname');
        $user->gender = $request->input('gender');
        $user->birth_date = $request->input('birth_date');
        $user->usertype = $request->input('usertype');
        $user->adr = $request->input('adr');
        $user->tel = $request->input('tel');
        $user->blood_type = $request->input('blood_type');
        $user->hospital = Auth::user()->hospital;
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));

        $user->save();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
            'token' => $token
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
        $user = User::query()->where('id', $request->user_id)->get();

        $user->update([
            'name'=>$request->name,
            'surname'=>$request->surname,
            'birth_date'=>$request->birth_date,
            'adr'=>$request->adr,
            'usertype'=>$request->usertype,
            'blood_type'=>$request->blood_type,
            'tel'=>$request->tel,
            'email'=>$request->email,
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
        User::whereId($id)->first()->delete();

        return response()->json('success');
    }

}
