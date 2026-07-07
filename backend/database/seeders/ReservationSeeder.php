<?php

namespace Database\Seeders;

use App\Models\Reservation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $created = 0;


        while ($created < 100) {

            $reservation = Reservation::factory()->make();

            if ($reservation->status === "pending" && Reservation::where('client_id', $reservation->client_id)->where('service_id', $reservation->service_id)->where('status', 'pending')->exists()) {
                continue;
            }

            $reservation->save();
            $created++;
        }


    }
}
