<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */



    public function definition(): array
    {

        $categories = [
            ['Plumber', 'plumber.png'],
            ['Electrician', 'electrician.png'],
            ['Painter', 'painter.png'],
            ['Cleaning', 'cleaning.png'],
            ['Carpenter', 'carpenter.png'],
            ['Gardening', 'gardening.png'],
            ['AC Repair', 'ac.png'],
            ['Moving', 'moving.png'],
        ];

        $categorie = fake()->unique()->randomElement($categories);

        return [
            "name" => $categorie[0],
            "icon" => $categorie[1],
        ];
    }
}
