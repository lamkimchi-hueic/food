<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    protected $imageService;

    public function __construct(ImageUploadService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index()
    {
        return response()->json(Banner::all());
    }

    public function show($key)
    {
        $banner = Banner::where('key', $key)->firstOrFail();
        return response()->json($banner);
    }

    public function update(Request $request, $key)
    {
        $banner = Banner::where('key', $key)->first();
        
        if (!$banner) {
            $banner = new Banner();
            $banner->key = $key;
        }

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'img' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('img')) {
            if ($banner->img) {
                $this->imageService->delete($banner->img);
            }
            $validated['img'] = $this->imageService->upload($request->file('img'), 'banners');
        }

        $banner->fill($validated);
        $banner->save();

        return response()->json($banner->fresh());
    }
}
