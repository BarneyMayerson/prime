import "./bootstrap";
import "../css/app.css";
import "../css/flags.css";
import "primeicons/primeicons.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import { modal } from "momentum-modal";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import AppLayout from "@/Layouts/AppLayout.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

function resolvePageComponent(name, pages) {
  for (const path in pages) {
    if (path.endsWith(`${name.replace(".", "/")}.vue`)) {
      return typeof pages[path] === "function" ? pages[path]() : pages[path];
    }
  }

  throw new Error(`Page not found: ${name}`);
}

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });

    let page = pages[`./Pages/${name}.vue`];

    page.default.layout = page.default.layout || AppLayout;

    return page;
  },
  setup({ el, App, props, plugin }) {
    return createApp({ render: () => h(App, props) })
      .use(modal, {
        resolve: (name) =>
          resolvePageComponent(name, import.meta.glob("./Pages/**/*.vue")),
      })
      .use(PrimeVue, {
        theme: {
          preset: Aura,
          options: {
            darkModeSelector: ".dark",
          },
        },
      })
      .use(ConfirmationService)
      .use(ToastService)
      .use(plugin)
      .use(ZiggyVue)
      .mount(el);
  },
  progress: {
    color: "#4B5563",
  },
});
