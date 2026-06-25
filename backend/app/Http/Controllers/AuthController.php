<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{


    public function register(StorePostRequest $request)
    {
        $data = $request->validated();

        $user = User::create($data);

        $user->load('role');

        $token = $user->createToken("ACCESS_TOKEN")->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }


    public function login(LoginRequest $request){


        


        $credentials= $request->validated();

        $user=User::where('email','=',$credentials['email'])->first();

        if (!$user->is_active) {
            return throw ValidationException::withMessages([
                'message'=>'Your account is suspended'
            ]);
        }

        if (!Auth::attempt($credentials)) {
             throw ValidationException::withMessages([
                'email'=>'Invalid credentials.'
             ]);
        }

        $user=auth()->user();
        $user->load('role');

        $token=$user->createToken("ACCESS_TOKEN")->plainTextToken;

        return response()->json([
            'user'=>new UserResource($user),
            'token'=>$token
        ]);

    }


    public function logout(Request $request){
        
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'success'=>true
        ],200);
    }
    public function getUser(){
        $user=auth()->user();
        $user->load('role');
        return response()->json([
            'user'=> new UserResource($user),
        ]);
    }
}



