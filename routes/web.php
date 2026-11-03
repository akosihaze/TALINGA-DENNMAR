<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

// Public portfolio page
Route::get('/', [PortfolioController::class, 'index'])->name('portfolio');

// Projects CRUD (management pages). The "show" route is not needed, so it is excluded.
// Creates: index, create, store, edit, update, destroy
Route::resource('projects', ProjectController::class)->except(['show']);
