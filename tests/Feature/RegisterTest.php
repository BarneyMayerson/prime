<?php

use function Pest\Laravel\get;

it('returns inertia registration page', function () {
    get(route('register'))
        ->assertOk();
});
