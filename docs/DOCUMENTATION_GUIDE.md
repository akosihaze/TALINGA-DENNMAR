# Documentation helper (for the Part 6 PDF)

Draft answers for Part 2 and the Validation Test Table. Edit them into your own words,
take the screenshots yourself, and write the Reflection (Part 6, #8) yourself.

## Part 2 - Section chosen: Projects
**Why Projects?** It is the section that changes the most - every new edit I finish becomes a new project.
In a database I can add, edit, and remove projects through forms without touching the code, and the public page
always shows the latest data (sorted by date). Hard-coded HTML would need a code change for every update.

### Fields
| Field | Type | Why it is needed |
|-------|------|------------------|
| title | string(100), unique | Name of the project; unique so there are no duplicate cards |
| category | string(50) | Photo Editing / Video Editing / 3D Design... used for filtering |
| description | text | Explains what the project is about |
| tools | string(150), nullable | Software used (the "tech stack" of an editing project) |
| project_url | string, nullable | Link to the finished work |
| image | string, nullable | Path of the cover image shown on the card |
| date_completed | date | Used to sort projects and shown on the card |

### Rules the data must follow (= validation rules)
1. Title is required, 3-100 characters, and must be unique (the unique rule ignores the current record on update).
2. Category is required and must be one of the listed categories.
3. Description is required, 20-500 characters.
4. Project URL is optional but must be a valid URL.
5. Date completed is required, must be a valid date, and cannot be in the future.
6. Image is optional but must be an image (JPG, PNG, WEBP) of at most 2 MB.
7. Tools is optional, maximum 150 characters.

Rule types used: `required`, `min`, `max`, `string`, `url`, `date`, `before_or_equal`, `in`, `unique` (+ `ignore`), `image`, `mimes`, `nullable`, plus custom messages in `ProjectController::messages()`.

## Part 4 - Validation Test Table
Fill in "Actual Result" and "Pass/Fail" while you test in the browser (the same cases are automated in `tests/Feature/ProjectCrudTest.php`).

| # | Test Case | Input Used | Expected Result | Actual Result | Pass / Fail |
|---|-----------|-----------|-----------------|---------------|-------------|
| 1 | Empty form | All fields blank | Error under Title, Category, Description | | |
| 2 | Title too long | Title with 101+ characters | "The title is too long (maximum 100 characters)." | | |
| 3 | Invalid URL | Project URL = `not-a-url` | "Enter a valid URL, including https://" | | |
| 4 | Duplicate title | Title that already exists | "You already have a project with this title." | | |
| 5 | Update without changing title | Edit a project, change only the description | Saves, success message shown | | |
| 6 | Non-image file | Upload a `.pdf` | "The file must be an image." | | |
| 7 | Image too large | Upload an image over 2 MB | "The image must not be larger than 2 MB." | | |
| 8 | Future date | Date completed = next month | "Date completed cannot be in the future." | | |
| 9 | Input kept on error | Fill the form, make one field invalid, submit | Error shows and the other fields keep their values | | |

## Part 5 - Quick answers for the video questions (say them in your own words)
- **Separate controller?** web.php should only map URLs; the logic (validation, saving, files) belongs in a controller so routes stay clean and the code is organized per feature.
- **Routes of `Route::resource()`?** index, create, store, show, edit, update, destroy. I use all except `show` (excluded with `->except(['show'])`).
- **Without `$fillable`?** `Project::create()` / `update()` throws a `MassAssignmentException` - `$fillable` is the whitelist of columns that may be mass-assigned (also protects against users injecting extra fields).
- **Why server validation?** React validation can be bypassed (dev tools, direct requests). The server is the only place that can be trusted.
- **How do errors reach React without reload?** Laravel redirects back with the errors in the session; the Inertia middleware shares them as the `errors` prop on the next XHR response, and `useForm()` puts them in `errors` so the component re-renders in place.
- **Why a reusable component?** `ProjectForm` is used by both Create and Edit, so a change (like the live-change field) is made once.

## Part 5 - Live change idea (segment 6)
Add a nullable `client` string field: migration (`php artisan make:migration add_client_to_projects_table`),
add `'client'` to `$fillable`, add `'client' => ['nullable','string','max:60']` in `rules()`, add the field to
`useForm` + a `<FormField>` in `ProjectForm.jsx`, then show it in `ProjectCard.jsx`.

## Notes
- Original `index.php` had the descriptions of "3D Environment Design" and "Cinematic Video Edit" swapped - fixed in the seeder.
- The Admin pages are not login-protected (login is a bonus item).
