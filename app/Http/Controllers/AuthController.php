<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::where('id', $request->input('id'))->first();

        if (!$user) {
            $user = new User;

            $user->id = $request->input('id');
            $user->name = $request->input('name');
            $user->surname = $request->input('surname');
            $user->gender = $request->input('gender');
            $user->birth_date = $request->input('birth_date');
            $user->adr = $request->input('adr');
            $user->tel = $request->input('tel');
            $user->hospital = $request->input('hospital');
            $user->email = $request->input('email');
            $user->password = bcrypt($request->input('password'));


            $image = $request->file('image');
            $photoname = date('YmdHis').'.'.$image->extension();
            $filePath = public_path('/uploads/images/');
            $image->move($filePath, $photoname);
            $user->image = $photoname;

            $user->save();
            $token = $user->createToken('main')->plainTextToken;

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user,
                'token' => $token
            ], 201);


        }
        elseif($user && $user->name == 'regular_user')
        {
            $user = User::whereId($request->input('id'))->first();

            $user->update([
                'name'=>$request->name,
                'surname'=>$request->surname,
                'gender'=>$request->gender,
                'birth_date'=>$request->birth_date,
                'adr'=>$request->adr,
                'tel'=>$request->tel,
                'hospital'=>$request->hospital,
                'email'=>$request->email,
                'password'=>$request->password,
            ]);
    
            $token = $user->createToken('main')->plainTextToken;
    
            return response([
                'user' => $user,
                'token' => $token
            ]);
        }

       
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);
    
        // Check if the credentials match either the user's email or ID
        $user = User::where('email', $credentials['email'])->first();
    
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }
    
        Auth::login($user, $remember);
    
        $token = $user->createToken('main')->plainTextToken;
    
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }
}
