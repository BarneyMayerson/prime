<?php

namespace App\Providers;

use App\Actions\Jetstream\DeleteUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;
use Laravel\Jetstream\Jetstream;

class JetstreamServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configurePermissions();

        Jetstream::deleteUsersUsing(DeleteUser::class);

        Vite::prefetch(concurrency: 3);

        Fortify::registerView(function () {
            return Inertia::modal('Auth/Register')->baseRoute('home');
        });

        Fortify::loginView(function () {
            return Inertia::modal('Auth/Login', [
                'canResetPassword' => true,
                'status' => session('status'),
            ])->baseRoute('home');
        });

        Fortify::requestPasswordResetLinkView(function () {
            return Inertia::modal('Auth/ForgotPassword', [
                'status' => session('status'),
            ])->baseRoute('login');
        });

        Fortify::resetPasswordView(function (Request $request) {
            return Inertia::render('Auth/ResetPassword', [
                'email' => $request['email'],
                'token' => $request['token'],
            ]);
        });
    }

    /**
     * Configure the permissions that are available within the application.
     */
    protected function configurePermissions(): void
    {
        Jetstream::defaultApiTokenPermissions(['read']);

        Jetstream::permissions([
            'create',
            'read',
            'update',
            'delete',
        ]);
    }
}
