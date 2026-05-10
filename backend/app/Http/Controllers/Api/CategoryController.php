<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'nullable|string|max:1000',
            'img' => 'nullable|image|max:2048',
        ]);

        unset($validated['img']);

        $category = Category::create($validated);

        if ($request->hasFile('img')) {
            $category->addMediaFromRequest('img')->toMediaCollection('images');
        }

        return response()->json($category, 201);
    }

    public function show(Category $category)
    {
        return response()->json($category->load('products'));
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'nullable|string|max:1000',
            'img' => 'nullable|image|max:2048',
        ]);

        unset($validated['img']);

        $category->update($validated);

        if ($request->hasFile('img')) {
            $category->clearMediaCollection('images');
            $category->addMediaFromRequest('img')->toMediaCollection('images');
        }

        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->noContent();
    }
}
