<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Http\Resources\UserResource;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ArtisanController extends Controller
{
    public function show($id)
    {
        //1. Verify user is artisan

        // 2. Count services

        // 3. Count completed reservations

        // 4. Load artisan services

        // 5. Return response
        $artisan = User::findOrFail($id);
        if ($artisan->role->name !== "artisan") {
           abort(404);
        }

        $services_count=$artisan->services()->count();
        $completed_reservations=Reservation::whereHas('service',function($q) use ($artisan){
            $q->where('artisan_id',$artisan->id);
        } )
        ->where('status','completed')
        ->count();
        
        
        $services=$artisan->services()->with('category')->get();
        

        return response()->json([
            'artisan'=>new UserResource($artisan),
            'statistics'=>[
                'services_count'=>$services_count,
                'completed_reservations'=>$completed_reservations,
            ],
            'services'=>ServiceResource::collection($services)
        ]);

        



    }
}
