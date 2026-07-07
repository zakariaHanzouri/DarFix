<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Notification;
use App\Models\Reservation;
use Illuminate\Validation\ValidationException;


class ArtisanReservationController extends Controller
{


    public function index()
    {
        $artisanId = auth()->user()->id;

        $reservations = Reservation::whereHas('service', function ($query) use ($artisanId) {
            $query->where('artisan_id', $artisanId);
        })->with('client', 'service')->paginate(10);

        return response()->json([
            'reservations' => ReservationResource::collection($reservations),
            'pagination' => [
                'current_page' => $reservations->currentPage(),
                'last_page' => $reservations->lastPage(),
                'per_page' => $reservations->perPage(),
                'total_items' => $reservations->total()
            ]
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

        Notification::create([
            'user_id' => $reservation->client_id,
            'title' => 'Resevation Accepted',
            'message' => 'Your reservation has been accepted.'
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
        Notification::create([
            'user_id' => $reservation->client_id,
            'title' => 'Resevation Accepted',
            'message' => 'Your reservation has been rejected.'
        ]);

        return response()->json([
            'reservation' => new ReservationResource(
                $reservation->load('client', 'service')
            ),
            'message' => 'Reservation rejected successfully'
        ]);
    }

}
