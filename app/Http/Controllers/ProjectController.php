<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * LIST - GET /projects (with search, category filter and pagination).
     */
    public function index(Request $request): Response
    {
        $projects = Project::query()
            ->when($request->query('search'), fn ($q, $search) => $q->where('title', 'like', "%{$search}%"))
            ->when($request->query('category'), fn ($q, $category) => $q->where('category', $category))
            ->orderByDesc('date_completed')
            ->orderByDesc('id')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only('search', 'category'),
            'categories' => Project::CATEGORIES,
        ]);
    }

    /**
     * CREATE FORM - GET /projects/create
     */
    public function create(): Response
    {
        return Inertia::render('Projects/Create', [
            'categories' => Project::CATEGORIES,
        ]);
    }

    /**
     * STORE - POST /projects
     */
    public function store(Request $request): RedirectResponse
    {
        // If validation fails Laravel redirects back with the errors (Inertia hands them to React).
        $validated = $request->validate($this->rules(), $this->messages());

        $data = collect($validated)->except('image')->all();

        if ($request->hasFile('image')) {
            $data['image'] = $this->storeImage($request->file('image'));
        }

        Project::create($data);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * EDIT FORM - GET /projects/{project}/edit
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
            'categories' => Project::CATEGORIES,
        ]);
    }

    /**
     * UPDATE - PUT /projects/{project}
     */
    public function update(Request $request, Project $project): RedirectResponse
    {
        // Passing $project makes the unique rule ignore this record's own title.
        $validated = $request->validate($this->rules($project), $this->messages());

        $data = collect($validated)->except('image')->all();

        if ($request->hasFile('image')) {
            $this->deleteImage($project->image);   // remove the old uploaded file
            $data['image'] = $this->storeImage($request->file('image'));
        }

        $project->update($data);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    /**
     * DELETE - DELETE /projects/{project}
     */
    public function destroy(Project $project): RedirectResponse
    {
        $this->deleteImage($project->image);
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }

    /**
     * Validation rules (shared by store and update).
     */
    private function rules(?Project $project = null): array
    {
        $uniqueTitle = Rule::unique('projects', 'title');

        if ($project) {
            $uniqueTitle->ignore($project->id);
        }

        return [
            'title' => ['required', 'string', 'min:3', 'max:100', $uniqueTitle],
            'category' => ['required', Rule::in(Project::CATEGORIES)],
            'description' => ['required', 'string', 'min:20', 'max:500'],
            'tools' => ['nullable', 'string', 'max:150'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'date_completed' => ['required', 'date', 'before_or_equal:today'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    /**
     * Custom error messages shown beside each field in React.
     */
    private function messages(): array
    {
        return [
            'title.required' => 'Please give your project a title.',
            'title.min' => 'The title must be at least :min characters.',
            'title.max' => 'The title is too long (maximum :max characters).',
            'title.unique' => 'You already have a project with this title.',
            'category.required' => 'Please choose a category.',
            'category.in' => 'Please pick one of the listed categories.',
            'description.required' => 'Please describe the project.',
            'description.min' => 'The description must be at least :min characters so visitors understand the work.',
            'description.max' => 'The description is too long (maximum :max characters).',
            'tools.max' => 'Tools must not be longer than :max characters.',
            'project_url.url' => 'Enter a valid URL, including https://',
            'date_completed.required' => 'Please enter the date completed.',
            'date_completed.date' => 'Enter a valid date.',
            'date_completed.before_or_equal' => 'Date completed cannot be in the future.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'Only JPG, PNG or WEBP images are allowed.',
            'image.max' => 'The image must not be larger than 2 MB.',
        ];
    }

    /**
     * Save an uploaded image in public/uploads/projects and return its relative path.
     */
    private function storeImage(UploadedFile $file): string
    {
        $filename = Str::uuid().'.'.$file->extension();
        $file->move(public_path('uploads/projects'), $filename);

        return 'uploads/projects/'.$filename;
    }

    /**
     * Delete an uploaded image from disk (the bundled sample images in public/assets are never deleted).
     */
    private function deleteImage(?string $path): void
    {
        if ($path && str_starts_with($path, 'uploads/') && File::exists(public_path($path))) {
            File::delete(public_path($path));
        }
    }
}
