<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Category extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = ['name', 'slug', 'desc', 'img'];

    protected $appends = ['media_url'];

    protected static function booted()
    {
        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });

        static::updating(function ($category) {
            if ($category->isDirty('name') && !$category->isDirty('slug')) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')->singleFile();
    }

    public function getMediaUrlAttribute(): ?string
    {
        $media = $this->getFirstMediaUrl('images');
        if ($media) {
            return $media;
        }
        if ($this->img) {
            return asset('storage/' . $this->img);
        }
        return null;
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
