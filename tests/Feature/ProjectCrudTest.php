<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Automated version of the Part 4 Validation Test Table.
 * Run with: php artisan test
 */
class ProjectCrudTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // The Vite build is not needed to test the backend.
        $this->withoutVite();
    }

    private function validData(array $overrides = []): array
    {
        return array_merge([
            'title' => 'Wedding Highlight Reel',
            'category' => 'Video Editing',
            'description' => 'A short cinematic highlight video with color grading and smooth transitions.',
            'tools' => 'Premiere Pro',
            'project_url' => 'https://example.com/wedding',
            'date_completed' => '2026-10-01',
        ], $overrides);
    }

    public function test_public_portfolio_shows_projects(): void
    {
        Project::create($this->validData());

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Portfolio')
                ->has('projects', 1)
                ->where('projects.0.title', 'Wedding Highlight Reel'));
    }

    public function test_case_1_empty_form_shows_required_errors(): void
    {
        $this->post('/projects', [])
            ->assertSessionHasErrors(['title', 'category', 'description', 'date_completed']);

        $this->assertDatabaseCount('projects', 0);
    }

    public function test_case_2_title_longer_than_max_is_rejected(): void
    {
        $this->post('/projects', $this->validData(['title' => str_repeat('a', 101)]))
            ->assertSessionHasErrors('title');
    }

    public function test_case_3_invalid_url_and_date_are_rejected(): void
    {
        $this->post('/projects', $this->validData([
            'project_url' => 'not-a-url',
            'date_completed' => 'not-a-date',
        ]))->assertSessionHasErrors(['project_url', 'date_completed']);
    }

    public function test_case_3b_future_date_uses_custom_message(): void
    {
        $this->post('/projects', $this->validData(['date_completed' => now()->addDays(5)->toDateString()]))
            ->assertSessionHasErrors(['date_completed' => 'Date completed cannot be in the future.']);
    }

    public function test_case_4_duplicate_title_is_rejected(): void
    {
        Project::create($this->validData());

        $this->post('/projects', $this->validData())
            ->assertSessionHasErrors(['title' => 'You already have a project with this title.']);

        $this->assertDatabaseCount('projects', 1);
    }

    public function test_case_5_update_without_changing_title_still_saves(): void
    {
        $project = Project::create($this->validData());

        $this->put("/projects/{$project->id}", $this->validData(['description' => 'Updated description that is long enough to pass.']))
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('projects.index'));

        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'description' => 'Updated description that is long enough to pass.',
        ]);
    }

    public function test_case_6_non_image_file_is_rejected(): void
    {
        $this->post('/projects', $this->validData([
            'image' => UploadedFile::fake()->create('document.pdf', 100, 'application/pdf'),
        ]))->assertSessionHasErrors('image');
    }

    public function test_case_6b_oversized_file_is_rejected(): void
    {
        $this->post('/projects', $this->validData([
            'image' => UploadedFile::fake()->create('big.jpg', 3000, 'image/jpeg'),
        ]))->assertSessionHasErrors('image');
    }

    public function test_store_saves_record_and_flashes_success(): void
    {
        $this->post('/projects', $this->validData())
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('projects.index'))
            ->assertSessionHas('success', 'Project created successfully.');

        $this->assertDatabaseHas('projects', ['title' => 'Wedding Highlight Reel']);
    }

    public function test_destroy_removes_record_and_flashes_success(): void
    {
        $project = Project::create($this->validData());

        $this->delete("/projects/{$project->id}")
            ->assertRedirect(route('projects.index'))
            ->assertSessionHas('success', 'Project deleted successfully.');

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    public function test_index_edit_and_create_pages_render(): void
    {
        $project = Project::create($this->validData());

        $this->get('/projects')->assertOk()->assertInertia(fn (Assert $page) => $page->component('Projects/Index'));
        $this->get('/projects/create')->assertOk()->assertInertia(fn (Assert $page) => $page->component('Projects/Create'));
        $this->get("/projects/{$project->id}/edit")->assertOk()->assertInertia(fn (Assert $page) => $page->component('Projects/Edit'));
    }
}
