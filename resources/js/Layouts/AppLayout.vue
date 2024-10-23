<script setup>
import Banner from "@/Components/Banner.vue";
import PrimaryMenu from "@/Components/Navs/PrimaryMenu.vue";
</script>

<template>
  <div>
    <Banner />
    <PrimaryMenu />

    <div class="min-h-screen">
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
