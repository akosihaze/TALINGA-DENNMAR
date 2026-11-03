<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root Blade template loaded on the first page visit.
     */
    protected $rootView = 'app';

    /**
     * Asset version: when it changes, Inertia forces a full reload.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Props that are shared with EVERY Inertia page.
     * "flash.success" is what the React pages show after create / update / delete.
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ]);
    }
}
