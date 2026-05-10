<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $imageService;

    public function __construct(ImageUploadService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index(Request $request)
    {
        $query = Product::with('category');

        if ($request->has('category') && $request->category != '') {
            $query->where('category_id', $request->category);
        }

        if ($request->has('search') && $request->search != '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('random')) {
            $query->inRandomOrder()->limit($request->get('limit', 4));
            return response()->json($query->get());
        }

        $products = $query->paginate($request->get('per_page', 8));

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with('category')->findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'desc' => 'nullable|string|max:1000',
            'price' => 'required|numeric',
        ]);

        if ($request->hasFile('img')) {
            $validated['img'] = $this->imageService->upload($request->file('img'), 'products');
        } else {
            unset($validated['img']);
        }

        $product = Product::create($validated);

        return response()->json($product->load('category'), 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'desc' => 'nullable|string|max:1000',
            'price' => 'required|numeric',
        ]);

        if ($request->hasFile('img')) {
            $this->imageService->delete($product->img);
            $validated['img'] = $this->imageService->upload($request->file('img'), 'products');
        } else {
            unset($validated['img']);
        }

        $product->update($validated);

        return response()->json($product->fresh()->load('category'));
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $this->imageService->delete($product->img);
        $product->delete();
        return response()->noContent();
    }
}
