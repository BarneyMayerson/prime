<script setup>
import { onMounted, ref } from "vue";
import { Link, router, usePage } from "@inertiajs/vue3";
import ApplicationMark from "@/Components/ApplicationMark.vue";
import ColorSchemeSwitcher from "@/Components/ColorSchemeSwitcher.vue";
import ThemeSwitcher from "@/Components/ThemeSwitcher.vue";
import Badge from "primevue/badge";
import Button from "primevue/button";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";

const logout = () => {
  router.post(route("logout"));
};

const mainMenuItems = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    url: route("home"),
  },
  {
    label: "Dashboard",
    url: route("dashboard"),
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

const userMenu = ref();

const toggle = (event) => {
  userMenu.value.toggle(event);
};

const userMenuItems = ref();

const page = usePage();

onMounted(() => {
  if (page.props.jetstream.hasApiFeatures) {
    userMenuItems.value = [
      {
        label: "Manage Account",
        items: [
          {
            label: "Profile",
            url: route("profile.show"),
          },
          {
            label: "API Tokens",
            url: route("api-tokens.index"),
          },
          {
            separator: true,
          },
          {
            label: "Logout",
            command: () => {
              logout();
            },
          },
        ],
      },
    ];
  } else {
    userMenuItems.value = [
      {
        label: "Manage Account",
        items: [
          {
            label: "Profile",
            url: route("profile.show"),
          },
          {
            separator: true,
          },
          {
            label: "Logout",
            command: () => {
              logout();
            },
          },
        ],
      },
    ];
  }
});
</script>

<template>
  <Menubar :model="mainMenuItems">
    <template #start>
      <Link :href="route('home')">
        <ApplicationMark class="block h-9 w-auto" />
      </Link>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a class="flex items-center" v-bind="props.action">
        <Link v-if="item.url" :href="item.url">{{ item.label }}</Link>
        <span v-else>{{ item.label }}</span>
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
          <div v-if="$page.props.auth.user">
            <button
              v-if="$page.props.jetstream.managesProfilePhotos"
              class="flex rounded-full"
              @click="toggle"
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
                class="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium leading-4"
                @click="toggle"
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
            <Menu
              ref="userMenu"
              id="overlay_user_menu"
              :model="userMenuItems"
              :popup="true"
            >
              <template #item="{ item }">
                <div class="p-menu-item-link">
                  <Link v-if="item.url" :href="item.url">{{ item.label }}</Link>
                  <span v-else>{{ item.label }}</span>
                </div>
              </template>
            </Menu>
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
