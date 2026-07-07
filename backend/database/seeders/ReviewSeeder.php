<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Review;

use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $completedReservations=Reservation::where('status','completed')->get();

        foreach($completedReservations as $reservation){
            if ($reservation->review) {
                continue;
            }

            Review::factory()->create([
                'reservation_id'=>$reservation->id
            ]);
        }
    }
}
