<?php

use function Pest\Laravel\get;

it('returns inertia authentication page', function () {
    get(route('login'))
        ->assertOk()
        ->assertComponent('Auth/Login');
});
