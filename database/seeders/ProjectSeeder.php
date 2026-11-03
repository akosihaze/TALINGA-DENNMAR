<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Sample projects taken from the original PHP portfolio.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Photo Enhancement, Etc.',
                'category' => 'Photo Editing',
                'description' => 'This image editing project focuses on enhancing the overall quality of photos through careful color correction, lighting adjustment, and background cleanup.',
                'tools' => 'Photoshop, Canva',
                'image' => 'assets/photo-enhancement.png',
                'date_completed' => '2026-05-01',
            ],
            [
                'title' => '3D Environment Design, Etc.',
                'category' => '3D Design',
                'description' => 'This 3D environment project involves creating immersive visuals using basic assets, lighting, and layout.',
                'tools' => null,
                'image' => 'assets/3d-design.png',
                'date_completed' => '2026-05-01',
            ],
            [
                'title' => 'Cinematic Video Edit, Etc.',
                'category' => 'Video Editing',
                'description' => 'A cinematic style video editing project that emphasizes mood and storytelling through smooth transitions and lighting.',
                'tools' => 'Premiere Pro, After Effects, CapCut',
                'image' => 'assets/cinematic-edit.png',
                'date_completed' => '2026-05-01',
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['title' => $project['title']], $project);
        }
    }
}
