<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            

            'rating' => fake()->numberBetween(1, 5),

            'comment' => fake()->optional(0.8)->sentence(12),
        ];
    }
}
