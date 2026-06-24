<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Reservation;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ReviewController extends Controller
{





    public function store(StoreReviewRequest $request)
    {

        $reservation = Reservation::findOrFail($request->reservation_id);
        $user = auth()->user();

        

        if ($user->id !== $reservation->client_id) {
            abort(403);
        }

        if ($reservation->status !== "completed") {
            throw ValidationException::withmessages([
                "message" => "the resevation is not completed yet"
            ]);
        }

        if ($reservation->review) {
            throw ValidationException::withmessages([
                "message" => "the resevation is reviewed"
            ]);
        }

        $data = $request->validated();
        $review = Review::create($data);

        return response()->json(["review" => new ReviewResource($review),
        "message"=>"Review  created successfully "
        ],201);

    }




}
