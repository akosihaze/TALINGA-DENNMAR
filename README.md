# DENNMAR - Creative Portfolio (Laravel + Inertia.js + React)

Midterm Laboratory Activity - IT ELEC01 Advanced Web Development (UCU).
The original PHP/MySQL portfolio converted to **Laravel 12 + Inertia.js + React + Tailwind CSS**.

**Dynamic section (CRUD): Projects** - managed at `/projects`, displayed in the "My Projects" section of the public page `/`.

## Requirements
- PHP 8.2+ (XAMPP is fine) with `pdo_mysql`, `fileinfo`, `mbstring`
- Composer
- Node.js 20+ and npm
- MySQL (XAMPP)

## Setup

```bash
# 1. Install dependencies
composer install
npm install

# 2. Environment file + app key
cp .env.example .env          # Windows CMD: copy .env.example .env
php artisan key:generate

# 3. Database: start MySQL in XAMPP, then
#    (the database "dennmar_portfolio" is created for you if it does not exist)
php artisan migrate --seed

# 4. Run the app (two terminals)
php artisan serve             # http://localhost:8000
npm run dev                   # Vite (hot reload)
```

For a production-style run (no `npm run dev`): `npm run build` then `php artisan serve`.

> Open the site through `php artisan serve` (http://localhost:8000), not through `htdocs`.
> If you want a different database, edit the `DB_*` values in `.env`.

## Pages
| URL | Page |
|-----|------|
| `/` | Public portfolio |
| `/projects` | Index - list, search, filter, pagination, delete |
| `/projects/create` | Create form |
| `/projects/{id}/edit` | Edit form |

## Routes (`routes/web.php`)
`Route::resource('projects', ProjectController::class)->except(['show'])` creates:

| Method | URI | Action |
|--------|-----|--------|
| GET | /projects | index |
| GET | /projects/create | create |
| POST | /projects | store |
| GET | /projects/{project}/edit | edit |
| PUT/PATCH | /projects/{project} | update |
| DELETE | /projects/{project} | destroy |

## Where things are
| Part | File |
|------|------|
| Migration | `database/migrations/2026_11_03_000000_create_projects_table.php` |
| Model | `app/Models/Project.php` |
| Resource controller + validation | `app/Http/Controllers/ProjectController.php` |
| Public page controller | `app/Http/Controllers/PortfolioController.php` |
| Routes | `routes/web.php` |
| Inertia middleware (flash messages) | `app/Http/Middleware/HandleInertiaRequests.php` |
| Pages | `resources/js/Pages/Portfolio.jsx`, `resources/js/Pages/Projects/{Index,Create,Edit}.jsx` |
| Components | `resources/js/Components/` (`ProjectForm`, `FormField`, `ConfirmDialog`, `Navbar`, `Footer`, `SectionTitle`, `ProjectCard`, ...) |
| Seeder (sample data) | `database/seeders/ProjectSeeder.php` |
| Tests (validation test table) | `tests/Feature/ProjectCrudTest.php` |

## Fields of `projects`
`title` (unique), `category`, `description`, `tools`, `project_url`, `image`, `date_completed`

## Run the tests
```bash
php artisan test
```
(needs the `pdo_sqlite` PHP extension; tests use an in-memory SQLite database)
