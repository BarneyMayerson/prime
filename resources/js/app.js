import "./bootstrap";
import "../css/app.css";
import "../css/flags.css";
import "primeicons/primeicons.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import AppLayout from "@/Layouts/AppLayout.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

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
      .use(PrimeVue, {
        theme: {
          preset: Aura,
          options: {
            darkModeSelector: ".p-dark",
          },
        },
      })
      .use(plugin)
      .use(ZiggyVue)
      .mount(el);
  },
  progress: {
    color: "#4B5563",
  },
});
