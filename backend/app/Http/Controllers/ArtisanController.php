<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Http\Resources\UserResource;
use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;


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

        $services_count = $artisan->services()->count();
        $completed_reservations = Reservation::whereHas('service', function ($q) use ($artisan) {
            $q->where('artisan_id', $artisan->id);
        })
            ->where('status', 'completed')
            ->count();


        $services = $artisan->services()->with('category')->paginate(10);

        $reviewQuery = Review::whereHas('reservation.service', function ($q) use ($artisan) {
            $q->where('artisan_id', $artisan->id);
        });

        $reviewCount = (clone $reviewQuery)->count();
        $reviewAvg = (clone $reviewQuery)->avg('rating');

        return response()->json([
            'artisan' => new UserResource($artisan),
            'statistics' => [
                'services_count' => $services_count,
                'completed_reservations' => $completed_reservations,
                'reviews_count' => $reviewCount,
                'average_rating' => round($reviewAvg ?? 0, 1),
            ],
            'services' => ServiceResource::collection($services),
            'pagination' => [
                'current_page' => $services->currentPage(),
                'last_page' => $services->lastPage(),
                'per_page' => $services->perPage(),
                'total_items' => $services->total()
            ]
        ]);





    }
}
