<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Notification;
use App\Models\Reservation;
use Illuminate\Validation\ValidationException;


class ReservationController extends Controller
{
    public function index()
    {
        $userId = auth()->user()->id;

        $resrvations = Reservation::with('client','service')->where('client_id', $userId)->get();
        $resrvations->load('client', 'service');
        return response()->json([
            'resrvations' => ReservationResource::collection($resrvations)
        ]);

    }

    public function store(StoreReservationRequest $request)
    {
        $this->authorize('create',Reservation::class);
        $data = $request->validated();
        $data['status']='pending';
        $exists = Reservation::where('client_id', $data['client_id'])
            ->where('service_id', $data['service_id'])
            ->where('status', 'pending')
            ->exists();

        if ($exists) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'message' => 'You already have a pending reservation for this service'
            ]);

        }

        $reservation = Reservation::create($data);

        Notification::create([
            "user_id"=>$reservation->service->artisan_id,
            "title"=>"New Reservation",
            "message"=>"You have received a new reservation  for ".$reservation->service->title,
        ]);

        return response()->json([
            'reservation' => new ReservationResource($reservation),
            'message' => 'Created Successfully'
        ]);

    }


    public function show(Reservation $reservation)
    {
        $this->authorize('show',$reservation);
        $reservation->load("client", "service");
        return response()->json([
            'reservation' => new ReservationResource($reservation),
            
        ]);
    }

    public function update(StoreReservationRequest $request, Reservation $reservation)
    {

        $this->authorize('update',$reservation);

        $data = $request->validated();

        if($reservation->status!=="pending"){
             throw ValidationException::withMessages([
                'message'=>'Sorry Cannot reschedule this reservation'
             ]);   
        }

        if ($reservation->reservation_date===$data['reservation_date']) {
            throw ValidationException::withMessages([
                'message'=>'Please choose a different date.'
             ]); 
        }

        $reservation->update($data);

        $reservation->load('client', 'service');

        return response()->json([
            'reservation' => new ReservationResource($reservation),
            'message' => 'Reservation rescheduled successfully'
        ]);
    }

    public function destroy( Reservation $reservation){
        $this->authorize('delete',$reservation);
        $reservation->delete();
        return response()->json([
            'success'=>true,
            'message' => 'Deleted Successfully'
        ]);
    }

    public function complete(Reservation $reservation){

        $this->authorize('complete',$reservation);

        if ($reservation->status !=="accepted") {
            throw ValidationException::withMessages([
                'message' => 'Cannot make this resevation as completed'
            ]);
        }

        $reservation->update([
            'status'=>'completed'
        ]);
        return response()->json([
            'reservation' => new ReservationResource(
                $reservation->load('client', 'service')
            ),
            'message' => 'Reservation completed successfully'
        ]);
    }
}
