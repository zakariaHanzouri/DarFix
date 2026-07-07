<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Role;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        $artisanRoleId = Role::where('name', 'artisan')->first()->id;

        $artisanId = User::where('role_id', $artisanRoleId)->inRandomOrder()->value('id');

        

        return [
            'title' => fake()->randomElement([
                'Kitchen Plumbing',
                'Bathroom Repair',
                'House Painting',
                'Electrical Installation',
                'AC Maintenance',
                'Garden Cleaning',
                'Furniture Assembly',
                'Door Repair',
                'Window Installation',
                'Water Leak Repair',
            ]),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 100, 1500),
            'duration' => fake()->randomElement([
                30,
                45,
                60,
                90,
                120,
                180
            ]),
            'image' => fake()->randomElement([
                'service1.jpg',
                'service2.jpg',
                'service3.jpg',
                'service4.jpg',
                'service5.jpg',
            ]),
            'artisan_id' => $artisanId,
            'category_id' => Category::inRandomOrder()->value('id'),
        ];
    }
}
