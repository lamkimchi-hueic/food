<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Banner extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = ['key', 'img', 'title', 'content', 'link'];

    protected $appends = ['media_url'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')->singleFile();
    }

    public function getMediaUrlAttribute(): ?string
    {
        if ($this->img) {
            if (str_starts_with($this->img, 'http')) {
                return $this->img;
            }
            return url('storage/' . $this->img);
        }
        $media = $this->getFirstMedia('image');
        return $media ? $media->getFullUrl() : null;
    }
}
