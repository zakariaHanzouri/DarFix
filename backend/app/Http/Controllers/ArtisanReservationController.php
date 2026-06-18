<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Validation\ValidationException;


class ArtisanReservationController extends Controller
{


    public function index()
    {
        $artisanId = auth()->user()->id;

        $reservations = Reservation::whereHas('service', function ($query) use ($artisanId) {
            $query->where('artisan_id', $artisanId);
        })->with('client', 'service')->get();

        return response()->json([
            'reservations' => ReservationResource::collection($reservations)
        ]);

    }


    public function accept(Reservation $reservation)
    {

        $this->authorize('accept', $reservation);

        if ($reservation->status !== "pending") {
            throw ValidationException::withMessages([
                'message' => 'it\'s not pending you already ' . $reservation->status
            ]);
        }

        $reservation->update([
            "status" => "accepted"
        ]);

        return response()->json([
            'reservation' => new ReservationResource(
                $reservation->load('client', 'service')
            ),
            'message' => 'Reservation accepted successfully'
        ]);
    }

    public function reject(Reservation $reservation)
    {
        $this->authorize('reject', $reservation);
        if ($reservation->status !== "pending") {
            throw ValidationException::withMessages([
                'message' => 'it\'s not pending you already ' . $reservation->status
            ]);
        }

        $reservation->update([
            "status" => "rejected"
        ]);

        return response()->json([
            'reservation' => new ReservationResource(
                $reservation->load('client', 'service')
            ),
            'message' => 'Reservation rejected successfully'
        ]);
    }

}
