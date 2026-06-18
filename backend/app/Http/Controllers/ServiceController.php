<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class ServiceController extends Controller
{
    public function index(Request $request)
    {

        $query = Service::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('title', 'LIKE', "%{$search}%");
        }

        if ($request->filled('category_id')) {
            $category_id = $request->category_id;
            $query->where('category_id', $category_id);
        }

        $services = $query->with('category', 'artisan')->paginate(1);

        return response()->json([
            'services' => ServiceResource::collection($services),
            'pagination' => [
                'current_page' => $services->currentPage(),
                'last_page' => $services->lastPage(),
                'per_page' => $services->perPage(),
                'total' => $services->total(),
            ]
        ]);
    }


    public function store(StoreServiceRequest $request)
    {

        $this->authorize('create', Service::class);

        $data = $request->validated();
        $user = auth()->user();

        if ($user->role->name === 'admin') {
            $data['artisan_id'] = $request->artisan_id;
        } else if ($user->role->name === 'artisan') {
            $data['artisan_id'] = $user->id;
        }

        $service = Service::create($data);

        return response()->json([
            'service' => new ServiceResource($service),
            'message' => 'Service created successfully'
        ]);

    }


    public function show(Service $service)
    {

        $service->load('artisan', 'category');

        return response()->json([
            'service' => new ServiceResource($service)
        ]);

    }


    public function update(StoreServiceRequest $request, Service $service)
    {

        $this->authorize('update', $service);

        $updatedData = $request->validated();

        $user = auth()->user();

        if ($user->role->name === 'admin') {
            $updatedData['artisan_id'] = $request->artisan_id;
        } else if ($user->role->name === 'artisan') {
            $updatedData['artisan_id'] = $user->id;
        }


        $service->update($updatedData);

        return response()->json([
            'service' => new ServiceResource($service),
            'message' => 'Service updated successfully'
        ]);

    }

    public function destroy(Service $service)
    {

        $this->authorize('delete', $service);

        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service Deleted successfully ',
        ]);

    }


}
