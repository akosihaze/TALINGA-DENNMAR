<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Public portfolio page. The "My Projects" section reads from the database.
     */
    public function index(): Response
    {
        return Inertia::render('Portfolio', [
            'projects' => Project::orderByDesc('date_completed')->orderByDesc('id')->get(),
        ]);
    }
}
