<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
     /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(Auth::refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }


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
            $filePath = public_path('/uploads');
            $image->move($filePath, $photoname);
            $user->image = $photoname;

            $user->save();
            
            $payload = [
                'id' => $user->id,
                'usertype' => $user->usertype,
                'iat' => time(),
                'exp' => time() + (60 * 60) // token will expire in 1 hour
            ];

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user,
                'token' => JWTAuth::fromUser($user, $payload)
            ], 201);


        }
        elseif($user && $user->name == 'regular_user')
        {
            $user = User::whereId($request->input('id'))->first();

            $image = $request->file('image');
            $photoname = date('YmdHis').'.'.$image->extension();
            $filePath = public_path('/uploads');
            $image->move($filePath, $photoname);
            $user->image = $photoname;

            $user->update([
                'name'=>$request->name,
                'surname'=>$request->surname,
                'gender'=>$request->gender,
                'birth_date'=>$request->birth_date,
                'adr'=>$request->adr,
                'tel'=>$request->tel,
                'hospital'=>$request->hospital,
                'email'=>$request->email,
                'password'=>bcrypt($request->password),
                'image'=>$user->image
            ]);

            
    
           $payload = [
                'sub' => auth()->user()->id,
                'email' => auth()->user()->email,
                'usertype' => $user->usertype,
                'iat' => time(),
                'exp' => time() + (60 * 60) // token will expire in 1 hour
            ];

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user,
                'token' => JWTAuth::fromUser(auth()->user(), $payload)
            ], 201);
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
        $payload = [
            'sub' => auth()->user()->id,
            'email' => auth()->user()->email,
            'usertype' => $request->usertype,
            'iat' => time(),
            'exp' => time() + (60 * 60) // token will expire in 1 hour
        ];
    
        return response()->json([
            'token' => JWTAuth::fromUser(auth()->user(), $payload),
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
            'user' => $user
        ]);
    }


    public function logout(Request $request)
    {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }
}
