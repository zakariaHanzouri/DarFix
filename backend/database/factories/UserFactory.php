<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'city' => fake()->city(),
            'phone' => fake()->numerify('06########'),
            'password' => Hash::make('password'),
            'is_active' => true,

        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function client()
    {
        return $this->state(fn() => [
            'role_id' => Role::where('name', 'client')->value('id')
        ]);
    }

    public function artisan()
    {
        return $this->state(fn() => [
            'role_id' => Role::where('name', 'artisan')->value('id')
        ]);
    }

    public function admin()
    {
        return $this->state(
            fn() =>
            [
                'role_id' => Role::where('name', 'admin')->value('id')
            ]
        );
    }
}
