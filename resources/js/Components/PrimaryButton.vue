<script setup>
defineProps({
  type: {
    type: String,
    default: "submit",
  },
});
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest disabled:opacity-50"
  >
    <slot />
  </button>
</template>
