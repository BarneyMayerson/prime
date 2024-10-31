<script setup>
import { Modal } from "momentum-modal";
import Toast from "primevue/toast";
import Banner from "@/Components/Banner.vue";
import PrimeMenu from "@/Components/Navs/PrimeMenu.vue";
</script>

<template>
  <div>
    <Banner />
    <PrimeMenu />

    <div class="min-h-screen">
      <main>
        <slot />
      </main>
    </div>
  </div>

  <Modal />
  <Toast position="bottom-right" />
</template>
