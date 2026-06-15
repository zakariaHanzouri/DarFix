<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Requests\DeleteCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'categories' => CategoryResource::collection($categories)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $data = $request->validated();

        $category = Category::create($data);

        return response()->json([
            'category' => new CategoryResource($category)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::findOrFail($id);

        return response()->json([
            'category' => new CategoryResource($category)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, string $id)
    {
        $category = Category::findOrFail($id);

        $updatedData = $request->validated();

        $category->update($updatedData);

        return response()->json([
            'category' => new CategoryResource($category)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteCategoryRequest $request, string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ], 200);
    }
}
