<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected $imageService;

    public function __construct(ImageUploadService $imageService)
    {
        $this->imageService = $imageService;
    }

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

        if ($request->hasFile('img')) {
            $validated['img'] = $this->imageService->upload($request->file('img'), 'categories');
        } else {
            unset($validated['img']);
        }

        $category = Category::create($validated);

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

        if ($request->hasFile('img')) {
            $this->imageService->delete($category->img);
            $validated['img'] = $this->imageService->upload($request->file('img'), 'categories');
        } else {
            unset($validated['img']);
        }

        $category->update($validated);

        return response()->json($category->fresh());
    }

    public function destroy(Category $category)
    {
        $this->imageService->delete($category->img);
        $category->delete();
        return response()->noContent();
    }
}
