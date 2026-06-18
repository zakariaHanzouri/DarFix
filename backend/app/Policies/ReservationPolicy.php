<?php

namespace App\Policies;

use App\Models\Reservation;
use App\Models\User;

class ReservationPolicy
{
    /**
     * Create a new policy instance.
     */
    public function create(User $user)
    {
        return $user->role->name==="client"  ;
    }
   public function show(User $user,Reservation $reservation){
        return $user->role->name==='client' && $user->id === $reservation->client_id;
    }

    public function update(User $user,Reservation $reservation){
        return $user->role->name==='client' && $user->id === $reservation->client_id;
    }
    public function delete(User $user,Reservation $reservation){
        return $user->role->name==='client' && $user->id === $reservation->client_id;
    }

    public function accept(User $user,Reservation $reservation){
        return $user->role->name==='artisan' && $user->id===$reservation->service->artisan_id;
    }
    public function reject(User $user,Reservation $reservation){
        return $user->role->name==='artisan' && $user->id===$reservation->service->artisan_id;
    }
    public function complete(User $user,Reservation $reservation){
        return $user->role->name==='client' && $user->id===$reservation->client_id;
    }
}
