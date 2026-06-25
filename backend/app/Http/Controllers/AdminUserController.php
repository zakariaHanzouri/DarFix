<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;


class AdminUserController extends Controller
{




    public function users()
    {

        $user = auth()->user();

        if ($user->role->name !== "admin") {
            abort(403, "Unauthorize Sorry");
        }

        $users = User::with("role")->where('id', '!=', $user->id)->paginate(10);
        return response()->json([
            'users' => UserResource::collection($users),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total_page' => $users->total()
            ]
        ]);
    }

    public function artisans()
    {
        $user = auth()->user();

        if ($user->role->name !== "admin") {
            abort(403, "Unauthorize Sorry");
        }

        $artisans = User::with("role")->whereHas('role', function ($query) {
            $query->where('name', 'artisan');
        })->paginate(10);
        return response()->json([
            'artisans' => UserResource::collection($artisans),
            'pagination' => [
                'current_page' => $artisans->currentPage(),
                'last_page' => $artisans->lastPage(),
                'per_page' => $artisans->perPage(),
                'total_page' => $artisans->total()
            ]
        ]);
    }

    public function clients()
    {
        $user = auth()->user();

        if ($user->role->name !== "admin") {
            abort(403, "Unauthorize Sorry");
        }

        $clients = User::with("role")->whereHas('role', function ($query) {
            $query->where('name', 'client');
        })->paginate(10);
        return response()->json([
            'clients' => UserResource::collection($clients),
            'pagination' => [
                'current_page' => $clients->currentPage(),
                'last_page' => $clients->lastPage(),
                'per_page' => $clients->perPage(),
                'total_items' => $clients->total()
            ]
        ]);
    }


    public function toggleStatus(User $user)
    {

        $admin = auth()->user();

        if ($admin->role->name !== "admin") {
            abort(403, "Unauthorize Sorry");
        }

        if ($admin->id === $user->id) {
            abort(403, "You cannot suspend yourself");
        }




        $user->update([
            'is_active' => !$user->is_active
        ]);



        return response()->json([
            'message' => "change status successfully"
        ]);


    }


}
