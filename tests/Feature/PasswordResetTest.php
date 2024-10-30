<?php

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Notification;

use function Pest\Laravel\get;
use function Pest\Laravel\post;

it('returns inertia reset password link page', function () {
    get(route('password.request'))
        ->assertOk()
        ->assertComponent('Auth/ForgotPassword');
});

test('reset password inertia page can be rendered', function () {
    Notification::fake();

    $user = User::factory()->create();

    post(route('password.email', ['email' => $user->email]));

    Notification::assertSentTo($user, ResetPassword::class, function (object $notification) {
        get(route('password.reset', ['token' => $notification->token]))
            ->assertOk()
            ->assertComponent('Auth/ResetPassword');

        return true;
    });
});
