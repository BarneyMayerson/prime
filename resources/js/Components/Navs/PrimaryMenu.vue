<script setup>
import { ref } from "vue";
import { Link, router } from "@inertiajs/vue3";
import ThemeSwitcher from "@/Components/ThemeSwitcher.vue";
import ColorSchemeSwitcher from "@/Components/ColorSchemeSwitcher.vue";
import Button from "primevue/button";
import ApplicationMark from "@/Components/ApplicationMark.vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import NavLink from "@/Components/NavLink.vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";

const showingNavigationDropdown = ref(false);

const logout = () => {
  router.post(route("logout"));
};
</script>

<template>
  <nav>
    <!-- Primary Navigation Menu -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex">
          <!-- Logo -->
          <div class="flex shrink-0 items-center">
            <Link :href="route('dashboard')">
              <ApplicationMark class="block h-9 w-auto" />
            </Link>
          </div>

          <!-- Navigation Links -->
          <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <NavLink
              v-if="$page.props.auth.user"
              :href="route('dashboard')"
              :active="route().current('dashboard')"
            >
              Dashboard
            </NavLink>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <div class="flex items-center space-x-1">
            <!-- Theme Switcher -->
            <ThemeSwitcher />
            <!-- Color Scheme Dropdown -->
            <ColorSchemeSwitcher />
            <div class="hidden sm:flex sm:items-center">
              <!-- Settings Dropdown -->
              <div v-if="$page.props.auth.user" class="relative ms-3">
                <Dropdown align="right" width="48">
                  <template #trigger>
                    <button
                      v-if="$page.props.jetstream.managesProfilePhotos"
                      class="flex rounded-full border-2 border-transparent text-sm transition focus:border-gray-300 focus:outline-none"
                    >
                      <img
                        class="h-8 w-8 rounded-full object-cover"
                        :src="$page.props.auth.user.profile_photo_url"
                        :alt="$page.props.auth.user.name"
                      />
                    </button>

                    <span v-else class="inline-flex rounded-md">
                      <button
                        type="button"
                        class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:bg-gray-50 focus:outline-none active:bg-gray-50"
                      >
                        {{ $page.props.auth.user.name }}

                        <svg
                          class="-me-0.5 ms-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    </span>
                  </template>

                  <template #content>
                    <!-- Account Management -->
                    <div class="block px-4 py-2 text-xs text-gray-400">
                      Manage Account
                    </div>

                    <DropdownLink :href="route('profile.show')">
                      Profile
                    </DropdownLink>

                    <DropdownLink
                      v-if="$page.props.jetstream.hasApiFeatures"
                      :href="route('api-tokens.index')"
                    >
                      API Tokens
                    </DropdownLink>

                    <div class="border-t border-gray-200" />

                    <!-- Authentication -->
                    <form @submit.prevent="logout">
                      <DropdownLink as="button">Log Out</DropdownLink>
                    </form>
                  </template>
                </Dropdown>
              </div>
              <div v-else>
                <Link :href="route('login')" tabindex="-1">
                  <Button label="Login" link />
                </Link>

                <Link tabindex="-1" :href="route('register')">
                  <Button label="Register" link />
                </Link>
              </div>
            </div>
          </div>

          <!-- Hamburger -->
          <div class="-me-2 flex items-center sm:hidden">
            <button
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
              @click="showingNavigationDropdown = !showingNavigationDropdown"
            >
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  :class="{
                    hidden: showingNavigationDropdown,
                    'inline-flex': !showingNavigationDropdown,
                  }"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  :class="{
                    hidden: !showingNavigationDropdown,
                    'inline-flex': showingNavigationDropdown,
                  }"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Responsive Navigation Menu -->
    <div
      :class="{
        block: showingNavigationDropdown,
        hidden: !showingNavigationDropdown,
      }"
      class="sm:hidden"
    >
      <div class="space-y-1 pb-3 pt-2">
        <ResponsiveNavLink
          v-if="$page.props.auth.user"
          :href="route('dashboard')"
          :active="route().current('dashboard')"
        >
          Dashboard
        </ResponsiveNavLink>
      </div>

      <!-- Responsive Settings Options -->
      <div
        v-if="$page.props.auth.user"
        class="border-t border-gray-200 pb-1 pt-4"
      >
        <div class="flex items-center px-4">
          <div
            v-if="$page.props.jetstream.managesProfilePhotos"
            class="me-3 shrink-0"
          >
            <img
              class="h-10 w-10 rounded-full object-cover"
              :src="$page.props.auth.user.profile_photo_url"
              :alt="$page.props.auth.user.name"
            />
          </div>

          <div>
            <div class="text-base font-medium">
              {{ $page.props.auth.user.name }}
            </div>
            <div class="text-sm font-medium">
              {{ $page.props.auth.user.email }}
            </div>
          </div>
        </div>

        <div class="mt-3 space-y-1">
          <ResponsiveNavLink
            :href="route('profile.show')"
            :active="route().current('profile.show')"
          >
            Profile
          </ResponsiveNavLink>

          <ResponsiveNavLink
            v-if="$page.props.jetstream.hasApiFeatures"
            :href="route('api-tokens.index')"
            :active="route().current('api-tokens.index')"
          >
            API Tokens
          </ResponsiveNavLink>

          <!-- Authentication -->
          <form method="post" @submit.prevent="logout">
            <ResponsiveNavLink as="button">Log Out</ResponsiveNavLink>
          </form>
        </div>
      </div>
      <div v-else>
        <div class="mt-3 space-y-1">
          <ResponsiveNavLink
            :href="route('login')"
            :active="route().current('login')"
          >
            Login
          </ResponsiveNavLink>

          <ResponsiveNavLink
            v-if="$page.props.jetstream.hasApiFeatures"
            :href="route('register')"
            :active="route().current('register')"
          >
            Register
          </ResponsiveNavLink>
        </div>
      </div>
    </div>
  </nav>
</template>
