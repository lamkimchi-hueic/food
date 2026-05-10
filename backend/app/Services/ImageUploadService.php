<?php

namespace App\Services;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadService
{
    /**
     * Upload an image and return its public URL or storage path.
     * Uses Cloudinary if configured, otherwise falls back to local public disk.
     */
    public function upload(UploadedFile $file, string $folder = 'uploads'): string
    {
        if ($this->cloudinaryConfigured()) {
            $result = Cloudinary::uploadApi()->upload($file->getRealPath(), [
                'folder' => $folder,
                'resource_type' => 'image',
            ]);
            return $result['secure_url'];
        }

        // Local fallback: store in public disk and return relative path
        $path = $file->store($folder, 'public');
        return $path;
    }

    /**
     * Delete an image given its URL or storage path.
     */
    public function delete(?string $img): void
    {
        if (!$img) return;

        if (Str::startsWith($img, ['http://', 'https://'])) {
            // Cloudinary URL - extract public_id and delete
            if ($this->cloudinaryConfigured() && Str::contains($img, 'cloudinary.com')) {
                $publicId = $this->extractPublicId($img);
                if ($publicId) {
                    try {
                        Cloudinary::uploadApi()->destroy($publicId);
                    } catch (\Throwable $e) {
                        // ignore deletion errors
                    }
                }
            }
            return;
        }

        // Local path
        if (Storage::disk('public')->exists($img)) {
            Storage::disk('public')->delete($img);
        }
    }

    protected function cloudinaryConfigured(): bool
    {
        // Check if env vars are actually set (not empty defaults)
        $url = env('CLOUDINARY_URL');
        if ($url && Str::startsWith($url, 'cloudinary://') && Str::contains($url, '@') && !Str::contains($url, '://:@')) {
            return true;
        }
        return !empty(env('CLOUDINARY_CLOUD_NAME')) && !empty(env('CLOUDINARY_KEY')) && !empty(env('CLOUDINARY_SECRET'));
    }

    protected function extractPublicId(string $url): ?string
    {
        // https://res.cloudinary.com/<cloud>/image/upload/v123456/folder/file.jpg
        if (preg_match('#/upload/(?:v\d+/)?(.+?)\.[a-zA-Z]+$#', $url, $m)) {
            return $m[1];
        }
        return null;
    }
}
