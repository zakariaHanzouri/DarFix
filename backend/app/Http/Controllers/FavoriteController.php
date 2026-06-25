<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{


    public function index()
    {
        $client = auth()->user();

        if ($client->role->name !== "client") {
            abort(403, 'Unauthorize');
        }

        $favoriteServices = $client->favoriteServices()->with(['category', 'artisan'])->get();

        return response()->json([
            'favoriteServices' => ServiceResource::collection($favoriteServices)
        ]);

    }


    public function store(Service $service)
    {
        $client = auth()->user();
        if ($client->role->name !== "client") {
            abort(403, 'Unauthorize');
        }

        $favExists = $client->favoriteServices()->where('service_id', $service->id)->exists();

        if ($favExists) {
            return response()->json([
                'message' => "you already add this service to your favorite"
            ]);
        }

        $client->favoriteServices()->syncWithoutDetaching($service->id);

        return response()->json([
            'message' => "Added to you favorite"
        ]);
    }
    public function destroy(Service $service)
    {
        $client = auth()->user();
        if ($client->role->name !== "client") {
            abort(403, 'Unauthorize');
        }

        $client->favoriteServices()->detach($service->id);

        return response()->json([
            'message' => "removed from  your favorite list"
        ]);
    }




}
