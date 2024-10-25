<script setup>
import { ref } from "vue";
import { Link, router } from "@inertiajs/vue3";
import ApplicationMark from "@/Components/ApplicationMark.vue";
import ColorSchemeSwitcher from "@/Components/ColorSchemeSwitcher.vue";
import ThemeSwitcher from "@/Components/ThemeSwitcher.vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import Badge from "primevue/badge";
import Button from "primevue/button";
import Menubar from "primevue/menubar";

const logout = () => {
  router.post(route("logout"));
};

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Projects",
    icon: "pi pi-search",
    badge: 3,
    items: [
      {
        label: "Core",
        icon: "pi pi-bolt",
        shortcut: "⌘+S",
      },
      {
        label: "Blocks",
        icon: "pi pi-server",
        shortcut: "⌘+B",
      },
      {
        separator: true,
      },
      {
        label: "UI Kit",
        icon: "pi pi-pencil",
        shortcut: "⌘+U",
      },
    ],
  },
]);
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <Link :href="route('home')">
        <ApplicationMark class="block h-9 w-auto" />
      </Link>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a class="flex items-center" v-bind="props.action">
        <span>{{ item.label }}</span>
        <Badge
          v-if="item.badge"
          :class="{ 'ml-auto': !root, 'ml-2': root }"
          :value="item.badge"
        />
        <span
          v-if="item.shortcut"
          class="border-surface bg-emphasis text-muted-color ml-auto rounded border p-1 text-xs"
          >{{ item.shortcut }}</span
        >
        <i
          v-if="hasSubmenu"
          :class="[
            'pi pi-angle-down ml-auto',
            { 'pi-angle-down': root, 'pi-angle-right': !root },
          ]"
        ></i>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <ThemeSwitcher />
        <ColorSchemeSwitcher />
        <div class="flex items-center">
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
                    class="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4"
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
                <div class="block px-4 py-2 text-xs">Manage Account</div>

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

            <Link :href="route('register')" tabindex="-1">
              <Button label="Register" link />
            </Link>
          </div>
        </div>
      </div>
    </template>
  </Menubar>
</template>
