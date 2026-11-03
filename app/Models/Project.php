<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * Allowed values for the "category" field (used by validation AND the React <select>).
     */
    public const CATEGORIES = [
        'Photo Editing',
        'Video Editing',
        '3D Design',
        'Motion Graphics',
        'Other',
    ];

    /**
     * Mass-assignment whitelist: only these columns can be filled by Project::create() / update().
     */
    protected $fillable = [
        'title',
        'category',
        'description',
        'tools',
        'project_url',
        'image',
        'date_completed',
    ];

    /**
     * Always include "image_url" when the model is sent to React as JSON.
     */
    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return [
            'date_completed' => 'date:Y-m-d',
        ];
    }

    /**
     * Full public URL of the cover image (or null when there is no image).
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::get(fn () => $this->image ? asset($this->image) : null);
    }
}
