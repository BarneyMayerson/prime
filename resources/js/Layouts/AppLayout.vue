<script setup>
import Banner from "@/Components/Banner.vue";
import PrimaryMenu from "@/Components/Navs/PrimaryMenu.vue";
import PrimeMenu from "@/Components/Navs/PrimeMenu.vue";
</script>

<template>
  <div>
    <Banner />
    <PrimaryMenu />
    <PrimeMenu />

    <div class="min-h-screen">
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
