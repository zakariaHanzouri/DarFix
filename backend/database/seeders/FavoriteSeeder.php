<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients=User::whereHas('role',function($q){
            $q->where('name','client');
        })->get();

        foreach ($clients as $client) {
            $services=Service::inRandomOrder()->take(rand(3,8))->pluck('id');

            $client->favoriteServices()->syncWithoutDetaching($services);
        }
    }
}
