<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Models\Review;


class AdminReviewController extends Controller
{



    public function reviews()
    {


        $admin = auth()->user();

        if ($admin->role->name !== 'admin') {
            abort(403, "Unauthorize");
        }

        $reviews = Review::with(['reservation.service', 'reservation.client'])->latest()->paginate(10);

        return response()->json(
            [
                'reviews' => ReviewResource::collection($reviews),
                'pagination' => [
                    'current_page' => $reviews->currentPage(),
                    'last_page' => $reviews->lastPage(),
                    'per_page' => $reviews->perPage(),
                    'total_items' => $reviews->total(),
                ]
            ]
        );


    }

    public function destroy(Review $review)
    {
        $admin = auth()->user();

        if ($admin->role->name !== 'admin') {
            abort(403, "Unauthorize");
        }

        $review->delete();

        return response()->json([
            'message' => "Review deleted successfully"
        ]);
    }




}
