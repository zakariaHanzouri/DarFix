<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->client()->count(40)->create();
        User::factory()->artisan()->count(15)->create();
        User::factory()->admin()->count(1)->create();
    }
}
