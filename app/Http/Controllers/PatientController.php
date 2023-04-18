<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Patient::query()->where('hospital', Auth::user()->hospital)->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new Patient;
        $doc = Auth::user();

        $user->id = $request->input('id');
        $user->name = $request->input('name');
        $user->surname = $request->input('surname');
        $user->gender = $request->input('gender');
        $user->birth_date = $request->input('birth_date');
        $user->adr = $request->input('adr');
        $user->tel = $request->input('tel');
        $user->hospital = $doc->hospital;
        $user->blood_type = $request->input('blood_type');
        $user->status = $request->input('status');

        $user->save();

        return response()->json([
            'message' => 'Patient created successfully',
            'user' => $user
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
        return response()->json(Patient::whereId($id)->first());
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
        $user = Patient::whereId($id)->first();

        $user->update([
            'name'=>$request->name,
            'surname'=>$request->surname,
            'birth_date'=>$request->birth_date,
            'adr'=>$request->adr,
            'tel'=>$request->tel,
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
        Patient::whereId($id)->first()->delete();

        return response()->json('success');
    }
}
