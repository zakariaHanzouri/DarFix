<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory
{
    protected $model = Reservation::class;

    public function definition(): array
    {
        return [
            'client_id' => User::whereHas('role', function ($q) {
                $q->where('name', 'client');
            })->inRandomOrder()->first()->id,

            'service_id' => Service::inRandomOrder()->first()->id,

            'reservation_date' => fake()->dateTimeBetween('-2 months', '+1 month'),

            'status' => fake()->randomElement([
                'pending',
                'accepted',
                'rejected',
                'completed'
            ]),
        ];
    }
}