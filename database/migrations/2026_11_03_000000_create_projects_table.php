<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Creates the "projects" table - the dynamic section of the portfolio.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->unique();      // project name (must be unique)
            $table->string('category', 50);              // Photo Editing, Video Editing, 3D Design...
            $table->text('description');                 // what the project is about
            $table->string('tools', 150)->nullable();    // software used (tech stack)
            $table->string('project_url')->nullable();   // link to the finished work
            $table->string('image')->nullable();         // path of the cover image
            $table->date('date_completed');              // when the project was finished
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
