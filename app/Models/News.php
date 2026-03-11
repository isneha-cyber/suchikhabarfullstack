<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class News extends Model
{
    protected $fillable = [
        'image',
        'heading',
        'blog_by',
        'description',
        'published_at',
        'category',
        'pdf',
        'slug' // Added slug to fillable
    ];

    protected static function boot()
    {
        parent::boot();

        // Before creating
        // static::creating(function ($news) {
        //     if (empty($news->slug)) {
        //         $news->slug = Str::slug($news->heading);
        //     }
        // });

        // // After creating -> append ID to make slug unique
        // static::created(function ($news) {
        //     $baseSlug = Str::slug($news->heading);
        //     $news->slug = $baseSlug . '-' . $news->id;
        //     $news->saveQuietly(); // prevents infinite loop
        // });

        // // Before updating -> update slug if heading changes
        // static::updating(function ($news) {
        //     if ($news->isDirty('heading')) {
        //         $baseSlug = Str::slug($news->heading);
        //         $news->slug = $baseSlug . '-' . $news->id;
        //     }
        // });
        static::saving(function ($model) {
            $slug = preg_replace('/[\s\/]+/', '-', $model->heading);
            $slug = str_replace('?', '', $slug);
            $model->slug = $slug;
        });
    }



public function category()
{
    return $this->belongsTo(Category::class);
}
}